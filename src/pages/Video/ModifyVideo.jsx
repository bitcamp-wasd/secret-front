import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../../assets/css/jun.css';
import Layout from '../../components/Layout';
import Button from '../../components/Button';
import RegTag from '../../components/RegTag';

const API_URL = process.env.REACT_APP_API_URL;
const CLOUD_IMAGE_URL = process.env.REACT_APP_CLOUD_IMAGE_URL;
const videoDetailUrl = `${API_URL}/api/video/watch`;
const videoUpdateUrl = `${API_URL}/api/video/auth/update`;

// 헬퍼 함수: 액세스 토큰을 가져옵니다.
const getAccessToken = () => sessionStorage.getItem('accessToken');

// 헬퍼 함수: 리프레시 토큰을 가져옵니다.
const getRefreshToken = () => sessionStorage.getItem('refreshToken');

// 헬퍼 함수: FormData의 내용을 로그로 출력합니다.
const logFormData = (formData) => {
    const object = {};
    formData.forEach((value, key) => {
        object[key] = value;
    });
    console.log('FormData contents:', object);
};

const ModifyVideo = () => {
    const [thumbnail, setThumbnail] = useState(null);
    const [sheetMusicFiles, setSheetMusicFiles] = useState([]);
    const [existingThumbnail, setExistingThumbnail] = useState(null);
    const [selectedTag, setSelectedTag] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const sheetMusicInputRef = useRef();
    const thumbnailInputRef = useRef();

    const navigate = useNavigate();
    const { videoId } = useParams();

    useEffect(() => {
        const fetchVideoDetails = async () => {
            try {
                const response = await axios.get(`${videoDetailUrl}?id=${videoId}`);
                const data = response.data;

                setTitle(data.title);
                setDescription(data.description);
                setSelectedTag({ value: data.category });
                setExistingThumbnail(data.thumbnail);
            } catch (error) {
                console.error('Error fetching video details:', error);
                alert('동영상 정보를 불러오는 중 오류가 발생했습니다.');
            }
        };

        fetchVideoDetails();
    }, [videoId]);

    const getThumbnail = (e) => {
        if (e.target.files.length === 0) {
            setThumbnail(null);
            return;
        }

        setThumbnail(e.target.files[0]);
    };

    const getSheetMusic = (e) => {
        if (e.target.files.length === 0) return;

        const files = Array.from(e.target.files);
        setSheetMusicFiles(files);
    };

    const handleUpdateConfirmation = () => {
        if (!title.trim()) {
            alert('제목을 입력해주세요.');
            return;
        }
        if (!description.trim()) {
            alert('내용을 입력해주세요.');
            return;
        }

        updateVideo();
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

    const updateVideo = async () => {
        let token = getAccessToken();
        if (!token) {
            alert('로그인 세션이 만료되었습니다. 다시 로그인 해주세요.');
            navigate('/login');
            return;
        }

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const json = {
            title,
            description,
            category: selectedTag ? selectedTag.value.toLowerCase() : 'null',
            thumbnail: thumbnail ? thumbnail.name : null,
            sheetMusic: sheetMusicFiles.map(file => file.name),  // 수정된 부분
        };

        console.log("Request JSON:", json);

        try {
            const url = await axios.patch(`${videoUpdateUrl}?videoId=${videoId}`, json, config).then((res) => res.data);

            const thumbnailPresignedUrl = url['thumbnailPresignedUrl'];
            const sheetMusicPresignedUrl = url['sheetMusicPresignedUrl'];

            console.log("Received presigned URLs: ", { thumbnailPresignedUrl, sheetMusicPresignedUrl });

            // 썸네일 파일을 presigned URL을 통해 업로드합니다.
            if (thumbnail && thumbnailPresignedUrl) {
                console.log("Uploading thumbnail to: ", thumbnailPresignedUrl);
                await axios.put(thumbnailPresignedUrl, thumbnail, {
                    headers: {
                        'Content-Type': thumbnail.type, // 실제 파일의 MIME 타입
                    },
                }).then((res) => console.log("Thumbnail upload response: ", res))
                    .catch((err) => console.error("Thumbnail upload error: ", err));
            }

            // 악보 파일을 presigned URL을 통해 업로드합니다.
            if (sheetMusicFiles.length > 0 && sheetMusicPresignedUrl) {
                await Promise.all(sheetMusicFiles.map((file, index) => {
                    console.log(`Uploading sheet music ${index + 1} to: `, sheetMusicPresignedUrl[index]);
                    return axios.put(sheetMusicPresignedUrl[index], file, {
                        headers: {
                            'Content-Type': file.type, // 실제 파일의 MIME 타입
                        },
                    }).then((res) => console.log(`Sheet music ${index + 1} upload response: `, res))
                        .catch((err) => console.error(`Sheet music ${index + 1} upload error: `, err));
                }));
            }

            alert('동영상 정보가 수정되었습니다.');
            navigate('/');
        } catch (error) {
            if (error.response && error.response.status === 401) {  // Unauthorized error
                try {
                    const newAccessToken = await refreshAccessToken();
                    token = newAccessToken;
                    config.headers.Authorization = `Bearer ${token}`;
                    // 재시도
                    await updateVideo();
                } catch (refreshError) {
                    console.error('Error updating after token refresh:', refreshError);
                    alert('동영상 수정 중 오류가 발생했습니다. 다시 시도해주세요.');
                }
            } else {
                console.error('Error updating:', error);
                alert('동영상 수정 중 오류가 발생했습니다. 다시 시도해주세요.');
            }
        }
    };

    return (
        <Layout>
            <div className="main-container-810">
                <div className="title mt60">l 썸네일 수정하기</div>
                <div className="flex align-center justify-center thumbnail-upload mt20">
                    {thumbnail ? (
                        <img src={URL.createObjectURL(thumbnail)} alt="thumbnail-preview" />
                    ) : existingThumbnail ? (
                        <img src={`${CLOUD_IMAGE_URL}${existingThumbnail}`} alt="existing-thumbnail" />
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
                <RegTag onTagSelect={setSelectedTag} selectedTag={selectedTag} />
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

                <div className="title mt40">l 악보 수정하기</div>
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
                        onChange={getSheetMusic}
                        accept="image/png, image/jpeg, image.jpg"
                        multiple
                        style={{ display: 'none' }}
                    />
                </div>

                <div className="justify-center mt40">
                    <Button size="large" onClick={handleUpdateConfirmation}>
                        수정하기
                    </Button>
                </div>
            </div>
        </Layout>
    );
};

export default ModifyVideo;
