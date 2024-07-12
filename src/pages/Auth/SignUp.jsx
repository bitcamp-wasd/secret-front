import React, { useState, useRef } from "react";
import axios from "axios";
import axiosInstance from "../../utils/axiosInstance"; 
import Layout from "../../components/Layout";
import Button from "../../components/Button";
import "../../assets/css/style.css";
import Logo from "../../assets/images/main_logo.svg";

const API_URL = process.env.REACT_APP_API_URL;

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [isAuthCodeVerified, setIsAuthCodeVerified] = useState(false);

  const nicknameInputRef = useRef(null);

  // 이메일 형식 검증 함수
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // 비밀번호 형식 검증 함수
  const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,13}$/;
    return passwordRegex.test(password);
  };

  // 이메일 인증 로직
  const handleEmailVerification = async () => {
    if (!isValidEmail(email)) {
      alert("이메일 형태로 입력해주세요");
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/api/user/email/certification`, { email });
      if (response.data.code === "SU") {
        alert("이메일로 인증을 보냈습니다");
        console.log("Email Verification Sent: ", response.data.message);
      }
    } catch (error) {
      if (error.response.data.code === "DE") {
        alert("이미 사용중인 이메일입니다");
        console.error("Email Verification Failed: ", error.response.data.message);
      } else {
        console.error("Email Verification Failed: ", error.message);
      }
    }
  };

  // 인증 코드 확인 로직
  const handleAuthCodeVerification = async () => {
    try {
      const response = await axios.post(`${API_URL}/api/user/check/certification`, {
        email,
        certificationNumber: authCode,
      });
      if (response.data.code === "SU") {
        alert("인증이 완료되었습니다");
        setIsAuthCodeVerified(true);
        console.log("Auth Code Verified: ", response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.data.code === "CF") {
        alert("인증번호가 일치하지 않습니다");
        console.error("Auth Code Verification Failed: ", error.response.data.message);
      } else {
        console.error("Auth Code Verification Failed: ", error.message);
      }
    }
  };

  // 닉네임 형식 검증 함수
  const isValidNickname = (nickname) => {
    const nicknameRegex = /^[가-힣a-zA-Z0-9]{2,13}$/;
    return nicknameRegex.test(nickname);
  };

  // 회원가입 폼 제출 처리
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 입력값이 비어 있는지 확인
    if (!email.trim() || !password.trim() || !authCode.trim() || !confirmPassword.trim() || !nickname.trim()) {
      alert("공백은 입력할 수 없습니다");
      return;
    }

    // 비밀번호 형식 검사
    if (!isValidPassword(password)) {
      setPasswordError("* 8~13자의 영문, 숫자를 사용해 주세요.");
    } else {
      setPasswordError("");
    }

    // 비밀번호 일치 검사
    if (password !== confirmPassword) {
      setConfirmPasswordError("* 비밀번호가 일치하지 않습니다");
    } else {
      setConfirmPasswordError("");
    }

    // 닉네임 유효성 검사
    if (!isValidNickname(nickname)) {
      setNicknameError("* 2~13자의 한글, 영문, 숫자만 가능합니다.");
      if (nicknameInputRef.current) {
        nicknameInputRef.current.focus();
      }
      return;
    } else {
      setNicknameError("");
    }

    // 어느 하나라도 오류가 있으면 함수 종료
    if (!isValidPassword(password) || password !== confirmPassword) {
      return;
    }

    // 닉네임 입력 확인
    if (nickname.trim() === "") {
      setNicknameError("* 닉네임을 입력해주세요");
      if (nicknameInputRef.current) {
        nicknameInputRef.current.focus();
      }
      return;
    } else {
      setNicknameError("");
    }

    try {
      // 서버로 회원가입 요청 보내기
      const response = await axiosInstance.post(`${API_URL}/api/user/signup`, {
        email,
        password,
        nickName: nickname,
        certificationNumber: authCode
      });

      if (response.data.code === "SU") {
        alert("가입이 완료되었습니다");
        window.location.href = "/login";
      }
    } catch (error) {
      if (error.response && error.response.data.code === "DN") {
        setNicknameError("* 닉네임 중복입니다.");
        if (nicknameInputRef.current) {
          nicknameInputRef.current.focus();
        }
      } else if (error.response && error.response.data.code === "IN") {
        setNicknameError("* 2~13자의 한글, 영문, 숫자만 가능합니다.");;
        console.error("SignUp Error: 유효한 닉네임이 아닙니다");
      } else if (error.response && error.response.data.code === "DE") {
        alert("이미 사용중인 이메일입니다");
        console.error("SignUp Error: Duplicate Email");
      } else {
        setErrorMessage("회원가입 실패. 다시 시도해주세요.");
        console.error("SignUp Error: ", error.message);
      }
    }
  };

  return (
    <Layout showHeader={false}>
      <div className="auth-container">
        {/* <div className="auth-site-logo">
          <img src={Logo} alt="logo" />
        </div>
        <div className="auth-site-name">
          <h1>말할 수 없는 비밀</h1>
        </div> */}
        <div className="auth-box">
          <div className="auth-box-info">
          <div className="justify-center mt50">
              <img src={Logo} alt="logo" />
            </div>
            
            <div className="auth-box-info-item mt80">
            {errorMessage && (
              <div className="auth-error-message">{errorMessage}</div>
            )}
              <div className="signup-button-box pdx15">
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
              <div className="signup-button-box pdx15">
                <input
                  type="text"
                  placeholder="인증번호 입력"
                  value={authCode}
                  onChange={(e) => setAuthCode(e.target.value)}
                  required
                  disabled={isAuthCodeVerified}
                />
                <Button
                  size="confirm"
                  onClick={handleAuthCodeVerification}
                  className={isAuthCodeVerified ? "button-confirmed" : ""}
                  disabled={isAuthCodeVerified}
                >
                  {isAuthCodeVerified ? "완료" : "확인"}
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
              {passwordError && (
                <span className="signup-error-message">{passwordError}</span>
              )}
            </div>
            <div className="auth-box-info-item mt30">
              <input
                type="password"
                placeholder="비밀번호 확인"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {confirmPasswordError && (
                <span className="signup-error-message">{confirmPasswordError}</span>
              )}
            </div>
            <div className="auth-box-info-item mt30">
              <input
                type="text"
                placeholder="닉네임"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                required
                ref={nicknameInputRef}
              />
              {nicknameError && (
                <span className="signup-error-message">{nicknameError}</span>
              )}
            </div>
            <div className="auth-box-info-item mt20 mb80">
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
