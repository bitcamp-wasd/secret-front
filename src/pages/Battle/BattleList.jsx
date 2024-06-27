import React from "react";
import Layout_Ba from "../../components/Layout_Ba";
import VideoBox from "../../components/VideoBox_hart";
import "../../assets/css/style.css";
import vs from "../../assets/images/vs.svg"

const BattleList = () => {
    const dummyVideo = {
        id: 1,
        title: `Video 1 이렇게 제목이 길면 너가 뭘 할 수 있는지 궁금한데`,
        thumbnail: `https://via.placeholder.com/276x155.25?text=Thumbnail+1`,
        author: "홍길동",
    };

    return (
        <Layout_Ba showFooter={false}>

            <div className="main-container-810">
                <div className="main-container-810 mt70">
                    <div className="flex">
                        <div className="sub-box-317 h320">
                            <div className="video-box">
                                <VideoBox
                                    key={dummyVideo.id}
                                    thumbnail={dummyVideo.thumbnail}
                                    title={dummyVideo.title}
                                    author={dummyVideo.author}
                                />
                            </div>
                        </div>

                        <img src={vs} className="vs" />

                        <div className="sub-box-317">
                            <div className="video-box">
                                <VideoBox
                                    key={dummyVideo.id}
                                    thumbnail={dummyVideo.thumbnail}
                                    title={dummyVideo.title}
                                    author={dummyVideo.author}
                                />
                            </div>
                        </div>
                    </div>
                    <div class="video-info">
                        <div class="video-info-title">
                            <div>자강두천 최병민과 김융의 가슴이 웅장해지는 대결</div>
                            <div>조회수7500회 종료일24.06.27</div>
                        </div>
                    </div>
                </div>


                <div className="main-container-810 mt70">
                    <div className="flex">
                        <div className="sub-box-317 h320">
                            <div className="video-box">
                                <VideoBox
                                    key={dummyVideo.id}
                                    thumbnail={dummyVideo.thumbnail}
                                    title={dummyVideo.title}
                                    author={dummyVideo.author}
                                />
                            </div>
                        </div>

                        <img src={vs} className="vs" />

                        <div className="sub-box-317">
                            <div className="video-box">
                                <VideoBox
                                    key={dummyVideo.id}
                                    thumbnail={dummyVideo.thumbnail}
                                    title={dummyVideo.title}
                                    author={dummyVideo.author}
                                />
                            </div>
                        </div>
                    </div>
                    <div class="video-info">
                        <div class="video-info-title">
                            <div>자강두천 최병민과 김융의 가슴이 웅장해지는 대결</div>
                            <div>조회수7500회 종료일24.06.27</div>
                        </div>
                    </div>
                </div>


                <div className="main-container-810 mt70">
                    <div className="flex">
                        <div className="sub-box-317 h320">
                            <div className="video-box">
                                <VideoBox
                                    key={dummyVideo.id}
                                    thumbnail={dummyVideo.thumbnail}
                                    title={dummyVideo.title}
                                    author={dummyVideo.author}
                                />
                            </div>
                        </div>

                        <img src={vs} className="vs" />

                        <div className="sub-box-317">
                            <div className="video-box">
                                <VideoBox
                                    key={dummyVideo.id}
                                    thumbnail={dummyVideo.thumbnail}
                                    title={dummyVideo.title}
                                    author={dummyVideo.author}
                                />
                            </div>
                        </div>
                    </div>
                    <div class="video-info">
                        <div class="video-info-title">
                            <div>자강두천 최병민과 김융의 가슴이 웅장해지는 대결</div>
                            <div>조회수7500회 종료일24.06.27</div>
                        </div>
                    </div>
                </div>

            </div>
        </Layout_Ba>
    )
}

export default BattleList;