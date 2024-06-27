import React from 'react';
import "../../assets/css/style.css";
import VideoBox from '../../components/VideoBox';
import Layout from '../../components/Layout_banner_my';


const MyVideos = () => {
  // 더미 데이터 생성
  const dummyVideos = Array.from({ length: 12 }, (_, index) => ({
    id: index + 1,
    title: `Video ${
      index + 1
    } 내동영상페이지에요`,
    thumbnail: `https://via.placeholder.com/276x155.25?text=Thumbnail+${
      index + 1
    }`,
    author: "홍길동",
  }));

  return (
    <Layout showFooter={false}>
      
      <div className="main-container-1150 mt65">
        <div className="videos-grid">
          {dummyVideos.map((video) => (
            <VideoBox
              key={video.id}
              thumbnail={video.thumbnail}
              title={video.title}
              author={video.author}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};
export default MyVideos;
