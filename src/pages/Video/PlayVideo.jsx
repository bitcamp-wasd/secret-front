import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import axios from "axios";
import "../../assets/css/style.css";
import "../../assets/css/jun.css";
import Layout from "../../components/Layout";
import Button from "../../components/Button";
import VideoPlay from "../../components/VideoPlay";
import heart from "../../assets/images/heart.svg";
import heart_fill from "../../assets/images/heart_fill.svg";
import grade from "../../assets/images/grade.svg";

const PlayVideo = () => {
  const { videoId } = useParams();
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수 얻기
  const [videoData, setVideoData] = useState(null);
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [animate, setAnimate] = useState(false);
  const [showCommentPlaceholder, setShowCommentPlaceholder] = useState(true);
  const [currentUserNickname, setCurrentUserNickname] = useState(null);

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/video/watch`, {
          params: { id: videoId }
        });
        setVideoData(response.data);
        setLikeCount(response.data.likeCount);
      } catch (error) {
        console.error('비디오 데이터를 가져오는 중 오류 발생:', error);
      }
    };

    const fetchLikeStatus = async () => {
      try {
        const token = sessionStorage.getItem('accessToken');
        if (!token) {
          throw new Error('사용자가 로그인하지 않았습니다. 로그인 후에 다시 시도해주세요.');
        }

        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/video/like/auth/check`, {
          params: { id: videoId },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setIsHeartFilled(response.data);
      } catch (error) {
        console.error('좋아요 상태를 가져오는 중 오류 발생:', error);
      }
    };

    const fetchCurrentUserNickname = () => {
      const token = sessionStorage.getItem('accessToken');
      if (token) {
        const decodedToken = jwtDecode(token);
        setCurrentUserNickname(decodedToken.nickName);
      }
    };

    fetchVideoData();
    fetchLikeStatus();
    fetchCurrentUserNickname();
  }, [videoId]);

  const handleHeartClick = async () => {
    const token = sessionStorage.getItem('accessToken');
    if (!token) {
      if (window.confirm('로그인이 필요한 서비스입니다.\n\n로그인 하시겠습니까?')) {
        window.location.href = '/login';
      }
      return;
    }

    setIsHeartFilled(!isHeartFilled);
    setLikeCount(prevCount => isHeartFilled ? prevCount - 1 : prevCount + 1);
    setAnimate(true);

    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/video/like/auth`, {
        params: { id: videoId },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('좋아요 요청 성공:', response.data);
    } catch (error) {
      console.error('좋아요 요청을 보내는 중 오류 발생:', error);
    }

    setTimeout(() => {
      setAnimate(false);
    }, 500);
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    if (newComment.trim() === "") {
      alert("댓글을 입력해주세요.");
      return;
    }

    const now = new Date();
    const formattedDate = `${now.getFullYear().toString().slice(2)}.${(now.getMonth() + 1).toString().padStart(2, '0')}.${now.getDate().toString().padStart(2, '0')} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    const newCommentData = {
      id: comments.length + 1,
      author: "새로운 유저",
      content: newComment,
      date: formattedDate,
    };
    setComments([...comments, newCommentData]);
    setNewComment("");
    setShowCommentPlaceholder(false);

    alert("댓글이 등록되었습니다.");
  };

  const handleDelete = async () => {
    const token = sessionStorage.getItem('accessToken');
    if (!token) {
      if (window.confirm('로그인이 필요한 서비스입니다.\n\n로그인 하시겠습니까?')) {
        window.location.href = '/login';
      }
      return;
    }

    const confirmDelete = window.confirm('정말로 이 비디오를 삭제하시겠습니까? 삭제된 비디오는 복구할 수 없습니다.');
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/api/video/post/auth`, {
        params: { id: videoId },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('비디오 삭제 성공:', response.data);
      alert('비디오가 삭제되었습니다.');
      window.location.href = '/'; // 삭제 후 홈 페이지로 리다이렉트 (원하는 페이지로 수정 가능)
    } catch (error) {
      console.error('비디오 삭제 중 오류 발생:', error);
      alert('비디오 삭제 중 오류가 발생했습니다.');
    }
  };

  const handleEdit = () => {
    navigate(`/video/modify/${videoId}`); // 수정 페이지로 이동
  };

  if (!videoData) {
    return <div>로딩 중...</div>;
  }

  const videoUrl = `https://ralnmjht3939.edge.naverncp.com/hls/3of~20qtSk4YcLxE52rCqA__/video/music/${videoData.video}_AVC_,HD_1Pass_30fps,SD_1Pass_30fps,SD_1Pass_30fps_1,.mp4.smil/master.m3u8`;

  return (
    <Layout>
      <div className="main-container-810">
        <div className="videos-flex mt90">
          <VideoPlay thumbnail={videoData.thumbnail} title={videoData.title} videoUrl={videoUrl} />
        </div>

        <div className="play-infobox mt20">
          <div className="flex align-center space-between">
            <div>{videoData.title}</div>
            <div>#{videoData.category}</div>
          </div>
          <div className="flex align-center space-between mt10">
            <div className="flex align-center">
              <img src={grade} className="mr10" alt="grade" />
              {videoData.nickname}
            </div>
            <div className="flex align-center" onClick={handleHeartClick} style={{ cursor: 'pointer' }}>
              <img
                src={isHeartFilled ? heart_fill : heart}
                className={`mr10 ${animate ? "heart-animation" : ""}`}
                alt="heart"
              />
              {likeCount}
            </div>
          </div>
        </div>

        <div className="video-info mt40">
          <div className="video-info-title">
            <div>조회수 {videoData.views}회</div>
            <div>{new Date(videoData.uploadDate).toLocaleDateString('ko-KR', { year: '2-digit', month: '2-digit', day: '2-digit' })}</div>
          </div>
          <div className="video-info-content">
            {videoData.description}
          </div>

          <div className="mt40">
            {videoData.sheetMusic.map((sheet, index) => (
              <img key={index} src={process.env.REACT_APP_CLOUD_SHEET_IMAGE_URL + sheet} alt={`Sheet Music ${index + 1}`} className="play-sheetmusic" />
            ))}
          </div>

          <div className="flex-end mt40 button-container">
            {currentUserNickname === videoData.nickname && (
              <>
                <Button onClick={handleEdit}>수정</Button> {/* 수정 버튼 클릭 시 handleEdit 호출 */}
                <Button onClick={handleDelete}>삭제</Button>
              </>
            )}
          </div>

          <div className="comment mt90">
            <div>댓글 {comments.length}개</div>
            <textarea
              type="text"
              placeholder="댓글을 입력하세요."
              value={newComment}
              onChange={handleCommentChange}
            />
          </div>
          <div className="flex-end mt10 button-container">
            <Button onClick={handleCommentSubmit}>등록</Button>
          </div>

          {showCommentPlaceholder && comments.length === 0 && (
            <div className="comment-placeholder">첫 댓글을 남겨보세요!</div>
          )}
          {comments.map((comment) => (
            <div key={comment.id}>
              <div className="flex align-center space-between mt40">
                <div className="flex align-center">
                  <img src={grade} className="mr10" alt="grade" />
                  {comment.author}
                </div>
                <div className="flex align-center">{comment.date}</div>
              </div>
              <div className="comment-content mt10">
                {comment.content}
                <div className="line"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default PlayVideo;
