import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Layout from "../../components/Layout";
import VideoBox from "../../components/VideoBox_Ba";
import vs from "../../assets/images/vs.svg";
import Button from "../../components/Button";
import grade from "../../assets/images/grade.svg";
import battleheart_fill from "../../assets/images/battleheart_fill.svg";
import battleheart from "../../assets/images/battleheart.svg";
import { jwtDecode } from 'jwt-decode';

const BattleDetail = () => {
    const { battleId } = useParams(); // URL에서 battleId 값을 가져옴
    const [battle, setBattle] = useState(null); // 배틀 상세 정보 상태
    const [likeCount1, setLikeCount1] = useState(0);
    const [likeCount2, setLikeCount2] = useState(0);
    const [isHeartFilled1, setIsHeartFilled1] = useState(false);
    const [isHeartFilled2, setIsHeartFilled2] = useState(false);
    const [animate1, setAnimate1] = useState(false);
    const [animate2, setAnimate2] = useState(false);
    const [totalComments, setTotalComments] = useState(0);

    const [comments, setComments] = useState([]); // 댓글 상태 초기화
    const [newComment, setNewComment] = useState(""); // 새로운 댓글 입력 상태
    const [showCommentPlaceholder, setShowCommentPlaceholder] = useState(true); // 댓글 플레이스홀더 표시 상태

    const [pageNumber, setPageNumber] = useState(0); // 현재 페이지 번호 상태
    const [isLastPage, setIsLastPage] = useState(false); // 마지막 페이지 여부 상태

    const [editingCommentId, setEditingCommentId] = useState(null); // 현재 수정 중인 댓글의 ID를 추적하는 상태
    const [editingCommentText, setEditingCommentText] = useState(""); // 수정 중인 댓글의 텍스트를 저장하는 상태

    const observer = useRef();

    // 날짜와 시간을 원하는 포맷으로 변환하는 함수
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const formattedDate = `${String(date.getFullYear()).slice(2)}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
        return formattedDate;
    };

    // 현재 사용자 닉네임 가져오기
    // const getCurrentUserNickname = () => {
    //     const token = localStorage.getItem('accessToken');
    //     if (token) {
    //         const decodedToken = jwtDecode(token);
    //         console.log("Decoded token nickname:", decodedToken.nickName);
    //         return decodedToken.nickName;
    //     }
    //     return null;
    // };


    // 배틀 상세 정보 가져오기
    const fetchBattleDetail = async () => {
        try {
            const battleUrl = `${process.env.REACT_APP_API_URL}/api/battle/${battleId}`;
            const battleResponse = await axios.get(battleUrl);

            console.log("Battle detail API response:", battleResponse.data);

            // API에서 받아온 배틀 정보 설정
            setBattle(battleResponse.data);
            setLikeCount1(battleResponse.data.vote1Cnt);
            setLikeCount2(battleResponse.data.vote2Cnt);

            // 액세스 토큰이 있는 경우에만 호출
            const token = localStorage.getItem("accessToken");
            if (token) {
                const stateUrl = `${process.env.REACT_APP_API_URL}/api/battle/auth/${battleId}/state`;
                const stateResponse = await axios.get(stateUrl, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                console.log("Battle state API response:", stateResponse.data);

                // 투표 상태 업데이트
                setIsHeartFilled1(stateResponse.data.post1Vote);
                setIsHeartFilled2(stateResponse.data.post2Vote);
            }

        } catch (error) {
            console.error("Error fetching battle detail:", error);
        }
    };


    // 댓글 리스트 가져오기 (페이지네이션 포함)
    const fetchCommentList = async (page) => {
        try {
            const commentUrl = `${process.env.REACT_APP_API_URL}/api/battle/${battleId}/commentList?pageNumber=${page}`;

            const response = await axios.get(commentUrl);

            console.log("Comment list API response:", response.data);

            // 새로운 댓글과 기존 댓글 합치기
            setComments((prevComments) => {
                if (page === 0) {
                    return response.data.content;
                } else {
                    return [...prevComments, ...response.data.content];
                }
            });

            setIsLastPage(response.data.last); // 마지막 페이지 여부 설정
            setShowCommentPlaceholder(false); // 댓글 플레이스홀더 숨김

        } catch (error) {
            console.error("Error fetching comment list:", error);
            // 오류 처리: 예를 들어 사용자에게 알림을 표시할 수 있습니다.
        }
    };

    // 댓글 수정 시작
    const startEditingComment = (commentId, commentText) => {
        setEditingCommentId(commentId); // 수정 중인 댓글의 ID 설정
        setEditingCommentText(commentText); // 수정 중인 댓글의 내용 설정
    };

    // 댓글 수정 취소
    const cancelEditingComment = () => {
        setEditingCommentId(null); // 수정 중인 댓글 ID 초기화
        setEditingCommentText(""); // 수정 중인 댓글 내용 초기화
    };

    // 댓글 수정 함수
    const updateComment = async (commentId) => {
        try {
            const apiUrl = `${process.env.REACT_APP_API_URL}/api/battle/auth/${battleId}/update/${commentId}`;
            const token = localStorage.getItem("accessToken");

            if (!token) {
                // 로그인되지 않았을 경우, 로그인 페이지로 이동하도록 설정
                if (window.confirm("로그인이 필요한 서비스입니다.\n\n로그인 하시겠습니까?")) {
                    window.location.href = "/login";
                }
                return;
            }

            const response = await axios.put(
                apiUrl,
                { comment: editingCommentText },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log("댓글 수정 완료:", response.data);

            // 수정된 댓글을 포함한 전체 댓글 리스트 업데이트
            setComments((prevComments) =>
                prevComments.map((prevComment) =>
                    prevComment.battleCommentId === commentId ? { ...prevComment, comment: editingCommentText } : prevComment
                )
            );

            cancelEditingComment(); // 수정 취소 처리

        } catch (error) {
            console.error("댓글 수정 실패:", error);
            // 오류 처리: 예를 들어 사용자에게 알림을 표시할 수 있습니다.
        }
    };

    // 댓글 삭제
    const deleteComment = async (battleCommentId) => {
        try {
            const apiUrl = `${process.env.REACT_APP_API_URL}/api/battle/auth/${battleId}/delete/${battleCommentId}`;
            const token = localStorage.getItem("accessToken");

            if (!token) {
                // 사용자가 로그인하지 않은 경우 처리 (선택사항)
                // 여기서 리다이렉트하거나 로그인 프롬프트를 표시할 수 있습니다.
                return;
            }

            const response = await axios.delete(apiUrl, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("댓글 삭제 완료:", response.data);

            // UI에서 삭제된 댓글 제거하기
            setComments((prevComments) =>
                prevComments.filter((comment) => comment.battleCommentId !== battleCommentId)
            );

            // 총 댓글 수 업데이트
            setTotalComments((prevCount) => prevCount - 1);

            alert("댓글이 삭제되었습니다.");
        } catch (error) {
            console.error("댓글 삭제 실패:", error);
            // 오류 처리: 예를 들어 사용자에게 알림을 표시할 수 있습니다.
        }
    };


    // 댓글 수 가져오기
    const fetchCommentCount = async () => {
        try {
            const countUrl = `${process.env.REACT_APP_API_URL}/api/battle/${battleId}/count`;

            const response = await axios.get(countUrl);

            console.log("Total comment count API response:", response.data);

            // 총 댓글 수 설정
            setTotalComments(response.data);

        } catch (error) {
            console.error("Error fetching total comment count:", error);
            // 오류 처리: 예를 들어 사용자에게 알림을 표시할 수 있습니다.
        }
    };

    useEffect(() => {
        fetchBattleDetail();
        fetchCommentList(pageNumber); // 초기 호출은 첫 번째 페이지를 가져옵니다.
        fetchCommentCount(); // 총 댓글 수도 가져옵니다.
    }, [battleId, pageNumber]); // battleId나 pageNumber가 변경될 때마다 다시 불러옵니다.

    const lastCommentElementRef = useCallback((node) => {
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !isLastPage) {
                setPageNumber((prevPageNumber) => prevPageNumber + 1);
            }
        });
        if (node) observer.current.observe(node);
    }, [isLastPage]);

    // 투표 요청 보내기
    const handleVote = async (postId, index) => {
        try {
            const apiUrl = `${process.env.REACT_APP_API_URL}/api/battle/auth/${battleId}/vote?postId=${postId}`;
            const token = localStorage.getItem("accessToken");

            if (!token) {
                // 로그인되지 않았을 경우, 로그인 페이지로 이동하도록 설정
                if (window.confirm("로그인이 필요한 서비스입니다.\n\n로그인 하시겠습니까?")) {
                    window.location.href = "/login";
                }
                return;
            }

            const response = await axios.post(
                apiUrl,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // 투표 후 UI 업데이트
            if (index === 1) {
                if (!isHeartFilled1) {
                    setLikeCount1((prevCount) => prevCount + 1);
                    setIsHeartFilled1(true);
                    setAnimate1(true);
                    setTimeout(() => {
                        setAnimate1(false);
                    }, 300);

                    // 다른 투표 취소
                    if (isHeartFilled2) {
                        setLikeCount2((prevCount) => prevCount - 1);
                        setIsHeartFilled2(false);
                    }
                } else {
                    setLikeCount1((prevCount) => prevCount - 1);
                    setIsHeartFilled1(false);
                }
            } else if (index === 2) {
                if (!isHeartFilled2) {
                    setLikeCount2((prevCount) => prevCount + 1);
                    setIsHeartFilled2(true);
                    setAnimate2(true);
                    setTimeout(() => {
                        setAnimate2(false);
                    }, 300);

                    // 다른 투표 취소
                    if (isHeartFilled1) {
                        setLikeCount1((prevCount) => prevCount - 1);
                        setIsHeartFilled1(false);
                    }
                } else {
                    setLikeCount2((prevCount) => prevCount - 1);
                    setIsHeartFilled2(false);
                }
            }

        } catch (error) {
            console.error("투표 요청 실패:", error);
            // 오류 처리: 예를 들어 사용자에게 알림을 표시할 수 있습니다.
        }
    };

    // 댓글 등록 함수
    const postComment = async () => {
        try {
            // 입력된 댓글이 없는 경우 처리
            if (newComment.trim() === "") {
                alert("댓글 내용을 입력해주세요.");
                return;
            }

            const apiUrl = `${process.env.REACT_APP_API_URL}/api/battle/auth/${battleId}/comment`;
            const token = localStorage.getItem("accessToken");

            if (!token) {
                // 로그인되지 않았을 경우, 로그인 페이지로 이동하도록 설정
                if (window.confirm("로그인이 필요한 서비스입니다.\n\n로그인 하시겠습니까?")) {
                    window.location.href = "/login";
                }
                return;
            }

            const response = await axios.post(
                apiUrl,
                { comment: newComment },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // 댓글 등록 후 UI 업데이트
            console.log("댓글 등록 완료:", response.data);

            // 기존 댓글 목록 갱신을 위해 다시 불러오기
            fetchCommentList(0); // 첫 페이지부터 다시 불러옵니다.

            // 새로운 댓글 입력 상태 초기화
            setNewComment("");
            setShowCommentPlaceholder(false); // 댓글이 추가되었으므로 플레이스홀더 숨김

            // 무한 스크롤 관련 상태 초기화
            setPageNumber(0); // 페이지 번호 초기화
            setIsLastPage(false); // 마지막 페이지 상태 초기화

            alert("댓글이 등록되었습니다.");
        } catch (error) {
            console.error("댓글 등록 실패:", error);
            // 오류 처리: 예를 들어 사용자에게 알림을 표시할 수 있습니다.
        }
    };


    const handleHeartClick = (index) => {
        if (battle) {
            if (index === 1) {
                handleVote(battle.postId1.videoId, 1);
            } else if (index === 2) {
                handleVote(battle.postId2.videoId, 2);
            }
        }
    };

    const handleCommentChange = (e) => {
        setNewComment(e.target.value); // 댓글 입력 상태 업데이트
    };

    if (!battle) {
        return <p>Loading...</p>; // 배틀 정보를 가져오는 중일 때 로딩 상태 표시
    }

    return (
        <Layout>
            <div className="main-container-810 mt70">
                <div className="videos-flex">
                    <div className="battle-container mt80">
                        <div className="video-info">
                            <div className="video-info-title">
                                <div>{battle.title}</div>
                                <div>
                                    조회수 {battle.views}회 종료일 {formatDate(battle.endDate)}
                                </div>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="sub-battlebox-317">
                                <div className="video-box">
                                    <VideoBox
                                        key={`${battle.postId1.videoId}`}
                                        thumbnail={battle.postId1.thumbnail}
                                        title={battle.postId1.title}
                                        author={battle.postId1.nickname}
                                        views={battle.postId1.views}
                                        uploadDate={battle.postId1.uploadDate}
                                        length={battle.postId1.length}
                                    />
                                    <div className="centered-content below">
                                        <img
                                            onClick={() => handleHeartClick(1)}
                                            style={{ cursor: "pointer" }}
                                            src={isHeartFilled1 ? battleheart_fill : battleheart}
                                            className={`heart-icon ${animate1 ? "heart-animation" : ""}`}
                                            alt="heart-icon"
                                        />
                                        <div>{likeCount1}</div>
                                    </div>
                                </div>
                            </div>

                            <img src={vs} className="vs" alt="vs" />

                            <div className="sub-battlebox-317">
                                <div className="video-box">
                                    <VideoBox
                                        key={`${battle.postId2.videoId}`}
                                        thumbnail={battle.postId2.thumbnail}
                                        title={battle.postId2.title}
                                        author={battle.postId2.nickname}
                                        views={battle.postId2.views}
                                        uploadDate={battle.postId2.uploadDate}
                                        length={battle.postId2.length}
                                    />
                                    <div className="centered-content below">
                                        <img
                                            onClick={() => handleHeartClick(2)}
                                            style={{ cursor: "pointer" }}
                                            src={isHeartFilled2 ? battleheart_fill : battleheart}
                                            className={`heart-icon ${animate2 ? "heart-animation" : ""}`}
                                            alt="heart-icon"
                                        />
                                        <div>{likeCount2}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 댓글 등록 */}
                <div className="comment mt90">
                    <div>댓글 {totalComments}개</div>
                    <textarea
                        type="text"
                        placeholder="댓글을 입력하세요."
                        value={newComment}
                        onChange={handleCommentChange}
                    />
                </div>
                <div className="flex-end mt10 mb20 button-container">
                    <Button onClick={postComment}>등록</Button>
                </div>

                {/* 댓글 리스트 */}
                {showCommentPlaceholder && comments.length === 0 && (
                    <div className="comment-placeholder">첫 댓글을 남겨보세요!</div>
                )}
                {comments.map((comment, index) => (
                    <div key={comment.battleCommentId} ref={comments.length === index + 1 ? lastCommentElementRef : null}>
                        {editingCommentId === comment.battleCommentId ? (
                            // 수정 중인 댓글 편집 UI
                            <div className="comment">
                                <textarea
                                    value={editingCommentText}
                                    onChange={(e) => setEditingCommentText(e.target.value)}
                                />
                                <div className="button-container mt10 mb10" style={{ textAlign: 'right' }}>
                                    <button className="button save" onClick={() => updateComment(comment.battleCommentId)}>완료</button>
                                    <button className="button can" onClick={cancelEditingComment}>취소</button>
                                </div>
                            </div>
                        ) : (
                            // 일반 댓글 UI
                            <div className="comment-item">
                                <div className="comment-header">
                                    <div className="flex align-center space-between">
                                        <div className="flex align-center">
                                            <img src={grade} className="mr10" alt="grade" />
                                            <span>{comment.nickname}</span>
                                        </div>
                                        <div className="flex align-center">
                                            <span>{formatDate(comment.createDate)}</span>
                                        </div>
                                    </div>
                                    <div className="comment-content mt10">
                                        <div style={{ overflow: 'hidden' }}>
                                            <span style={{ float: 'left' }}>{comment.comment}</span>
                                            {/* {comment.nickname === getCurrentUserNickname() && ( */}
                                            <div style={{ float: 'right' }}>
                                                <button className="button mod" onClick={() => startEditingComment(comment.battleCommentId, comment.comment)}>수정</button>
                                                <button className="button del" onClick={() => deleteComment(comment.battleCommentId)}>삭제</button>
                                            </div>
                                            {/* )} */}
                                        </div>
                                        <div className="line"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </Layout>
    );
};

export default BattleDetail;
