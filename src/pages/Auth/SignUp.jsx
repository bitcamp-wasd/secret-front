import React, { useState, useRef } from "react";
import axios from "axios";
import Layout from "../../components/Layout";
import Button from "../../components/Button";
import "../../assets/css/style.css";
import Logo from "../../assets/images/auth_logo.svg";

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
  const [isAuthCodeVerified, setIsAuthCodeVerified] = useState(false);

  const nicknameInputRef = useRef(null);

  // /*더미데이터 */
  // const existingNicknames = ["user1", "user2", "홍길동"];
  // const dummyEmail = "noton0@naver.com";
  // const dummyAuthCode = "1234";

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (password !== confirmPassword) {
  //     setPasswordError("* 비밀번호가 일치하지 않습니다");
  //   } else {
  //     setPasswordError("");
  //   }

  //   if (existingNicknames.includes(nickname)) {
  //     setNicknameError("* 다른 닉네임을 입력해주세요");
  //     if (nicknameInputRef.current) {
  //       nicknameInputRef.current.focus();
  //     }
  //   } else {
  //     setNicknameError("");
  //   }

  //   if (
  //     email.trim() === "" ||
  //     authCode.trim() === "" ||
  //     password.trim() === "" ||
  //     confirmPassword.trim() === "" ||
  //     nickname.trim() === ""
  //   ) {
  //     alert("공백이 있으면 안됩니다");
  //     return;
  //   }

  //   if (!passwordError && !nicknameError) {
  //     alert("가입이 완료되었습니다");
  //     console.log("SignUp Submitted", { email, authCode, password, nickname });
  //     // 추가 로직
  //   }
  // };

   // 이메일 인증 로직
   const handleEmailVerification = async () => {
    try {
      const response = await axios.post(`${API_URL}/api/user/email-certification`, { email });
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
      const response = await axios.post(`${API_URL}/api/user/check-certification`, {
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
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordError("* 비밀번호가 일치하지 않습니다");
      return;
    } else {
      setPasswordError("");
    }

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
      const response = await axios.post(`${API_URL}/api/user/signup`, {
        email,
        password,
        nickname
      });

      if (response.data.code === "SU") {
        alert("가입이 완료되었습니다");
        window.location.href = "/login";
      }
    } catch (error) {
      if (error.response && error.response.data.code === "DN") {
        setNicknameError("* 다른 닉네임을 입력해주세요");
        if (nicknameInputRef.current) {
          nicknameInputRef.current.focus();
        }
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
