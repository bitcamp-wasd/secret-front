import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // useParams 훅을 사용하여 URL 파라미터를 추출
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
    const { videoId } = useParams(); // URL에서 videoId 추출
    const [videoData, setVideoData] = useState(null);
    const [isHeartFilled, setIsHeartFilled] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [animate, setAnimate] = useState(false);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [showCommentPlaceholder, setShowCommentPlaceholder] = useState(true);

    useEffect(() => {
        const apiUrl = process.env.REACT_APP_API_URL;

        axios.get(`${apiUrl}/api/challenge/watch?videoId=${videoId}`)
            .then(response => {
                const data = response.data;
                setVideoData(data);
                setLikeCount(data.cnt); // 초기 좋아요 수 설정
            })
            .catch(error => {
                console.error("API 호출 중 오류 발생:", error);
            });
    }, [videoId]);

    const handleHeartClick = () => {
        setIsHeartFilled(!isHeartFilled);
        setLikeCount(prevCount => isHeartFilled ? prevCount - 1 : prevCount + 1);
        setAnimate(true);

        setTimeout(() => {
            setAnimate(false);
        }, 300); // 애니메이션 지속 시간과 동일하게 설정
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
                author: "새로운 유저",
                content: newComment,
                date: formattedDate,
            };
            setComments([...comments, newCommentData]);
            setNewComment("");
            setShowCommentPlaceholder(false);

            alert("댓글이 등록되었습니다.");
        }
    };

    if (!videoData) {
        return <div>로딩 중...</div>;
    }

    return (
        <Layout>
            <div className="main-container-810">
                <div className="videos-flex mt90">
                    <VideoPlay thumbnail={videoData.thumbnailPath} />
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
                            {likeCount}
                        </div>
                    </div>
                </div>

                <div className="video-info mt40">
                    <div className="video-info-title">
                    </div>
                    <div className="video-info-content">{videoData.description}</div>
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
                    <div className="comment-placeholder">
                        첫 댓글을 남겨보세요!
                    </div>
                )}
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
    );
};

export default ChallengeDetail;
