import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../assets/css/style.css";
import Layout from "../../components/Layout";
import VideoBox from "../../components/VideoBox_hart";
import VideoBox2 from "../../components/VideoBox_hart2";
import vs from "../../assets/images/vs.svg";

// 날짜를 YY.MM.DD 형식으로 포맷하는 함수
const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear().toString().slice(-2); // YY
    const month = String(date.getMonth() + 1).padStart(2, '0'); // MM
    const day = String(date.getDate()).padStart(2, '0'); // DD
    return `${year}.${month}.${day}`;
};

const BattleList = () => {
    const [battles, setBattles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [pageNumber, setPageNumber] = useState(0);

    const observer = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Page number changed: ", pageNumber); // 페이지 번호 확인
        loadBattles(pageNumber);
    }, [pageNumber]);

    const loadBattles = async (page) => {
        if (loading) return;
        setLoading(true);

        try {
            const apiUrl = process.env.REACT_APP_API_URL;
            const response = await axios.get(`${apiUrl}/api/battle/list?pageNumber=${page}`);
            console.log("API response:", response.data); // API 응답 확인

            const newBattles = response.data.content;

            setBattles((prevBattles) => [...prevBattles, ...newBattles]);
            setLoading(false);

            if (newBattles.length === 0) {
                setHasMore(false);
            }
        } catch (error) {
            console.error("Error fetching battles:", error); // 오류 메시지 확인
            setLoading(false);
        }
    };

    const handleObserver = (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore && !loading) {
            setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
    };

    useEffect(() => {
        observer.current = new IntersectionObserver(handleObserver, {
            root: null,
            rootMargin: "0px",
            threshold: 0.1,
        });

        if (battles.length > 0) {
            const lastBattleElement = document.querySelector(".videos-flex > div:last-child");
            if (lastBattleElement) {
                observer.current.observe(lastBattleElement);
            }
        }

        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
        };
    }, [battles]);

    const handleClick = (battleId) => {
        navigate(`/battle/detail/${battleId}`);
    };

    return (
        <Layout showFooter={false} bannerType="battle">
            <div className="main-container-810">
                <div className="videos-flex">
                    {battles.length === 0 && !loading && <p>배틀이 없습니다.</p>}
                    {battles.map((battle) => (
                        <div
                            key={battle.battleId}
                            className="battle-container mt60"
                            onClick={() => handleClick(battle.battleId)}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="flex">
                                <div className="sub-battlebox-317 h320">
                                    <div className="video-box">
                                        <VideoBox
                                            key={battle.postId1.videoId}
                                            thumbnail={battle.postId1.thumbnail}
                                            title={battle.postId1.title}
                                            views={battle.postId1.views}
                                            length={battle.postId1.length}
                                            uploadDate={battle.postId1.uploadDate}
                                            author={battle.postId1.nickname}
                                            vote1Cnt={battle.vote1Cnt}
                                        />
                                    </div>
                                </div>

                                <img src={vs} className="vs" alt="vs" />

                                <div className="sub-battlebox-317">
                                    <div className="video-box">
                                        <VideoBox2
                                            key={battle.postId2.videoId}
                                            thumbnail={battle.postId2.thumbnail}
                                            title={battle.postId2.title}
                                            views={battle.postId2.views}
                                            length={battle.postId2.length}
                                            uploadDate={battle.postId2.uploadDate}
                                            author={battle.postId2.nickname}
                                            vote2Cnt={battle.vote2Cnt}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="video-info">
                                <div className="video-info-title mb20">
                                    <div>{battle.title}</div>
                                    <div>조회수 {battle.views}회 종료일 {formatDate(battle.endDate)}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {loading && <div className="spinner"></div>}
            </div>
        </Layout>
    );
};

export default BattleList;
