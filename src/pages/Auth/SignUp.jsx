import React, { useState } from "react";
import Layout from "../../components/Layout";
import Button from "../../components/Button";
import "../../assets/css/style.css";
import Logo from "../../assets/images/auth_logo.svg";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  /*더미데이터 */
  const existingNicknames = ["user1", "user2", "홍길동"];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordError("* 비밀번호가 일치하지 않습니다");
    } else {
      setPasswordError("");
    }

    if (existingNicknames.includes(nickname)) {
      setNicknameError("* 다른 닉네임을 입력해주세요");
    } else {
      setNicknameError("");
    }

    // 추가적인 검증 로직
    console.log("SignUp Submitted", { email, authCode, password, nickname });
  };

  const handleEmailVerification = () => {
    // 이메일 인증 로직.
    console.log("Email Verification Sent");
  };

  const handleAuthCodeVerification = () => {
    // 인증 코드 확인 로직
    console.log("Auth Code Verified");
  };

  return (
    <Layout showHeader={false}>
      <div className="auth-container">
        <div className="auth-site-logo">
          <img src={Logo} alt="logo" />
        </div>
        <div className="auth-site-name">
          <h1>말할 수 없는 비밀</h1>
        </div>
        <div className="auth-box">
          <div className="auth-box-info">
            {errorMessage && (
              <div className="auth-error-message">{errorMessage}</div>
            )}
            <div className="auth-box-info-item mt80">
            <div className="signup-button-box pdx20">
              <input
                type="text"
                placeholder="E-MAIL"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button size="confirm" onClick={handleEmailVerification}>
                인증
              </Button>
              </div>
            </div>
            <div className="auth-box-info-item mt23">
              <div className="signup-button-box pdx20">
              <input
                type="text"
                placeholder="인증번호 입력"
                value={authCode}
                onChange={(e) => setAuthCode(e.target.value)}
                required
              />
              <Button size="confirm" onClick={handleAuthCodeVerification}>
                확인
              </Button>
              </div>
            </div>
            <div className="auth-box-info-item mt30">
              <input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="auth-box-info-item mt30">
              <input
                type="password"
                placeholder="비밀번호 확인"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {passwordError && (
                <span className="signup-error-message">{passwordError}</span>
              )}
            </div>
            <div className="auth-box-info-item mt30">
              <input
                type="text"
                placeholder="닉네임"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                required
              />
              {nicknameError && (
                <span className="signup-error-message">{nicknameError}</span>
              )}
            </div>
            <div className="auth-box-info-item mt70 mb80">
              <Button size="large" onClick={handleSubmit}>
                가입 완료
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SignUp;
