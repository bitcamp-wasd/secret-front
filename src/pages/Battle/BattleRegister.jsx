import React, { useState } from "react";
import "../../assets/css/jun.css";
import logo from '../../assets/images/header_logo.svg';

const BattleRegister = () => {
    const [title, setTitle] = useState("");
    const [author1, setAuthor1] = useState("");
    const [author2, setAuthor2] = useState("");

    const handleSubmit = async () => {
        const apiUrl = process.env.REACT_APP_API_URL;

        const accessToken = sessionStorage.getItem('accessToken');

        if (!accessToken) {
            alert('로그인이 필요합니다.');
            return;
        }

        if (!title.trim()) {
            alert('제목과 두 개의 URL을 모두 입력해주세요.');
            return;
        }

        if (!author1.trim() || !author2.trim()) {
            alert('URL을 모두 입력해주세요.');
            return;
        }

        const data = {
            url1: author1,
            url2: author2,
            title: title
        };

        try {
            const response = await fetch(`${apiUrl}/api/battle/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('네트워크 응답이 실패했습니다.');
            }

            console.log('배틀 등록 성공!');
            window.close(); // 팝업 닫기
            alert('배틀을 개최합니다!');
        } catch (error) {
            console.error('배틀 등록 오류:', error);
            alert('배틀 등록 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className="modal-content">
            <img src={logo} alt="로고" />
            <h2>배틀을 시작합니다!</h2>
            <div className="info-item">
                <label>배틀 제목</label>
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
                <button onClick={handleSubmit}>배틀 개최!</button>
                <button onClick={() => window.close()}>취소하기</button>
            </div>
        </div>
    );
};

export default BattleRegister;
