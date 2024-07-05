import React, { useState, useRef } from 'react';
import Layout from '../../components/Layout';
import VideoPlay from '../../components/VideoPlay';
import '../../assets/css/jun.css';
import Button from '../../components/Button';
import RegTag from '../../components/RegTag';
import axios from 'axios';

const videoUploadUrl = 'http://localhost:8080/api/video/post/auth';
const token = 'your_token_here';
const accesstoken = `Bearer ${token}`;

const RegisterVideo = () => {
    const dummyVideo = {
        id: 1,
        thumbnail: 'https://via.placeholder.com/810x455.6?text=Thumbnail+1',
    };

    const [video, setVideo] = useState(null);
    const [progress, setProgress] = useState(0);
    const [images, setImages] = useState([]);
    const [thumbnail, setThumbnail] = useState(null);
    const [videoUploaded, setVideoUploaded] = useState(false);
    const [selectedTag, setSelectedTag] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [sheetMusicFiles, setSheetMusicFiles] = useState([]); // State for sheet music files

    const videoPlayer = useRef(null);
    const fileInputRef = useRef();
    const sheetMusicInputRef = useRef();
    const thumbnailInputRef = useRef();

    function updateProgress(value) {
        setProgress(value);
    }

    const getVideo = (e) => {
        const selectedVideo = e.target.files[0];
        setVideo(selectedVideo);
        setVideoUploaded(true);

        if (videoPlayer.current) {
            videoPlayer.current.src = URL.createObjectURL(selectedVideo);
        }
    };

    const getImages = (e) => {
        const files = Array.from(e.target.files);
        // Append new sheet music files to existing array
        setSheetMusicFiles([...sheetMusicFiles, ...files]);
    };

    const getThumbnail = (e) => {
        setThumbnail(e.target.files[0]);
    };

    const upload = async () => {
        const config = {
            headers: {
                Authorization: accesstoken,
            },
        };

        const json = {
            videoName: video.name,
            sheetMusicName: sheetMusicFiles.map((file) => file.name),
            thumbnailName: thumbnail ? thumbnail.name : null,
            length: parseInt(videoPlayer.current.duration),
            category: selectedTag ? selectedTag.name.toLowerCase() : 'null',
            title: title,
            description: description,
        };

        console.log(json);

        // Implement upload logic here using axios

        try {
            // Upload logic using axios
        } catch (error) {
            console.error('Error uploading:', error);
        }
    };

    return (
        <Layout>
            <div className='main-container-810'>
                <div className="mr10 ml10">
                    <div className='videos-flex mt90'>
                        <div className="title">l 동영상 첨부하기</div>
                        {video && (
                            <video ref={videoPlayer} controls style={{ width: '1000em' }}>
                                <source src={URL.createObjectURL(video)} type="video/mp4" />
                            </video>
                        )}
                        {!videoUploaded && <VideoPlay thumbnail={dummyVideo.thumbnail} />}
                    </div>

                    <div className="flex-end mt20 button-container">
                        <Button onClick={() => fileInputRef.current.click()}>첨부하기</Button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={getVideo}
                            accept="video/mp4"
                            style={{ display: 'none' }}
                        />
                    </div>
                </div>

                <div className="title mt60">l 게시글 입력하기</div>
                <RegTag onTagSelect={setSelectedTag} />
                <input
                    type="text"
                    className="regtitle-text"
                    placeholder="제목을 입력해주세요."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    className="regcontent-text"
                    placeholder="내용을 입력해주세요."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <div className="title">l 썸네일 첨부하기</div>
                <div className='flex align-center justify-center thumbnail-upload mt20'>
                    {thumbnail ? (
                        <img src={URL.createObjectURL(thumbnail)} alt="thumbnail-preview" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                    ) : (
                        <div className='thumbnail-placeholder'>
                        </div>
                    )}
                </div>
                <div className="flex-end mt20 button-container">
                    <Button onClick={() => thumbnailInputRef.current.click()}>첨부하기</Button>
                    <input
                        type="file"
                        ref={thumbnailInputRef}
                        onChange={getThumbnail}
                        accept="image/png, image/jpeg, image.jpg"
                        style={{ display: 'none' }}
                    />
                </div>

                <div className="title">l 악보 업로드</div>
                <div className='flex align-center justify-center sheetmusic-upload mt20'>
                    {sheetMusicFiles.length === 0 ? (
                        <div className='sheetmusic'>
                        </div>
                    ) : (
                        sheetMusicFiles.map((file, index) => (
                            <div key={index} className='sheetmusic'>
                                <img src={URL.createObjectURL(file)} alt={`sheet-music-${index}`} style={{ maxWidth: '100px', maxHeight: '100px' }} />
                            </div>
                        ))
                    )}
                </div>
                <div className="flex-end mt20 button-container">
                    <Button onClick={() => sheetMusicInputRef.current.click()}>첨부하기</Button>
                    <input
                        type="file"
                        ref={sheetMusicInputRef}
                        onChange={getImages}
                        accept="image/png, image/jpeg, image.jpg"
                        multiple
                        style={{ display: 'none' }}
                    />
                </div>

                <div className="justify-center mt80">
                    <Button size="large" onClick={upload}>등록하기</Button>
                </div>
            </div>
        </Layout>
    );
}

export default RegisterVideo;
