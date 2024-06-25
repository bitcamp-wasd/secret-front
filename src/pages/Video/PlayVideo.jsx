import React from 'react';
import Layout from '../../components/Layout';
import VideoPlay from '../../components/VideoPlay';
import '../../assets/css/style.css';
import '../../assets/css/jun.css';
import SheetMusic from "../../assets/images/Sheet_Music.svg";
import heart from "../../assets/images/heart.svg";
import grade from "../../assets/images/grade.svg"
import Button from '../../components/Button';

const PlayVideo = () => {
    const dummyVideo = {
        id: 1,
        thumbnail: 'https://via.placeholder.com/810x455.6?text=Thumbnail+1',
    }

    return (
        <Layout>
            {/* 동영상 */}
            <div className="main-box-810">
                <div className="videos-grid mt90">
                    <VideoPlay thumbnail={dummyVideo.thumbnail} />
                </div>

                {/* 정보 */}
                <div class="play-infobox mt20">
                    <div class="flex align-center space-between">
                        <div>캐논 변주곡</div>
                        <div>#기타</div>
                    </div>
                    <div className="flex align-center space-between mt10">
                        <div className="flex align-center">
                            <img src={grade} className="mr10" />김융
                        </div>
                        <div className="flex align-center">
                            <img src={heart} className="mr10" />2574
                        </div>
                    </div>
                </div>

                {/* 설명 */}
                {/* 추후에 mt40으로 변경 */}
                <div class="video-info mt40">
                    <div class="video-info-title">
                        <div>조회수 7500회</div>
                        <div>24.05.26 17:14</div>
                    </div>
                    <div class="video-info-content">기타로 연주한 캐논 변주곡입니다 부족한 실력이지만 열심히 했습니다.</div>
                </div>

                {/* 악보 */}
                <div>
                    <img src={SheetMusic} alt="SheetMusic" className="mt40" />
                </div>

                {/* 버튼 */}
                <div className="flex-end mt40 button-container">
                    <Button>수정</Button>
                    <Button>삭제</Button>
                </div>

                {/* 댓글등록 */}
                <div className="comment mt90">
                    <div>댓글 254개</div>
                    <input type="text" className="input-text" placeholder="댓글을 입력하세요." />
                </div>
                <div className="flex-end mt10 button-container">
                    <Button>등록</Button>
                </div>

                {/* 댓글리스트 */}
                <div className="flex align-center space-between mt40">
                    <div className="flex align-center">
                        <img src={grade} className="mr10" />김융
                    </div>
                    <div className="flex align-center">
                        24.06.01 17:01
                    </div>
                </div>
                <div className="comment-content mt10">
                    오 그래도 잘하시는데요?
                    <div className="line"></div>
                </div>

                <div className="flex align-center space-between mt40">
                    <div className="flex align-center">
                        <img src={grade} className="mr10" />김융
                    </div>
                    <div className="flex align-center">
                        24.06.01 17:01
                    </div>
                </div>
                <div className="comment-content mt10">
                    오 그래도 잘하시는데요?
                    <div className="line"></div>
                </div>



            </div>
        </Layout>
    )

}

export default PlayVideo;