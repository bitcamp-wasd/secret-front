import React, { useState } from "react";
import logo from '../../assets/images/header_logo.svg';
import "../../assets/css/jun.css";

const BattleRegister = () => {
    const [title, setTitle] = useState("");
    const [author1, setAuthor1] = useState("");
    const [author2, setAuthor2] = useState("");

    const handleSubmit = () => {
        // 배틀 생성 로직
        console.log("배틀 제목:", title);
        console.log("참가자 1:", author1);
        console.log("참가자 2:", author2);
        window.close(); // 팝업창 닫기
        alert("배틀을 개최합니다!");
    };

    return (
        <div className="modal-content">
            <img src={logo} />
            <h2>배틀을 시작한다!</h2>
            <div className="info-item">
                <label>배틀제목</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="info-item mt20">
                <label>URL 붙여넣기</label>
                <input
                    type="text"
                    value={author1}
                    onChange={(e) => setAuthor1(e.target.value)}
                />
            </div>
            <div className="info-item mt20">
                <label>URL 붙여넣기</label>
                <input
                    type="text"
                    value={author2}
                    onChange={(e) => setAuthor2(e.target.value)}
                />
            </div>
            <div className="modal-buttons mt20">
                <button onClick={handleSubmit}>배틀개최!</button>
                <button onClick={() => window.close()}>취소하기</button>
            </div>
        </div>
    );
};

export default BattleRegister;
