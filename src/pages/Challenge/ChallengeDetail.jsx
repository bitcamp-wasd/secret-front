import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../../assets/css/style.css';
import '../../assets/css/jun.css';
import Layout from '../../components/Layout';
import Button from '../../components/Button';
import VideoPlay from '../../components/VideoPlay';
import heart from '../../assets/images/heart.svg';
import heart_fill from '../../assets/images/heart_fill.svg';
import grade from '../../assets/images/grade.svg';

const ChallengeDetail = () => {
    const { videoId } = useParams();
    const [videoData, setVideoData] = useState(null);
    const [challengeId, setChallengeId] = useState(null);
    const [isHeartFilled, setIsHeartFilled] = useState(false);
    const [animate, setAnimate] = useState(false);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [showCommentPlaceholder, setShowCommentPlaceholder] = useState(true);
    const [hasVoted, setHasVoted] = useState(false);
    const [pageNumber, setPageNumber] = useState(0);
    const [loading, setLoading] = useState(false);
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editingCommentText, setEditingCommentText] = useState("");

    const observer = useRef();

    useEffect(() => {
        const apiUrl = process.env.REACT_APP_API_URL;

        const fetchData = async () => {
            try {
                const videoResponse = await axios.get(`${apiUrl}/api/challenge/watch?videoId=${videoId}`);
                const videoData = videoResponse.data;
                setVideoData(videoData);
                setChallengeId(videoData.challengeId);

                const commentsResponse = await axios.get(`${apiUrl}/api/challenge/comment?videoId=${videoId}&pageNumber=${pageNumber}&pageSize=10`);
                setComments(commentsResponse.data);
                setShowCommentPlaceholder(commentsResponse.data.length === 0);

                // 투표 여부 확인
                const token = sessionStorage.getItem('accessToken');
                if (token) {
                    const voteCheckRequestData = {
                        challengeId: videoData.challengeId,
                        challengeListId: videoId,
                    };
                    const voteCheckResponse = await axios.post(
                        `${apiUrl}/api/challenge/auth/vote/check`,
                        voteCheckRequestData,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    const hasVoted = voteCheckResponse.data;
                    setIsHeartFilled(hasVoted);
                    setHasVoted(hasVoted);
                }
            } catch (error) {
                console.error("API 호출 중 오류 발생:", error);
            }
        };

        fetchData();
    }, [videoId, pageNumber]);

    const handleHeartClick = async () => {
        const token = sessionStorage.getItem('accessToken');

        if (!token) {
            if (window.confirm('로그인이 필요한 서비스입니다.\n\n로그인 하시겠습니까?')) {
                window.location.href = '/login';
            }
            return;
        }

        if (hasVoted) {
            alert('이미 투표하였습니다.');
            return;
        }

        setIsHeartFilled(true);
        setAnimate(true);
        setHasVoted(true);

        try {
            const requestData = {
                challengeId: challengeId,
                challengeListId: videoId,
            };

            console.log('요청 데이터:', requestData);

            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/challenge/auth/vote`,
                requestData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log('투표 요청 성공:', response.data);

            const videoResponse = await axios.get(`${process.env.REACT_APP_API_URL}/api/challenge/watch?videoId=${videoId}`);
            const updatedVideoData = videoResponse.data;
            setVideoData(updatedVideoData);
        } catch (error) {
            if (error.response) {
                console.error('서버 응답 오류:', error.response.data);
                console.error('서버 상태 코드:', error.response.status);
            } else if (error.request) {
                console.error('요청 오류:', error.request);
            } else {
                console.error('에러 발생:', error.message);
            }

            setIsHeartFilled(false);
            setHasVoted(false);
            alert('좋아요 요청 중 오류가 발생했습니다.');
        }

        setTimeout(() => {
            setAnimate(false);
        }, 500);
    };

    const handleCommentChange = (e) => {
        const value = e.target.value;
        if (value.length > 255) {
            alert("댓글은 최대 255자까지 입력할 수 있습니다.");
            return;
        }
        setNewComment(value);
    };

    const handleEditCommentChange = (e) => {
        const value = e.target.value;
        if (value.length > 255) {
            alert("댓글은 최대 255자까지 입력할 수 있습니다.");
            return;
        }
        setEditingCommentText(value);
    };

    const handleCommentSubmit = async () => {
        if (newComment.trim() === "") {
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
            const requestData = {
                videoId: videoId,
                comment: newComment,
            };

            await axios.post(
                `${process.env.REACT_APP_API_URL}/api/challenge/auth/comment`,
                requestData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const commentsResponse = await axios.get(`${process.env.REACT_APP_API_URL}/api/challenge/comment?videoId=${videoId}&pageNumber=${pageNumber}&pageSize=10`);
            setComments(commentsResponse.data);
            setNewComment("");
            setShowCommentPlaceholder(false);
            alert("댓글이 등록되었습니다.");
        } catch (error) {
            if (error.response) {
                console.error('서버 응답 오류:', error.response.data);
                console.error('서버 상태 코드:', error.response.status);
            } else if (error.request) {
                console.error('요청 오류:', error.request);
            } else {
                console.error('에러 발생:', error.message);
            }
            alert('댓글 등록 중 오류가 발생했습니다.');
        }
    };

    const handleCommentDelete = async (commentId) => {
        const token = sessionStorage.getItem('accessToken');

        if (!token) {
            if (window.confirm('로그인이 필요한 서비스입니다.\n\n로그인 하시겠습니까?')) {
                window.location.href = '/login';
            }
            return;
        }

        if (window.confirm('이 댓글을 삭제하시겠습니까?')) {
            try {
                // 서버가 배열 형식으로 댓글 ID를 받는다고 가정
                await axios.delete(
                    `${process.env.REACT_APP_API_URL}/api/challenge/auth/comment`,
                    {
                        data: {
                            commentIds: [commentId]  // 배열 형태로 삭제할 댓글 ID 전달
                        },
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setComments(comments.filter(comment => comment.commentId !== commentId));
                alert('댓글이 삭제되었습니다.');
            } catch (error) {
                if (error.response) {
                    console.error('서버 응답 오류:', error.response.data);
                    console.error('서버 상태 코드:', error.response.status);
                } else if (error.request) {
                    console.error('요청 오류:', error.request);
                } else {
                    console.error('에러 발생:', error.message);
                }
                alert('댓글 삭제 중 오류가 발생했습니다.');
            }
        }
    };

    const handleEditClick = (commentId, currentText) => {
        setEditingCommentId(commentId);
        setEditingCommentText(currentText);
    };

    const handleEditCommentSubmit = async () => {
        if (editingCommentText.trim() === "") {
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
            const requestData = {
                comment: editingCommentText,
            };

            await axios.patch(
                `${process.env.REACT_APP_API_URL}/api/challenge/auth/comment?commentId=${editingCommentId}`,
                requestData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const commentsResponse = await axios.get(`${process.env.REACT_APP_API_URL}/api/challenge/comment?videoId=${videoId}&pageNumber=${pageNumber}&pageSize=10`);
            setComments(commentsResponse.data);
            setEditingCommentId(null);
            setEditingCommentText("");
            alert("댓글이 수정되었습니다.");
        } catch (error) {
            if (error.response) {
                console.error('서버 응답 오류:', error.response.data);
            } else if (error.request) {
                console.error('요청 오류:', error.request);
            } else {
                console.error('에러 발생:', error.message);
            }
            alert('댓글 수정 중 오류가 발생했습니다.');
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${String(date.getFullYear()).slice(2)}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
    };

    const loadMoreComments = async () => {
        if (loading) return;

        setLoading(true);

        try {
            const commentsResponse = await axios.get(`${process.env.REACT_APP_API_URL}/api/challenge/comment?videoId=${videoId}&pageNumber=${pageNumber + 1}&pageSize=10`);
            if (commentsResponse.data.length > 0) {
                setComments(prevComments => [...prevComments, ...commentsResponse.data]);
                setPageNumber(prevPageNumber => prevPageNumber + 1);
            }
        } catch (error) {
            console.error("댓글 로딩 중 오류 발생:", error);
        } finally {
            setLoading(false);
        }
    };

    const lastCommentElementRef = useRef();


    useEffect(() => {
        const observerCallback = (entries) => {
            const [entry] = entries;
            if (entry.isIntersecting && !loading) {
                loadMoreComments();
            }
        };

        const observerInstance = new IntersectionObserver(observerCallback, {
            root: null,
            rootMargin: '0px',
            threshold: 1.0,
        });

        if (lastCommentElementRef.current) {
            observerInstance.observe(lastCommentElementRef.current);
        }

        return () => {
            if (lastCommentElementRef.current) {
                observerInstance.unobserve(lastCommentElementRef.current);
            }
        };
    }, [loading]);

    if (!videoData) {
        return <div>로딩 중...</div>;
    }

    // textarea 클릭 시
    const handleTextareaClick = () => {
        const token = sessionStorage.getItem('accessToken');
        if (!token) {
            if (window.confirm('로그인이 필요한 서비스입니다.\n\n로그인 하시겠습니까?')) {
                window.location.href = '/login';
            }
        }
    };
    console.log(videoData);
    console.log(videoData.video);
    const videoUrl = `https://ralnmjht3939.edge.naverncp.com/hls/3of~20qtSk4YcLxE52rCqA__/video/music/${videoData.videoPath}_AVC_,HD_1Pass_30fps,SD_1Pass_30fps,SD_1Pass_30fps_1,.mp4.smil/master.m3u8`;
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
                            <img src={grade} className="mr10" />{videoData.nickname}
                        </div>
                        <div className="flex align-center" onClick={handleHeartClick} style={{ cursor: 'pointer' }}>
                            <img
                                src={isHeartFilled ? heart_fill : heart}
                                className={`mr10 ${animate ? "heart-animation" : ""}`}
                            />
                            {videoData.cnt}
                        </div>
                    </div>
                </div>

                <div className="video-info mt40">
                    <div className="video-info-content">{videoData.description}</div>
                </div>

                {/* <div className="flex-end mt40 button-container">
                    <Button>수정</Button>
                    <Button>삭제</Button>
                </div> */}

                <div className="comment mt90">
                    <div>댓글 {comments.length}개</div>
                    <textarea
                        type="text"
                        placeholder="댓글을 입력하세요."
                        value={newComment}
                        onChange={handleCommentChange}
                        onClick={handleTextareaClick}
                    />
                </div>
                <div className="flex-end mt10 button-container">
                    <Button onClick={handleCommentSubmit}>등록</Button>
                </div>

                {showCommentPlaceholder && comments.length === 0 && (
                    <div className="comment-placeholder">
                        첫 댓글을 남겨보세요!
                    </div>
                )}

                {comments.map((comment, index) => (
                    <div key={comment.commentId} ref={comments.length === index + 1 ? lastCommentElementRef : null}>
                        <div className="flex align-center space-between mt40">
                            <div className="flex align-center">
                                <img src={grade} className="mr10" />
                                {comment.nickname}
                            </div>
                            <div className="flex align-center">
                                {formatDate(comment.createdAt)}
                            </div>
                        </div>
                        <div className="comment-content mt10">
                            {editingCommentId === comment.commentId ? (
                                <div className="comment">
                                    <textarea
                                        value={editingCommentText}
                                        onChange={handleEditCommentChange}
                                    />
                                    <div className="button-container mt10 mb10" style={{ textAlign: 'right' }}>
                                        <button className="button save" onClick={handleEditCommentSubmit}>완료</button>
                                        <button className="button can" onClick={() => {
                                            setEditingCommentId(null);
                                            setEditingCommentText("");
                                        }}>취소</button>
                                    </div>
                                </div>
                            ) : (
                                <div className="comment-wrapper">
                                    <div className="comment-text">
                                        {comment.comment}
                                    </div>
                                    <div className="comment-actions">
                                        <button className="button mod" onClick={() => handleEditClick(comment.commentId, comment.comment)}>수정</button>
                                        <button className="button del" onClick={() => handleCommentDelete(comment.commentId)}>삭제</button>
                                    </div>
                                    <div className="line"></div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                {loading && (
                    <div className="loading">Loading...</div>
                )}
            </div>
        </Layout>
    );
};

export default ChallengeDetail;
