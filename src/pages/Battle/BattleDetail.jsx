import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Layout from "../../components/Layout";
import VideoBox from "../../components/VideoBox_Ba";
import vs from "../../assets/images/vs.svg";
import Button from "../../components/Button";
import grade from "../../assets/images/grade.svg";
import battleheart_fill from "../../assets/images/battleheart_fill.svg";
import battleheart from "../../assets/images/battleheart.svg";

const BattleDetail = () => {
    const { battleId } = useParams(); // URL에서 battleId 값을 가져옴
    const [battle, setBattle] = useState(null); // 배틀 상세 정보 상태
    const [likeCount1, setLikeCount1] = useState(0);
    const [likeCount2, setLikeCount2] = useState(0);
    const [isHeartFilled1, setIsHeartFilled1] = useState(false);
    const [isHeartFilled2, setIsHeartFilled2] = useState(false);
    const [animate1, setAnimate1] = useState(false);
    const [animate2, setAnimate2] = useState(false);

    const [comments, setComments] = useState([]); // 댓글 상태 초기화
    const [newComment, setNewComment] = useState(""); // 새로운 댓글 입력 상태
    const [showCommentPlaceholder, setShowCommentPlaceholder] = useState(true); // 댓글 플레이스홀더 표시 상태

    const [pageNumber, setPageNumber] = useState(0); // 현재 페이지 번호 상태
    const [totalComments, setTotalComments] = useState(0); // 총 댓글 수 상태

    // 배틀 상세 정보 가져오기
    const fetchBattleDetail = async () => {
        try {
            const battleUrl = `${process.env.REACT_APP_API_URL}/api/battle/${battleId}`;
            const stateUrl = `${process.env.REACT_APP_API_URL}/api/battle/auth/${battleId}/state`;

            // 병렬로 API 호출
            const [battleResponse, stateResponse] = await Promise.all([
                axios.get(battleUrl),
                axios.get(stateUrl, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                }),
            ]);

            console.log("Battle detail API response:", battleResponse.data);
            console.log("Battle state API response:", stateResponse.data);

            // API에서 받아온 배틀 정보 설정
            setBattle(battleResponse.data);
            setLikeCount1(battleResponse.data.vote1Cnt);
            setLikeCount2(battleResponse.data.vote2Cnt);

            // 투표 상태 업데이트
            setIsHeartFilled1(stateResponse.data.post1Vote);
            setIsHeartFilled2(stateResponse.data.post2Vote);

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

            // API에서 받아온 댓글 리스트 설정
            setComments(response.data.content);
            setShowCommentPlaceholder(false); // 댓글 플레이스홀더 숨김

        } catch (error) {
            console.error("Error fetching comment list:", error);
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

            console.log(response.data);

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

    // 댓글 작성 함수
    const postComment = async () => {
        try {
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

            // 댓글 등록 후 총 댓글 수 업데이트
            fetchCommentCount(); // 총 댓글 수 다시 가져오기

            // 댓글 등록 후 댓글 목록 다시 불러오기
            fetchCommentList(pageNumber); // 현재 페이지를 다시 가져옵니다.

            // 댓글 입력 상태 초기화
            setNewComment("");
            setShowCommentPlaceholder(false); // 댓글이 추가되었으므로 플레이스홀더 숨김

            alert("댓글이 등록되었습니다.");
        } catch (error) {
            console.error("댓글 등록 실패:", error);
            // 오류 처리: 예를 들어 사용자에게 알림을 표시할 수 있습니다.
        }
    };

    const handleHeartClick = (index) => {
        if (index === 1) {
            handleVote(battle.postId1.videoId, 1);
        } else if (index === 2) {
            handleVote(battle.postId2.videoId, 2);
        }
    };

    const handleCommentChange = (e) => {
        setNewComment(e.target.value); // 댓글 입력 상태 업데이트
    };

    const handlePageChange = (newPageNumber) => {
        setPageNumber(newPageNumber); // 페이지 번호 변경
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
                                    조회수 {battle.views}회 종료일 {battle.endDate}
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
                <div className="flex-end mt10 button-container">
                    <Button onClick={postComment}>등록</Button>
                </div>

                {/* 댓글 리스트 */}
                {showCommentPlaceholder && comments.length === 0 && (
                    <div className="comment-placeholder">첫 댓글을 남겨보세요!</div>
                )}
                {comments.map((comment) => (
                    <div key={comment.battleCommentId}>
                        <div className="flex align-center space-between mt40">
                            <div className="flex align-center">
                                <img src={grade} className="mr10" alt="grade" />
                                {comment.nickname}
                            </div>
                            <div className="flex align-center">
                                {comment.createDate}
                                <div className="ml10">
                                    <button className="button mod">수정</button>
                                    <button className="button del">삭제</button>
                                </div>
                            </div>
                        </div>
                        <div className="comment-content mt10">
                            {comment.comment}
                            <div className="line"></div>
                        </div>
                    </div>

                ))}

                {/* 페이지네이션 UI */}
                <div className="pagination">
                    <Button onClick={() => handlePageChange(pageNumber - 1)} disabled={pageNumber === 0}>
                        이전
                    </Button>
                    <Button onClick={() => handlePageChange(pageNumber + 1)} disabled={comments.length < 5}>
                        다음
                    </Button>
                </div>
            </div>
        </Layout>
    );
};

export default BattleDetail;
