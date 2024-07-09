import React, { useState } from "react";
import Layout from "../../components/Layout";
import VideoBox from "../../components/VideoBox_Ba";
import vs from "../../assets/images/vs.svg";
import Button from "../../components/Button";
import grade from "../../assets/images/grade.svg";
import battleheart_fill from "../../assets/images/battleheart_fill.svg";
import battleheart from "../../assets/images/battleheart.svg";

const BattleDetail = () => {
    const allBattles = Array.from({ length: 1 }, (_, index) => ({
        id: index + 1,
        title: `자강두천 최병민과 김융의 가슴이 웅장해지는 대결 ${index + 1}`,
        author1: "최병민",
        author2: "김융",
        views: 7500,
        endDate: "24.06.27",
        thumbnail1: `https://via.placeholder.com/276x155.25?text=Thumbnail1+${index + 1}`,
        thumbnail2: `https://via.placeholder.com/276x155.25?text=Thumbnail2+${index + 1}`,
    }));

    const [visibleBattles, setVisibleBattles] = useState(2); // 한 번에 표시할 배틀 수
    const [battles, setBattles] = useState(allBattles.slice(0, visibleBattles));

    const [likeCount1, setLikeCount1] = useState(1234);
    const [likeCount2, setLikeCount2] = useState(1234);
    const [isHeartFilled1, setIsHeartFilled1] = useState(false);
    const [isHeartFilled2, setIsHeartFilled2] = useState(false);
    const [animate1, setAnimate1] = useState(false);
    const [animate2, setAnimate2] = useState(false);

    const [comments, setComments] = useState([]); // 댓글 상태 초기화

    const [newComment, setNewComment] = useState(""); // 새로운 댓글 입력 상태
    const [showCommentPlaceholder, setShowCommentPlaceholder] = useState(true); // 댓글 플레이스홀더 표시 상태

    const handleHeartClick = (index) => {
        if (index === 1) {
            setIsHeartFilled1(!isHeartFilled1);
            setLikeCount1((prevCount) =>
                isHeartFilled1 ? prevCount - 1 : prevCount + 1
            );
            setAnimate1(true);

            setTimeout(() => {
                setAnimate1(false);
            }, 300); // 애니메이션 지속 시간과 동일하게 설정
        } else if (index === 2) {
            setIsHeartFilled2(!isHeartFilled2);
            setLikeCount2((prevCount) =>
                isHeartFilled2 ? prevCount - 1 : prevCount + 1
            );
            setAnimate2(true);

            setTimeout(() => {
                setAnimate2(false);
            }, 300); // 애니메이션 지속 시간과 동일하게 설정
        }
    };

    const handleCommentChange = (e) => {
        setNewComment(e.target.value); // 댓글 입력 상태 업데이트
    };

    const handleCommentSubmit = () => {
        if (newComment.trim() !== "") {
            const now = new Date();
            const formattedDate = `${now
                .getFullYear()
                .toString()
                .slice(2)}.${(now.getMonth() + 1)
                    .toString()
                    .padStart(2, "0")}.${now.getDate()
                        .toString()
                        .padStart(2, "0")} ${now.getHours()
                            .toString()
                            .padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;

            const newCommentData = {
                id: comments.length + 1,
                author: "새로운 유저", // 추후 DB에서 사용자 정보 받아와서 사용
                content: newComment,
                date: formattedDate,
            };
            setComments([...comments, newCommentData]);
            setNewComment("");
            setShowCommentPlaceholder(false); // 댓글이 추가되었으므로 플레이스홀더 숨김

            alert("댓글이 등록되었습니다.");
        }
    };

    return (
        <Layout>
            <div className="main-container-810 mt70">
                <div className="videos-flex">
                    {battles.map((battle) => (
                        <div key={battle.id} className="battle-container mt80">
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
                                            key={battle.id + "-1"}
                                            thumbnail={battle.thumbnail1}
                                            title={battle.title}
                                            author={battle.author1}
                                        />
                                        <div className="centered-content below">
                                            <img
                                                onClick={() => handleHeartClick(1)}
                                                style={{ cursor: "pointer" }}
                                                src={isHeartFilled1 ? battleheart_fill : battleheart}
                                                className={`heart-icon ${animate1 ? "heart-animation" : ""
                                                    }`}
                                            />
                                            <div>{likeCount1}</div>
                                        </div>
                                    </div>
                                </div>

                                <img src={vs} className="vs" alt="vs" />

                                <div className="sub-battlebox-317">
                                    <div className="video-box">
                                        <VideoBox
                                            key={battle.id + "-2"}
                                            thumbnail={battle.thumbnail2}
                                            title={battle.title}
                                            author={battle.author2}
                                        />
                                        <div className="centered-content below">
                                            <img
                                                onClick={() => handleHeartClick(2)}
                                                style={{ cursor: "pointer" }}
                                                src={isHeartFilled2 ? battleheart_fill : battleheart}
                                                className={`heart-icon ${animate2 ? "heart-animation" : ""
                                                    }`}
                                            />
                                            <div>{likeCount2}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
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
        </Layout>
    );
};

export default BattleDetail;
