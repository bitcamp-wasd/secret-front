import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import "../../assets/css/style.css";
import Layout from "../../components/Layout";
import Button from "../../components/Button";
import Logo from "../../assets/images/main_logo.svg";
import Naver from "../../assets/images/naver.svg";
import Kakao from "../../assets/images/kakao.svg";

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
      const response = await axiosInstance.post(`${API_URL}/api/user/signin`, {
        email,
        password,
      });

      if (response.status === 200 && response.data.code === "SU") {
        // 로그인 성공
        // 토큰을 받아와서 세션스토리지에 저장
        const { accessToken, refreshToken, expirationTime } = response.data;
        sessionStorage.setItem("accessToken", accessToken);
        sessionStorage.setItem("refreshToken", refreshToken);
        sessionStorage.setItem("tokenExpiration", expirationTime);
        sessionStorage.setItem("tokenIssuedAt", new Date().getTime());

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

  const onKeyPressHandler = (e) => {
    // 엔터 키 눌러서 로그인 가능
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <Layout showHeader={false}>
      <div className="auth-container align-center">
        <div className="auth-box">
          <div className="auth-box-info">
            <div className="justify-center mt50">
              <img src={Logo} alt="logo" />
            </div>
            <div className="auth-box-info-item mt80">
              {errorMessage && (
                <div className="auth-error-message">{errorMessage}</div>
              )}
              <input
                type="text"
                placeholder="E-MAIL"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={onKeyPressHandler}
                required
              />
            </div>
            <div className="auth-box-info-item mb30">
              <input
                type="password"
                placeholder="PASSWORD"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={onKeyPressHandler}
                required
              />
            </div>
            <div className="auth-box-info-item mt20 mb10">
              <Button size="large" onClick={handleSubmit}>
                로그인
              </Button>
            </div>
            <span className="auth-box-info-signup mb21">
              <Link to="/signup">회원가입</Link>
            </span>
            <div className="auth-box-info-social2 mb60">
              <span onClick={() => onSnsSignInButtonClickHandler("naver")}>
                <img src={Naver} alt="naver" />
              </span>
              <span onClick={() => onSnsSignInButtonClickHandler("kakao")}>
                <img src={Kakao} alt="kakao" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
