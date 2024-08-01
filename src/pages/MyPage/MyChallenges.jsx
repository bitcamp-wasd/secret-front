import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from 'react-router-dom';
import "../../assets/css/style.css";
import Layout from '../../components/Layout';
import VideoBox_ch from '../../components/VideoBox_ch';

const MyChallenges = () => {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/challenge/post/auth/myposts`);
        setVideos(response.data); 
      } catch (error) {
        console.error("Error fetching challenge videos:", error);
      }
    };

    fetchVideos();
  }, []);

  const handleVideoClick = (_id) => {
    navigate(`/challenge/detail/${_id}`); 
  };

  return (
    <Layout showFooter={false} bannerType="my">
      <div className="main-container-1150 mt40">
        <div className="row-direction space-between mb50">
        </div>
        <div className="videos-grid">
          {videos.map((video) => (
            <div key={video.videoId} onClick={() => handleVideoClick(video._id)} style={{ cursor: 'pointer' }}>
            <VideoBox_ch
            thumbnail={`${video.thumbnailPath}`}
            title={video.title}
            nickname={video.nickname}
            cnt={video.cnt}
            />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};
export default MyChallenges;
