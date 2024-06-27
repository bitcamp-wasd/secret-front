import React from "react";
import Layout from "../../components/Layout";
import VideoPlay from '../../components/VideoPlay';
import '../../assets/css/jun.css';
import Button from "../../components/Button";
import RegTag from '../../components/RegTag';

const ChallengeModify = () => {
    const dummyVideo = {
        id: 1,
        thumbnail: 'https://via.placeholder.com/810x455.6?text=Thumbnail+1',
    }

    return (
        <Layout>
            <div className='main-container-810'>
                <div className='videos-grid mt90'>
                    <div className="title">l 동영상 첨부하기</div>
                    <VideoPlay thumbnail={dummyVideo.thumbnail} />
                </div>

                <div className="flex-end mt20 button-container">
                    <Button>첨부하기</Button>
                </div>
            </div>


            <div className='regtitle main-container-810 mt60'>
                <div className="title">l 게시글 입력하기</div>
                <RegTag />
                <input type="text" className="regtitle-text" placeholder="제목을 입력해주세요." />
                <textarea
                    className="regcontent-text"
                    placeholder="내용을 입력해주세요."
                />
            </div>

            <div className="flex justify-center mt80">
                <Button size="large">등록하기</Button>
            </div>





        </Layout>
    )
}

export default ChallengeModify;