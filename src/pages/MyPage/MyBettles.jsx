import React, { useState, useEffect } from "react";
import "../../assets/css/style.css";
import VideoBox from "../../components/VideoBox_hart";
import Layout from '../../components/Layout';
import vs from "../../assets/images/vs.svg"


const MyBettles = () => {
    const allBattles = Array.from({ length: 20 }, (_, index) => ({
        id: index + 1,
        title: `자강두천 최병민과 김융의 가슴이 웅장해지는 대결 ${index + 1}`,
        author1: "최병민",
        author2: "김융",
        views: 7500,
        endDate: "24.06.27",
        thumbnail1: `https://via.placeholder.com/276x155.25?text=Thumbnail1+${index + 1}`,
        thumbnail2: `https://via.placeholder.com/276x155.25?text=Thumbnail2+${index + 1}`,
    }));

    const [visibleBattles, setVisibleBattles] = useState(6); // 한 번에 표시할 배틀 수
    const [battles, setBattles] = useState(allBattles.slice(0, visibleBattles));

    // 더 많은 배틀 불러오기
    const loadMoreBattles = () => {
        setVisibleBattles((prevVisibleBattles) => {
            const newVisibleBattles = prevVisibleBattles + 6; // 추가로 표시할 배틀 수
            setBattles(allBattles.slice(0, newVisibleBattles));
            return newVisibleBattles;
        });
    };

    // 스크롤 이벤트 핸들러
    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop >=
            document.documentElement.scrollHeight - 50
        ) {
            loadMoreBattles();
        }
    };

    // 스크롤 이벤트 리스너 등록
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <Layout showFooter={false} bannerType="my">

            <div className="main-container-810">
                <div className="videos-grid">
                    {battles.map((battle) => (
                        <div key={battle.id} className="battle-container mt80">
                            <div className="flex">
                                <div className="sub-battlebox-317 h320">
                                    <div className="video-box">
                                        <VideoBox
                                            key={battle.id + "-1"}
                                            thumbnail={battle.thumbnail1}
                                            title={battle.title}
                                            author={battle.author1}
                                        />
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
                                    </div>
                                </div>
                            </div>
                            <div className="video-info">
                                <div className="video-info-title">
                                    <div>{battle.title}</div>
                                    <div>조회수 {battle.views}회 종료일 {battle.endDate}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};
export default MyBettles;
