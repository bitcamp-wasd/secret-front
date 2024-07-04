import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import Layout from "../../components/Layout";
import Button from "../../components/Button";
import "../../assets/css/style.css";
import Logo from "../../assets/images/auth_logo.svg";
import Naver from "../../assets/images/naver.svg";
import Kakao from "../../assets/images/kakao.png";

const API_URL = process.env.REACT_APP_API_URL;
export const SNS_SIGN_IN_URL = (type) => `${API_URL}/api/user/login/${type}`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 입력값이 비어 있는지 확인
    if (!email.trim() || !password.trim()) {
      alert("공백은 입력할 수 없습니다");
      return;
    }

    try {
      const response = await axiosInstance.post(`${API_URL}/api/user/sign-in`, {
        email,
        password,
      });

      if (response.status === 200 && response.data.code === "SU") {
        // 로그인 성공
        console.log("Login successful");

        // 토큰을 받아와서 로컬스토리지에 저장
        const { accessToken, refreshToken, expirationTime } = response.data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem(
          "tokenExpiration",
          Date.now() + expirationTime * 1000
        );

        // 메인 페이지로 이동
        navigate("/");
      } else {
        setErrorMessage("* 로그인에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage("* 이메일 혹은 비밀번호가 일치하지 않습니다");
      } else {
        setErrorMessage("* 로그인에 실패했습니다. 다시 시도해주세요.");
      }
      console.error("Login failed: ", error.message);
    }
  };

  const onSnsSignInButtonClickHandler = (type) => {
    window.location.href = SNS_SIGN_IN_URL(type);
  };

  return (
    <Layout showHeader={false}>
      <div class="auth-container">
        <div className="auth-site-logo">
          <img src={Logo} alt="logo" />
        </div>
        <div className="auth-site-name">
          <h1>말할 수 없는 비밀</h1>
        </div>
        <div className="auth-box">
          <div className="auth-box-info">
            <div className="auth-box-info-item mt60">
              {errorMessage && (
                <div className="auth-error-message">{errorMessage}</div>
              )}
              <input
                type="text"
                placeholder="E-MAIL"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="auth-box-info-item mb-30">
              <input
                type="password"
                placeholder="PASSWORD"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="auth-box-info-item mb-6">
              <Button size="large" onClick={handleSubmit}>
                로그인
              </Button>
            </div>
            <Link to="/signup">
              <span className="auth-box-info-signup mb-21">회원가입</span>
            </Link>
            <span
              className="auth-box-info-social mb-20"
              onClick={() => onSnsSignInButtonClickHandler("naver")}
            >
              <img src={Naver} alt="naver" />
            </span>
            <span
              className="auth-box-info-social mb-60"
              onClick={() => onSnsSignInButtonClickHandler("kakao")}
            >
              <img src={Kakao} alt="kakao" />
            </span>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
