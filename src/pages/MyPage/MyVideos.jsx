import React from 'react';
import VideoBox from '../../components/VideoBox';
import Layout from '../../components/Layout';
import Banner from '../../components/Banner';

const MyVideos = () => {
  // 더미 데이터 생성
  const dummyVideos = Array.from({ length: 12 }, (_, index) => ({
    id: index + 1,
    title: `Video ${index + 1}`,
    thumbnail: `https://via.placeholder.com/276x155.25?text=Thumbnail+${index + 1}`,
  }));

  return (
    <Layout>
      <Banner />
    <div className="main-box-1150">
      <div className="videos-grid">
        {dummyVideos.map((video) => (
          <VideoBox key={video.id} thumbnail={video.thumbnail} title={video.title} />
        ))}
      </div>
    </div>
    </Layout>
  );
};

export default MyVideos;
