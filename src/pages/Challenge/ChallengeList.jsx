import React from "react";
import Layout from "../../components/Layout";
import "../../styles/common.css";
import Banner from "../../components/Banner2";

const ChallengeList = () => {
  return (
    <Layout>
      <Banner />
      
      <div className="challenge-container">
        <div className="best-challenges">
          <h2>챌린지 BEST 3</h2>
          <p>챌린지의 최고 순위를 차지한 동영상입니다.</p>
        </div>
        <div className="sub-box-317">
          <div className="video-box">
            <img
              src="https://via.placeholder.com/276x155"
              alt="Best Challenge 1"
            />
            <p>1등 동영상</p>
          </div>
        </div>
        <div className="sub-box-317">
          <div className="video-box">
            <img
              src="https://via.placeholder.com/276x155"
              alt="Best Challenge 2"
            />
            <p>2등 동영상</p>
          </div>
        </div>
        <div className="sub-box-317">
          <div className="video-box">
            <img
              src="https://via.placeholder.com/276x155"
              alt="Best Challenge 3"
            />
            <p>3등 동영상</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChallengeList;
