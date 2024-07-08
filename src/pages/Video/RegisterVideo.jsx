import React, { useState, useRef } from 'react';
import Layout from '../../components/Layout';
import VideoPlay from '../../components/VideoPlay';
import '../../assets/css/jun.css';
import Button from '../../components/Button';
import RegTag from '../../components/RegTag';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
const videoUploadUrl = `${API_URL}/api/video/post/auth`;

const token = localStorage.getItem('accessToken');
const accesstoken = `Bearer ${token}`;

const RegisterVideo = () => {
    const dummyVideo = {
        id: 1,
        thumbnail: 'https://via.placeholder.com/810x455.6?text=Thumbnail+1',
    };

    const [video, setVideo] = useState(null);
    const [thumbnail, setThumbnail] = useState(null);
    const [sheetMusicFiles, setSheetMusicFiles] = useState([]); // State for sheet music files

    const [progress, setProgress] = useState(0);

    const [videoUploaded, setVideoUploaded] = useState(false);
    const [selectedTag, setSelectedTag] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const videoPlayer = useRef(null);
    const fileInputRef = useRef();
    const sheetMusicInputRef = useRef();
    const thumbnailInputRef = useRef();

    const getVideo = (e) => {
        if (e.target.files.length === 0) {
            setVideo(null);
            setVideoUploaded(false);
            return;
        }

        const selectedVideo = e.target.files[0];
        setVideo(selectedVideo);
        setVideoUploaded(true);

        if (videoPlayer.current) {
            videoPlayer.current.src = URL.createObjectURL(selectedVideo);
        }
    };

    const getImages = (e) => {
        if (e.target.files.length === 0) return;

        const files = Array.from(e.target.files);
        setSheetMusicFiles([...sheetMusicFiles, ...files]);
    };

    const getThumbnail = (e) => {
        if (e.target.files.length === 0) {
            setThumbnail(null);
            return;
        }

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
            category: selectedTag ? selectedTag.value.toLowerCase() : 'null',
            title: title,
            description: description,
        };

        console.log(json);

        try {
            const url = await axios.post(videoUploadUrl, json, config).then((res) => res.data);

            const videoPresignedUrl = url['videoPresignedUrl'];
            const thumbnailPresignedUrl = url['thumbnailPresignedUrl'];
            const sheetMusicPresignedUrls = url['sheetMusicPresignedUrl'];

            console.log('파일 전송 시작');

            axios.put(videoPresignedUrl, video, {
                onUploadProgress: (progressEvent) => {
                    // 진행 상황 퍼센트 확인
                    let percentage = (progressEvent.loaded * 100) / progressEvent.total;
                    let percentComplete = Math.round(percentage);

                    setProgress(percentComplete);
                },
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            axios.put(thumbnailPresignedUrl, thumbnail);

            sheetMusicPresignedUrls.forEach((presignedUrl, index) => {
                axios.put(presignedUrl, sheetMusicFiles[index]);
            });

            alert('파일 전송 완료');
        } catch (error) {
            console.error('Error uploading:', error);
        }
    };

    return (
        <Layout>
            <div className="main-container-810">
                <div className="mr10 ml10">
                    <div className="videos-flex mt90">
                        <div className="title">l 동영상 첨부하기</div>
                        {video && (
                            <video ref={videoPlayer} controls className="video-player">
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
                <div className="flex align-center justify-center thumbnail-upload mt20">
                    {thumbnail ? (
                        <img
                            src={URL.createObjectURL(thumbnail)}
                            alt="thumbnail-preview"
                        />
                    ) : (
                        <div className="thumbnail-placeholder"></div>
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
                <div className="flex align-center justify-center sheetmusic-upload mt20">
                    {sheetMusicFiles.length === 0 ? (
                        <div className="sheetmusic"></div>
                    ) : (
                        sheetMusicFiles.map((file, index) => (
                            <div key={index} className="sheetmusic">
                                <img
                                    src={URL.createObjectURL(file)}
                                    alt={`sheet-music-${index}`}
                                    style={{ maxWidth: '100%', maxHeight: '100%' }}
                                />
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
                <div style={{ width: '50%', margin: 'auto', textAlign: 'center' }}>
                    <progress value={progress} max={100}></progress>
                    <div style={{ marginBottom: '10px' }}>업로드:{progress}%</div>
                </div>
                <div className="justify-center mt40">
                    <Button size="large" onClick={upload}>
                        등록하기
                    </Button>
                </div>
            </div>
        </Layout>
    );
};

export default RegisterVideo;
