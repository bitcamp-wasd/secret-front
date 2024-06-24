import React, { useState } from "react";
import "../../assets/css/style.css";
import "../../components/Layout";
import Layout from "../../components/Layout_banner_my";
import Button from "../../components/Button";
import UserIcon from "../../assets/images/user_icon.svg";

const MyInfoEdit = () => {
  const [nickname, setNickname] = useState("기존 닉네임");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const email = "user@example.com"; // 이메일은 고정된 값

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;

    // 닉네임 중복 체크 (홍길동)
    if (nickname === "홍길동") {
      setNicknameError("*다른 닉네임을 사용해주세요");
      valid = false;
    } else {
      setNicknameError("");
    }

    // 비밀번호 일치 체크
    if (password !== confirmPassword) {
      setPasswordError("*비밀번호가 일치하지 않습니다");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (valid) {
      // 폼 제출 후 처리할 내용을 추가가능
    }
  };

  

  return (
    <Layout showFooter={false}>
      <div className="main-box-810 mt120">
        <div className="myinfo-box">
          <div className="myinfo-headline">
            <div class="flex align-center">
              <img src={UserIcon} alt="usericon" className="usericon" />
              <h2 class="ml8">내 정보</h2>
            </div>
          </div>

          <div className="info-box">
            <div className="info-item">
              <label>닉네임</label>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                required
              />
              {nicknameError && (
                <span className="error-message">{nicknameError}</span>
              )}
            </div>
            <div className="info-item">
              <label>이메일</label>
              <div className="info-content">
                <span>noton0@naver.com</span>
              </div>
            </div>
            <div className="info-item">
              <label>비밀번호</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="info-item">
              <label>비밀번호 확인</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {passwordError && (
                <span className="error-message">{passwordError}</span>
              )}
            </div>
            <div className="info-item justify-center mt20">
            <Button size="large" onClick={handleSubmit}>
              수정 완료
            </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MyInfoEdit;
