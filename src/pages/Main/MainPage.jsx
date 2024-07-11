import React, { useState, useEffect, useRef } from "react";
import axiosInstance from "../../utils/axiosInstance";
import "../../assets/css/style.css";
import VideoBox from "../../components/VideoBox";
import Layout from "../../components/Layout";
import Button from "../../components/Button";
import Tag from "../../components/Tag";
import Upload from "../../assets/images/upload.svg";

const MainPage = () => {
  const [videos, setVideos] = useState([]);
  const [pageNumber, setPageNumber] = useState(0); // 페이지 번호를 0부터 시작
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("uploadDate"); // 초기 정렬 기준
  const [categories, setCategories] = useState([]); // 초기 카테고리 없음

  const observer = useRef(null); // Intersection Observer를 위한 useRef 사용

  // 초기 데이터 로딩
  const fetchVideos = async (page, sort = sortBy, category = categories, search = searchTerm) => {
    if (loading) return;
    setLoading(true);

    try {
      const endpoint = search ? `/api/video/post/search?search=${search}&pageNumber=${page}` : `/api/video/post?pageNumber=${page}`;
      const response = await axiosInstance.post(endpoint, {
        sort: sort,
        category: category,
      });
      const newVideos = response.data;

      if (newVideos.length === 0) {
        setHasMore(false);
      } else {
        console.log(' 콘솔 테스트용');
        setVideos((prevVideos) => {
          const uniqueNewVideos = newVideos.filter(
            (newVideo) =>
              !prevVideos.some((video) => video.videoId === newVideo.videoId)
          );
          return [...prevVideos, ...uniqueNewVideos];
        });
        setPageNumber(page + 1); // 다음 페이지 번호 설정
      }
    } catch (error) {
      console.error("Failed to fetch videos:", error);
    } finally {
      setLoading(false);
    }
  };

  // Intersection Observer의 콜백 함수
  const handleObserver = (entries) => {
    const target = entries[0];
    if (target.isIntersecting && hasMore && !loading) {
      fetchVideos(pageNumber); // 다음 페이지 로드
    }
  };

  useEffect(() => {
    fetchVideos(pageNumber); // 초기 로딩 시 첫 번째 페이지 로드
  }, []);

  useEffect(() => {
    observer.current = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "0px",
      threshold: 0.2,
    });

    if (videos.length > 0) {
      observer.current.observe(
        document.querySelector(".videos-grid > div:last-child")
      );
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [videos]);

  const handleSearch = async (event) => {
    if (event.key === "Enter") {
      const searchValue = event.target.value;
      setSearchTerm(event.target.value);
      setPageNumber(0); // 페이지 번호 초기화
      setHasMore(true); // 더 이상 데이터가 없음을 표시
      setVideos([]); // 비디오 데이터 초기화

      try {
        setLoading(true); // 데이터 요청 중임을 표시

        const response = await axiosInstance.post(`/api/video/post/search?search=${searchValue}&pageNumber=0`, {
          sort: sortBy,
          category: categories,
        });

        const newVideos = response.data;
        console.log(newVideos);
        if (newVideos.length === 0) {
          setHasMore(false); // 더 이상 데이터가 없음을 표시
        } else {
          setVideos(newVideos); // 새로운 데이터로 videos 상태 설정
          setPageNumber(1); // 다음 페이지 번호 설정
        }
      } catch (error) {
        console.error("Failed to fetch videos:", error);
      } finally {
        setLoading(false); // 데이터 요청 완료 후 로딩 상태 해제
      }
    }
  };

  const handleTagClick = async (selectedValues) => {
    setSortBy(selectedValues.sort);
    setCategories(selectedValues.category);
    setPageNumber(0); // 태그 클릭 시 페이지 번호 초기화
    setHasMore(true); // 더 이상 데이터가 없음을 표시
    setVideos([]); // 기존 비디오 데이터 초기화

    try {
      setLoading(true); // 데이터 요청 중임을 표시

      const endpoint = searchTerm ? `/api/video/post/search?search=${searchTerm}&pageNumber=0` : `/api/video/post?pageNumber=0`;
      const response = await axiosInstance.post(endpoint, {
        sort: selectedValues.sort,
        category: selectedValues.category,
      });

      const newVideos = response.data;

      if (newVideos.length === 0) {
        setHasMore(false); // 더 이상 데이터가 없음을 표시
      } else {
        setVideos(newVideos); // 새로운 데이터로 videos 상태 설정
        setPageNumber(1); // 다음 페이지 번호 설정
      }
    } catch (error) {
      console.error("Failed to fetch videos:", error);
    } finally {
      setLoading(false); // 데이터 요청 완료 후 로딩 상태 해제
    }
  };

  return (
    <Layout showFooter={false}>
      <div className="main-container-1150 mt80">
        <div className="mr10 ml10">
          <div className="flex row-direction space-between mb50">
            <Tag onTagClick={handleTagClick} />

            <div className="tag-main-right">
              <Button size="tag" to="/video/register">
                <span className="icon-wrapper">
                  <img src={Upload} alt="upload" />
                </span>
                동영상 업로드
              </Button>

              <input
                type="text"
                placeholder="검색"
                onKeyDown={handleSearch}
                className="search-input"
              />
            </div>
          </div>

          <div className="videos-grid">
            {videos.length > 0 ? (
              videos.map((video) => (
                <div key={video.videoId}>
                  <VideoBox
                    thumbnail={video.thumbnail}
                    title={video.title}
                    views={video.views}
                    uploadDate={video.uploadDate}
                    length={video.length}
                    nickname={video.nickname}
                  />
                </div>
              ))
            ) : (
              <div className="no-results">
                아무것도 검색된 결과가 없어용. 반응형 다 뿌셔뿌셔 해버리고 싶어용.
              </div>
            )}
          </div>
        </div>
        {loading && <p>Loading more videos...</p>}
      </div>
    </Layout>
  );
};

export default MainPage;
