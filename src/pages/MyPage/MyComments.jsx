import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/style.css";
import Layout from "../../components/Layout";
import Button from "../../components/Button";
import axiosInstance from "../../utils/axiosInstance";

const MyComments = () => {
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedTag, setSelectedTag] = useState('video'); 
  const [pageRange, setPageRange] = useState([1, 5]); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        let response;
        if (selectedTag === 'video') {
          response = await axiosInstance.get(`/api/video/auth/mycomment`, {
            params: { pageNumber: currentPage - 1 }
          });
        } else if (selectedTag === 'battle') {
          response = await axiosInstance.get(`/api/battle/auth/mycomment`, {
            params: { page: currentPage - 1 }
          });
        }  else if (selectedTag === 'challenge') {
          response = await axiosInstance.get(`/api/challenge/auth/mycomment`, {
            params: { pageNumber: currentPage - 1 }
          });
        }
        
        const { content, totalPages } = response.data;
        setComments(content);
        setTotalPages(totalPages);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchComments();
  }, [selectedTag, currentPage]);

  const handleClick = (tag) => {
    setSelectedTag(tag);
    setCurrentPage(1); // 새로운 탭 클릭 시 첫 페이지로 이동
    setPageRange([1, 5]); // 새로운 탭 클릭 시 페이지 범위 초기화
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handlePreviousPageRange = () => {
    if (pageRange[0] > 1) {
      setPageRange([pageRange[0] - 5, pageRange[1] - 5]);
    }
  };

  const handleNextPageRange = () => {
    if (pageRange[1] < totalPages) {
      setPageRange([pageRange[0] + 5, pageRange[1] + 5]);
    }
  };

  const handleCommentClick = (comment) => {
    if (selectedTag === 'video') {
      navigate(`/video/play/${comment.videoId}`);
    } else if (selectedTag === 'battle') {
      navigate(`/battle/detail/${comment.battleId}`);
    } else if (selectedTag === 'challenge') {
      navigate(`/challenge/detail/${comment.videoId}`); 
    }
  };

  const CommentsTags = [
    { id: 'video', name: "동영상" },
    { id: 'challenge', name: "챌린지" },
    { id: 'battle', name: "배틀" }
  ];

  return (
    <Layout bannerType="my">
      <div className="my-container-810 mt40">
        <div className="flex comments-tag align-center pdx15">
          {CommentsTags.map(tag => (
            <Button
              key={tag.id}
              size="tag"
              onClick={() => handleClick(tag.id)}
              className={selectedTag === tag.id ? 'selected' : ''}
            >             
              {tag.name}
            </Button>
          ))}
        </div>
        <div className="comments-grid mt20">
          <div className="comments-header">
            <span></span>
            <span>제목</span>
            <span>댓글 내용</span>
            <span>작성일</span>
          </div>
          {comments.map((comment) => (
            <div 
              key={comment.commentId || comment.challengeCommentId || comment.battleCommentId} 
              className="comment-row"
              onClick={() => handleCommentClick(comment)}
              style={{ cursor: 'pointer' }}
            >
              <span></span>
              <span>{comment.title || '제목 없음'}</span>
              <span>{comment.comment}</span>
              <span>{new Date(comment.createDate).toLocaleDateString()}</span>
            </div>
          ))}
          <div className="flex flex-end mt20">
            <Button size="confirm" to="/mypage/deletecomments">
              삭제하기
            </Button>
          </div>
          <div className="mycomments-pagination justify-center mt10">
            <button
              onClick={handlePreviousPageRange}
              disabled={pageRange[0] === 1}
            >
              {"<"}
            </button>
            {Array.from({ length: totalPages }, (_, index) => index + 1)
              .slice(pageRange[0] - 1, pageRange[1])
              .map((pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => paginate(pageNumber)}
                  className={currentPage === pageNumber ? "active" : ""}
                >
                  {pageNumber}
                </button>
              ))}
            <button
              onClick={handleNextPageRange}
              disabled={pageRange[1] >= totalPages}
            >
              {">"}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MyComments;
