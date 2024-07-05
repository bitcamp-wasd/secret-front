import React from 'react';
import Layout from '../../components/Layout';
import VideoPlay from '../../components/VideoPlay';
import '../../assets/css/jun.css';
import Button from '../../components/Button';
import RegTag from '../../components/RegTag'

const ModifyVideo = () => {
    const dummyVideo = {
        id: 1,
        thumbnail: 'https://via.placeholder.com/810x455.6?text=Thumbnail+1',
    }

    return (
        <Layout>
            <div className='main-container-810'>
                <div className="mr10 ml10">
                    <div className='videos-flex mt90'>
                        <div className="title">l 동영상 첨부하기</div>
                        <VideoPlay thumbnail={dummyVideo.thumbnail} />
                    </div>

                    <div className="flex-end mt20 button-container">
                        <Button>첨부하기</Button>
                    </div>
                </div>


                <div className="title mt60">l 게시글 입력하기</div>
                <RegTag />
                <input type="text" className="regtitle-text" placeholder="제목을 입력해주세요." />
                <textarea
                    className="regcontent-text"
                    placeholder="내용을 입력해주세요."
                />

                <div className="title">l 악보 업로드</div>
                <div className='flex align-center justify-center sheetmusic-upload mt20'>
                    <div className='sheetmusic'></div>
                    <div className='sheetmusic'></div>
                    <div className='sheetmusic'></div>
                </div>
                <div className="flex-end mt20 button-container">
                    <Button>첨부하기</Button>
                </div>

                <div className="justify-center mt80">
                    <Button size="large">등록하기</Button>
                </div>
            </div>
        </Layout>
    )
}

export default ModifyVideo;