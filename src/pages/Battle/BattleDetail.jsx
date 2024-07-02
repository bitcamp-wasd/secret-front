import React, { useState } from "react";
import Layout from "../../components/Layout";
import VideoBox from "../../components/VideoBox_Ba";
import vs from "../../assets/images/vs.svg";
import Button from "../../components/Button";
import grade from "../../assets/images/grade.svg";
import battleheart from "../../assets/images/battleheart.svg";

const BattleDetail = () => {
    const dummyVideo = {
        id: 1,
        title: `Video 1 이렇게 제목이 길면 너가 뭘 할 수 있는지 궁금한데`,
        thumbnail: `https://via.placeholder.com/276x155.25?text=Thumbnail+1`,
        author: "홍길동",
    };

    const [isHeartFilled, setIsHeartFilled] = useState(false);
    const [comments, setComments] = useState([
        {
            id: 1,
            author: "김융",
            content: "오 그래도 잘하시는데요?",
            date: "24.06.01 17:01",
        },
        {
            id: 2,
            author: "병민",
            content: "정말 멋진 연주네요!",
            date: "24.06.01 17:15",
        },
    ]);
    const [newComment, setNewComment] = useState("");

    const handleHeartClick = () => {
        setIsHeartFilled(!isHeartFilled);
    };

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleCommentSubmit = () => {
        if (newComment.trim() !== "") {
            const now = new Date();
            const formattedDate = `${now.getFullYear().toString().slice(2)}.${(now.getMonth() + 1).toString().padStart(2, '0')}.${now.getDate().toString().padStart(2, '0')} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

            const newCommentData = {
                id: comments.length + 1,
                author: "새로운 유저", // 추후 DB에서 사용자 정보 받아와서 사용
                content: newComment,
                date: formattedDate,
            };
            setComments([...comments, newCommentData]);
            setNewComment("");
        }
    };

    return (
        <Layout>
            <div className="main-container-810 mt70">

                <div class="video-info">
                    <div class="video-info-title">
                        <div>자강두천 최병민과 김융의 가슴이 웅장해지는 대결</div>
                        <div>조회수7500회 종료일24.06.27</div>
                    </div>
                </div>


                <div className="flex">
                    <div>
                        <div className="sub-box-317 h370">
                            <div className="video-box">
                                <VideoBox
                                    key={dummyVideo.id}
                                    thumbnail={dummyVideo.thumbnail}
                                    title={dummyVideo.title}
                                    author={dummyVideo.author}
                                />
                            </div>
                        </div>
                        <div className="centered-content">
                            <img src={battleheart} className="battleheart" />
                            <div>1234</div>
                        </div>
                    </div>

                    <img src={vs} className="vs" />

                    <div>
                        <div className="sub-box-317 h370">
                            <div className="video-box">
                                <VideoBox
                                    key={dummyVideo.id}
                                    thumbnail={dummyVideo.thumbnail}
                                    title={dummyVideo.title}
                                    author={dummyVideo.author}
                                />
                            </div>
                        </div>
                        <div className="centered-content">
                            <img src={battleheart} className="battleheart" />
                            <div>1234</div>
                        </div>
                    </div>
                </div>

                {/* 댓글등록 */}
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

                {/* 댓글리스트 */}
                {comments.map((comment) => (
                    <div key={comment.id}>
                        <div className="flex align-center space-between mt40">
                            <div className="flex align-center">
                                <img src={grade} className="mr10" />
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
    )

}

export default BattleDetail;