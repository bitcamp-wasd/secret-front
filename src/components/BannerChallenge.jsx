/*챌린지,배틀에서 사용할 배너*/
import React from "react";
import Button from "./Button";
import "../assets/css/style.css";
import ch from "../assets/images/ch.svg"


const BannerChallenge = () => {
  return (
    <div className="banner">
      <div className="main-container-1150">
        <img src={ch} />
        <div className="ch-banner align-center space-between">
          <h1>캐논변주곡</h1>
          <Button to="/challenge/register">챌린지 업로드</Button>
        </div>
        <div className="ch-day">2024-06-25까지</div>
      </div>
    </div>
  );
};

export default BannerChallenge;
