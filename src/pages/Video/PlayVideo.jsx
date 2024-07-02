import React, { useState } from "react";
import Layout from "../../components/Layout";
import VideoPlay from "../../components/VideoPlay";
import VideoBox from "../../components/VideoBox_hart";
import "../../assets/css/style.css";
import "../../assets/css/jun.css";
import SheetMusic from "../../assets/images/Sheet_Music.svg";
import heart from "../../assets/images/heart.svg";
import heart_fill from "../../assets/images/heart_fill.svg";
import grade from "../../assets/images/grade.svg";
import Button from "../../components/Button";

const PlayVideo = () => {
  const dummyVideo = {
    id: 1,
    thumbnail: "https://via.placeholder.com/810x455.6?text=Thumbnail+1",
  };

  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const [likeCount, setLikeCount] = useState(2574);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [animate, setAnimate] = useState(false);
  const [showCommentPlaceholder, setShowCommentPlaceholder] = useState(true);

  const handleHeartClick = () => {
    setIsHeartFilled(!isHeartFilled);
    setLikeCount(prevCount => isHeartFilled ? prevCount - 1 : prevCount + 1);
    setAnimate(true);

    setTimeout(() => {
      setAnimate(false);
    }, 500); // 애니메이션 지속 시간과 동일하게 설정
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
    setShowCommentPlaceholder(false); // 댓글이 추가되었으므로 플레이스홀더 숨김

    alert("댓글이 등록되었습니다.");
  };

  return (
    <Layout>
      {/* 동영상 */}
      <div className="main-container-810">
        <div className="videos-grid mt90">
          <VideoPlay thumbnail={dummyVideo.thumbnail} />
        </div>

        {/* 정보 */}
        <div className="play-infobox mt20">
          <div className="flex align-center space-between">
            <div>캐논 변주곡</div>
            <div>#기타</div>
          </div>
          <div className="flex align-center space-between mt10">
            <div className="flex align-center">
              <img src={grade} className="mr10" alt="grade" />
              김융
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

        {/* 설명 */}
        <div className="video-info mt40">
          <div className="video-info-title">
            <div>조회수 7500회</div>
            <div>24.05.26 17:14</div>
          </div>
          <div className="video-info-content">
            기타로 연주한 캐논 변주곡입니다. 부족한 실력이지만 열심히 했습니다.
          </div>

          {/* 악보 */}
          <div>
            <img src={SheetMusic} alt="SheetMusic" className="mt40" />
          </div>

          {/* 버튼 */}
          <div className="flex-end mt40 button-container">
            <Button>수정</Button>
            <Button>삭제</Button>
          </div>

          {/* 댓글 등록 */}
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

          {/* 댓글 리스트 */}
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
