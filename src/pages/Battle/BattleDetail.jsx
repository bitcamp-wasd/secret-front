import React from "react";
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

                <div className="comment mt90">
                    <div>댓글 254개

                    </div>
                    <textarea type="text" placeholder="댓글을 입력하세요." />
                </div>
                <div className="flex-end mt10 button-container">
                    <Button>등록</Button>
                </div>

                {/* 댓글리스트 */}
                <div className="flex align-center space-between mt40">
                    <div className="flex align-center">
                        <img src={grade} className="mr10" />
                        김융
                    </div>
                    <div className="flex align-center">24.06.01 17:01</div>
                </div>
                <div className="comment-content mt10">
                    오 그래도 잘하시는데요?
                    <div className="line"></div>
                </div>

                <div className="flex align-center space-between mt40">
                    <div className="flex align-center">
                        <img src={grade} className="mr10" />
                        김융
                    </div>
                    <div className="flex align-center">24.06.01 17:01</div>
                </div>
                <div className="comment-content mt10">
                    오 그래도 잘하시는데요?
                    <div className="line"></div>
                </div>
            </div>
        </Layout>
    )

}

export default BattleDetail;