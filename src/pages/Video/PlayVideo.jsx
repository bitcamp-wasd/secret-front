import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import VideoPlay from "../../components/VideoPlay";
import "../../assets/css/style.css";
import "../../assets/css/jun.css";
import heart from "../../assets/images/heart.svg";
import heart_fill from "../../assets/images/heart_fill.svg";
import grade from "../../assets/images/grade.svg";
import Button from "../../components/Button";
import axios from "axios";

const PlayVideo = () => {
  const [videoData, setVideoData] = useState(null);
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [animate, setAnimate] = useState(false);
  const [showCommentPlaceholder, setShowCommentPlaceholder] = useState(true);
  const videoId = 3;

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/video/watch?id=${videoId}`);
        const data = await response.json();
        setVideoData(data);
        setLikeCount(data.likeCount);
      } catch (error) {
        console.error('비디오 데이터를 가져오는 중 오류 발생:', error);
      }
    };

    fetchVideoData();
  }, [videoId]);

  const handleHeartClick = async () => {
    setIsHeartFilled(!isHeartFilled); // 하트 아이콘 상태 업데이트
    setLikeCount(prevCount => isHeartFilled ? prevCount - 1 : prevCount + 1); // 좋아요 수 업데이트
    setAnimate(true); // 애니메이션 활성화

    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('사용자가 로그인하지 않았습니다. 로그인 후에 다시 시도해주세요.');
      }

      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/video/like/auth`,
        {
          params: { id: videoId }, // videoId는 해당 요청에서 사용될 동영상 ID입니다.
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // GET 요청을 성공적으로 보냈다면, 응답 처리 코드 추가 가능
      console.log('좋아요 요청 성공:', response.data);

    } catch (error) {
      console.error('좋아요 요청을 보내는 중 오류 발생:', error);
      // 오류 처리: 예를 들어 사용자에게 알림을 표시할 수 있습니다.
    }

    setTimeout(() => {
      setAnimate(false); // 애니메이션 비활성화
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

  if (!videoData) {
    return <div>로딩 중...</div>;
  }

  return (
    <Layout>
      <div className="main-container-810">
        <div className="videos-flex mt90">
          <VideoPlay thumbnail={videoData.thumbnail} />
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
              <img key={index} src={sheet} alt={`Sheet Music ${index + 1}`} className="play-sheetmusic" />
            ))}
          </div>

          <div className="flex-end mt40 button-container">
            <Button>수정</Button>
            <Button>삭제</Button>
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
