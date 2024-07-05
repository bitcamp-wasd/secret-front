import React from "react";
import Button from "../../components/Button";
import rank_first from "../../assets/images/rank1.svg";
import rank_second from "../../assets/images/rank2.svg";
import rank_third from "../../assets/images/rank3.svg";
import rank_fourth from "../../assets/images/rank4.svg";
import rank_fifth from "../../assets/images/rank5.svg";

const Rank = () => {
  return (
    <div className="rank-container">
      <div className="rank-content-box">
        <div className="rank-content-box-headline">
          <span className="rank-content-box-headline-title">등급 안내</span>
          <span className="rank-content-box-headline-detail">
            * 포인트는 동영상 업로드, 챌린지 수상시, 배틀 승리시에 적립됩니다.
          </span>
        </div>
        <div className="rank-content-box-grid-box">
          <div className="rank-content-box-grid">
            <span></span>
            <span><img src={rank_first} alt="1등" /></span>
            <span>높은음자리표</span>
            <span>8000p 이상</span>
          </div>
          <div className="rank-content-box-grid">
            <span></span>
            <span><img src={rank_second} alt="2등" /></span>
            <span>2분음표</span>
            <span>6000p 이상</span>
          </div>
          <div className="rank-content-box-grid">
            <span></span>
            <span><img src={rank_third} alt="3등" /></span>
            <span>4분음표</span>
            <span>4000p 이상</span>
          </div>
          <div className="rank-content-box-grid">
            <span></span>
            <span><img src={rank_fourth} alt="4등" /></span>
            <span>8분음표</span>
            <span>2000p 이상</span>
          </div>
          <div className="rank-content-box-grid">
            <span></span>
            <span><img src={rank_fifth} alt="5등" /></span>
            <span>16분표</span>
            <span>0p 이상</span>
          </div>
        </div>
        <div className="flex-end mt40 mb20">
            <Button size="tag" onClick={() => window.close()}>
                확인
            </Button>
        </div>
      </div>
    </div>
  );
};

export default Rank;
