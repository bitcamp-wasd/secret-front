/*챌린지,배틀에서 사용할 배너*/
import React from "react";
import Button from "./Button";
import "../assets/css/style.css";


const Banner = () => {
  return (
    <div className="banner">
      <div className="flex space-between w100p">
        <h1>챌린지리스트</h1>
        <div>
          <Button size="banner">챌린지 업로드</Button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
