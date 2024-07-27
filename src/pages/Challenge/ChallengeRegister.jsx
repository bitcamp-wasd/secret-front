import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../assets/css/jun.css';
import Layout from '../../components/Layout';
import Button from '../../components/Button';
import RegTag from '../../components/RegTag';

const API_URL = process.env.REACT_APP_API_URL;
const challengeUploadUrl = `${API_URL}/api/challenge/auth/upload`;
const bannerUrl = `${API_URL}/api/challenge/banner`;

// 헬퍼 함수: 액세스 토큰을 가져옵니다.
const getAccessToken = () => sessionStorage.getItem('accessToken');

// 헬퍼 함수: 리프레시 토큰을 가져옵니다.
const getRefreshToken = () => sessionStorage.getItem('refreshToken');

const ChallengeRegister = () => {
    const [video, setVideo] = useState(null);
    const [thumbnail, setThumbnail] = useState(null);
    const [progress, setProgress] = useState(0);
    const [videoUploaded, setVideoUploaded] = useState(false);
    const [selectedTag, setSelectedTag] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [challengeId, setChallengeId] = useState(null);

    const videoPlayer = useRef(null);
    const fileInputRef = useRef();
    const thumbnailInputRef = useRef();

    const navigate = useNavigate();

    useEffect(() => {
        // challengeId를 가져오는 API 호출
        const fetchChallengeId = async () => {
            try {
                const response = await axios.get(bannerUrl, {
                    headers: {
                        Authorization: `Bearer ${getAccessToken()}`,
                    },
                });
                console.log('API Response:', response.data); // 전체 응답 데이터 출력
                const id = response.data.challengeId; // 응답 구조에 맞게 challengeId 추출
                console.log('Fetched challengeId:', id); // challengeId 출력
                setChallengeId(id);
            } catch (error) {
                console.error('Error fetching challengeId:', error);
            }
        };

        fetchChallengeId();
    }, []);

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

    const getThumbnail = (e) => {
        if (e.target.files.length === 0) {
            setThumbnail(null);
            return;
        }

        setThumbnail(e.target.files[0]);
    };

    const handleUploadConfirmation = () => {
        if (!video) {
            alert('동영상을 첨부해주세요.');
            return;
        }
        if (!thumbnail) {
            alert('썸네일을 첨부해주세요.');
            return;
        }
        if (!title.trim()) {
            alert('제목을 입력해주세요.');
            return;
        }
        if (!description.trim()) {
            alert('내용을 입력해주세요.');
            return;
        }

        upload();
    };

    const refreshAccessToken = async () => {
        try {
            const response = await axios.post(`${API_URL}/api/token/refresh`, {
                refreshToken: getRefreshToken(),
            });
            const newAccessToken = response.data.accessToken;
            sessionStorage.setItem('accessToken', newAccessToken);
            return newAccessToken;
        } catch (error) {
            console.error('Error refreshing access token:', error);
            throw error;
        }
    };

    const upload = async (config = null) => {
        let token = getAccessToken();
        if (!token) {
            alert('로그인 세션이 만료되었습니다. 다시 로그인 해주세요.');
            navigate('/login');
            return;
        }

        if (!config) {
            config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
        }

        const json = {
            video: video.name,
            thumbnail: thumbnail.name,
            length: parseInt(videoPlayer.current.duration),
            category: selectedTag ? selectedTag.value.toLowerCase() : 'null',
            title: title,
            description: description,
            challengeId: challengeId, // challengeId 추가
        };

        console.log(json);

        try {
            const url = await axios.post(challengeUploadUrl, json, config).then((res) => res.data);

            const videoPresignedUrl = url['videoPresignedUrl'];
            const thumbnailPresignedUrl = url['thumbnailPresignedUrl'];

            await axios.put(thumbnailPresignedUrl, thumbnail);

            await axios.put(videoPresignedUrl, video, {
                onUploadProgress: (progressEvent) => {
                    let percentage = (progressEvent.loaded * 100) / progressEvent.total;
                    let percentComplete = Math.round(percentage);

                    setProgress(percentComplete);
                },
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });



            alert('동영상 업로드를 시작합니다.');

        } catch (error) {
            if (error.response && error.response.status === 401) {  // Unauthorized error
                try {
                    const newAccessToken = await refreshAccessToken();
                    token = newAccessToken;
                    const configWithNewToken = {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    };
                    await upload(configWithNewToken);
                } catch (refreshError) {
                    console.error('Error uploading after token refresh:', refreshError);
                    alert('동영상 업로드 중 오류가 발생했습니다. 다시 시도해주세요.');
                }
            } else {
                console.error('Error uploading:', error);
                alert('동영상 업로드 중 오류가 발생했습니다. 다시 시도해주세요.');
            }
        }
    };

    useEffect(() => {
        if (progress === 100) {
            setTimeout(() => {
                navigate('/');
            }, 5000); // 5초 후 페이지 이동
        }
    }, [progress, navigate]);

    return (
        <Layout>
            <div className="main-container-810">
                <div className="videos-flex mt90">
                    <div className="title">l 동영상 첨부하기</div>
                    {video ? (
                        <video ref={videoPlayer} controls className="video-player">
                            <source src={URL.createObjectURL(video)} type="video/mp4" />
                        </video>
                    ) : (
                        <div className="video-placeholder"></div>
                    )}
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

                <div className="title mt40">l 썸네일 첨부하기</div>
                <div className="flex align-center justify-center thumbnail-upload mt20">
                    {thumbnail ? (
                        <img src={URL.createObjectURL(thumbnail)} alt="thumbnail-preview" style={{ maxWidth: '100%', maxHeight: '100%' }} />
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

                <div style={{ width: '50%', margin: 'auto', textAlign: 'center' }}>
                    <progress value={progress} max={100}></progress>
                    <div style={{ marginBottom: '10px', color: 'gray' }}>업로드: {progress}%</div>
                    {progress === 100 && <div style={{ color: 'green' }}>전송 완료! 5초 후 메인페이지로 이동합니다.</div>}
                </div>

                <div className="justify-center mt40">
                    <Button size="large" onClick={handleUploadConfirmation}>
                        등록하기
                    </Button>
                </div>
            </div>
        </Layout>
    );
};

export default ChallengeRegister;
