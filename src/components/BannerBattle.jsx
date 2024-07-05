import React from "react";
import Button from "./Button";
import "../assets/css/jun.css";

const BannerBattle = () => {
    // 팝업창 열기
    const openPopup = () => {
        alert("배틀을 시작합니다.\n\n동영상 두 개의 URL을 복사한 후 배틀 개최!를 눌러주세요.");
        window.open(
            "/battle/register",
            "BattleRegisterPopup",
            "width=600,height=450"
        );
    };

    return (
        <div className="banner">
            <div className="main-container-1150">
                <div className="ch-banner align-center space-between">
                    <h1>배틀리스트</h1>
                    <Button className="ba-button" onClick={openPopup}>배틀 개최하기!</Button>
                </div>
            </div>
        </div>
    );
};

export default BannerBattle;
