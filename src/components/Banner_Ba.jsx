/*챌린지,배틀에서 사용할 배너*/
import React from "react";
import Button from "./Button";
import "../assets/css/style.css";


const Banner = () => {
    return (
        <div className="banner">
            <div className="main-container-1150">
                <div className="ch-banner align-center space-between">
                    <h1>배틀리스트</h1>
                    <Button>배틀 개최하기!</Button>
                </div>
            </div>
        </div>
    );
};

export default Banner;
