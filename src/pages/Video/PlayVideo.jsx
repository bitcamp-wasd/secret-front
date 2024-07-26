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
  const navigate = useNavigate();
  const [videoData, setVideoData] = useState(null);
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editCommentId, setEditCommentId] = useState(null);
  const [editCommentText, setEditCommentText] = useState("");
  const [animate, setAnimate] = useState(false);
  const [showCommentPlaceholder, setShowCommentPlaceholder] = useState(true);
  const [currentUserNickname, setCurrentUserNickname] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [hasMoreComments, setHasMoreComments] = useState(true);
  const [loading, setLoading] = useState(false);

  // 날짜와 시간을 원하는 포맷으로 변환하는 함수
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = `${String(date.getFullYear()).slice(2)}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
    return formattedDate;
  };

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

    const fetchComments = async (page = 0) => {
      setLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/video/comment`, {
          params: { videoId: videoId, pageNumber: page }
        });
        if (response.data.length > 0) {
          // 포맷팅된 댓글 데이터 생성
          const formattedComments = response.data.map(comment => ({
            ...comment,
            createDate: formatDate(comment.createDate)
          }));
          setComments(prevComments => [...prevComments, ...formattedComments]);
          setHasMoreComments(response.data.length > 0); // 댓글이 있으면 계속 로드 가능
        } else {
          setHasMoreComments(false); // 더 이상 로드할 댓글이 없음
        }
      } catch (error) {
        console.error('댓글을 가져오는 중 오류 발생:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideoData();
    fetchLikeStatus();
    fetchCurrentUserNickname();
    fetchComments(pageNumber);
  }, [videoId, pageNumber]);

  useEffect(() => {
    const handleScroll = () => {
      const bottom = window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight;
      if (bottom && hasMoreComments && !loading) {
        setPageNumber(prevPage => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMoreComments, loading]);

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

  const handleCommentSubmit = async () => {
    if (newComment.trim() === "") {
      alert("댓글을 입력해주세요.");
      return;
    }

    const token = sessionStorage.getItem('accessToken');
    if (!token) {
      if (window.confirm('로그인이 필요한 서비스입니다.\n\n로그인 하시겠습니까?')) {
        window.location.href = '/login';
      }
      return;
    }

    const now = new Date();
    const formattedDate = formatDate(now.toISOString()); // 현재 시간을 포맷팅

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/video/auth/comment`, {
        videoId: videoId,
        comment: newComment
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log('댓글 등록 성공:', response.data);

      const newCommentData = {
        commentId: response.data.commentId,
        nickname: currentUserNickname,
        rankName: "16분음표",
        comment: newComment,
        createDate: formattedDate,
      };

      console.log(newCommentData);

      // 새 댓글을 맨 위에 추가
      setComments(prevComments => [newCommentData, ...prevComments]);
      setNewComment("");
      setShowCommentPlaceholder(false);

      alert("댓글이 등록되었습니다.");
    } catch (error) {
      console.error('댓글 등록 중 오류 발생:', error);
      alert("댓글 등록 중 오류가 발생했습니다.");
    }
  };

  const handleEditComment = (commentId, commentText) => {
    setEditCommentId(commentId);
    setEditCommentText(commentText);
  };

  const handleEditCommentChange = (e) => {
    setEditCommentText(e.target.value);
  };

  const handleEditCommentSubmit = async () => {
    if (editCommentText.trim() === "") {
      alert("댓글 내용을 입력해주세요.");
      return;
    }

    const token = sessionStorage.getItem('accessToken');
    if (!token) {
      if (window.confirm('로그인이 필요한 서비스입니다.\n\n로그인 하시겠습니까?')) {
        window.location.href = '/login';
      }
      return;
    }

    try {
      const response = await axios.patch(`${process.env.REACT_APP_API_URL}/api/video/auth/comment`, {
        comment: editCommentText
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        params: {
          commentId: editCommentId
        }
      });

      console.log('댓글 수정 성공');

      // 댓글 수정 후 댓글 리스트 업데이트
      setComments(prevComments => prevComments.map(comment =>
        comment.commentId === editCommentId ? { ...comment, comment: editCommentText } : comment
      ));
      setEditCommentId(null);
      setEditCommentText("");
      alert("댓글이 수정되었습니다.");
    } catch (error) {
      console.error('댓글 수정 중 오류 발생:', error.response?.data || error.message);
      alert("댓글 수정 중 오류가 발생했습니다.");
    }
  };

  const handleCancelEdit = () => {
    setEditCommentId(null);
    setEditCommentText("");
  };

  const handleDelete = async (commentId) => {
    const token = sessionStorage.getItem('accessToken');
    if (!token) {
      if (window.confirm('로그인이 필요한 서비스입니다.\n\n로그인 하시겠습니까?')) {
        window.location.href = '/login';
      }
      return;
    }

    const confirmDelete = window.confirm('정말로 이 댓글을 삭제하시겠습니까?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/video/auth/comment`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { commentIds: [commentId] }, // 삭제할 댓글 ID를 배열로 전달
      });

      console.log('댓글 삭제 성공');
      setComments(prevComments => prevComments.filter(comment => comment.commentId !== commentId));
      alert('댓글이 삭제되었습니다.');
    } catch (error) {
      console.error('댓글 삭제 중 오류 발생:', error);
      alert('댓글 삭제 중 오류가 발생했습니다.');
    }
  };

  const handleDeleteVideo = async () => {
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
      window.location.href = '/';
    } catch (error) {
      console.error('비디오 삭제 중 오류 발생:', error);
      alert('비디오 삭제 중 오류가 발생했습니다.');
    }
  };

  const handleEdit = () => {
    navigate(`/video/modify/${videoId}`);
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
                <Button onClick={handleEdit}>수정</Button>
                <Button onClick={handleDeleteVideo}>삭제</Button>
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
            <div key={comment.commentId}>
              <div className="flex align-center space-between mt10">
                <div className="flex align-center">
                  <img src={grade} className="mr10" alt="grade" />
                  {comment.nickname}
                </div>
                <div className="flex align-center">{comment.createDate}</div>
              </div>
              <div className="comment-content mt10">
                <div className="comment">
                  {editCommentId === comment.commentId ? (
                    <div>
                      <textarea
                        value={editCommentText}
                        onChange={handleEditCommentChange}
                      />
                      <div className="button-container mt10 mb10" style={{ textAlign: 'right' }}>
                        <button className="button save" onClick={handleEditCommentSubmit}>완료</button>
                        <button className="button can" onClick={handleCancelEdit}>취소</button>
                      </div>
                    </div>

                  ) : (
                    <div>
                      {comment.comment}
                      {currentUserNickname === comment.nickname && (
                        <div style={{ textAlign: 'right' }}>
                          <button className="button mod" onClick={() => handleEditComment(comment.commentId, comment.comment)}>수정</button>
                          <button className="button del" onClick={() => handleDelete(comment.commentId)}>삭제</button>
                        </div>
                      )}
                    </div>
                  )}
                  <div className="line"></div>
                </div>
              </div>
            </div>
          ))}

          {loading && <div>로딩 중...</div>} {/* 로딩 상태 표시 */}
        </div>
      </div>
    </Layout>
  );
};

export default PlayVideo;
