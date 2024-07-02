import React from "react";
import Layout from "../../components/Layout";
import "../../assets/css/style.css";
import chbest from "../../assets/images/chbest.svg"
import Tag from "../../components/Tag";
import VideoBox from "../../components/VideoBox";
import one from "../../assets/images/1.svg";
import two from "../../assets/images/2.svg";
import three from "../../assets/images/3.svg";
import VideoBox_hart from "../../components/VideoBox_hart";

const ChallengeList = () => {
  // 더미 데이터 생성
  const dummyVideos = Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    title: `Video ${index + 1
      } 이렇게 제목이 길면 너가 뭘 할 수 있는지 궁금한데`,
    thumbnail: `https://via.placeholder.com/276x155.25?text=Thumbnail+${index + 1
      }`,
    author: "홍길동",
  }));

  const dummyVideo = {
    id: 1,
    title: `Video 1 이렇게 제목이 길면 너가 뭘 할 수 있는지 궁금한데`,
    thumbnail: `https://via.placeholder.com/276x155.25?text=Thumbnail+1`,
    author: "홍길동",
  };

  return (
    <Layout showFooter={false} bannerType="challenge">

      <div className="challenge-container mt80">

        <div className="best-challenge">
          <img src={chbest} />
          <div className="text-overlay">캐논변주곡 <br />챌린지 BEST3</div>
        </div>
        <div className="sub-box-317">
          <div className="video-box" style={{ position: "relative" }}>
            <VideoBox_hart
              key={dummyVideo.id}
              thumbnail={dummyVideo.thumbnail}
              title={dummyVideo.title}
              author={dummyVideo.author}
            />
            <img className="video-overlay" src={one} alt="One 이미지" />
          </div>
        </div>
        <div className="sub-box-317">
          <div className="video-box" style={{ position: "relative" }}>
            <VideoBox_hart
              key={dummyVideo.id}
              thumbnail={dummyVideo.thumbnail}
              title={dummyVideo.title}
              author={dummyVideo.author}
            />
            <img className="video-overlay" src={two} />
          </div>
        </div>


        <div className="sub-box-317">
          <div className="video-box" style={{ position: "relative" }}>
            <VideoBox_hart
              key={dummyVideo.id}
              thumbnail={dummyVideo.thumbnail}
              title={dummyVideo.title}
              author={dummyVideo.author}
            />

            <img className="video-overlay" src={three} />
          </div>
        </div>
      </div>

      <div className="main-container-1150 mt80">
        <div class="row-direction space-between mb50">

          <Tag />

        </div>
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

export default ChallengeList;
