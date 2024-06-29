import React, { useState } from "react";
import { Link } from 'react-router-dom';
import Layout from "../../components/Layout";
import Button from "../../components/Button";
import "../../assets/css/style.css";
import Logo from "../../assets/images/auth_logo.svg";
import Naver from "../../assets/images/naver.svg";
import Kakao from "../../assets/images/kakao.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // 더미 데이터
  const dummyData = {
    email: "noton0@naver.com",
    password: "1234",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email !== dummyData.email || password !== dummyData.password) {
      setErrorMessage("* 이메일 또는 비밀번호가 일치하지 않습니다");
    } else {
      setErrorMessage("");
      console.log("Login Submitted", { email, password });
      // 로그인 성공시 로직
    }
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
              <Button size="large" to="/" onClick={handleSubmit}>
                로그인
              </Button>
            </div>
            <Link to="/signup">
            <span className="auth-box-info-signup mb-21">회원가입</span>
            </Link>  
            <span className="auth-box-info-social mb-20">
              <img src={Naver} alt="naver" />
            </span>
            <span className="auth-box-info-social mb-60">
              <img src={Kakao} alt="kakao" />
            </span>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
