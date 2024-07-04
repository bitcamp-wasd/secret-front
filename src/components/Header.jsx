import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../assets/css/style.css";
import logo from "../assets/images/header_logo.svg";
import mypage from "../assets/images/header_mypage.svg";
import login from "../assets/images/header_login.svg";
import logout from "../assets/images/header_logout.svg";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // 로그인 상태 관리
 

  // 로그아웃 처리 함수
  const handleLogout = () => {
    // 로그아웃 상태로 변경
    setIsLoggedIn(false);

    // 로컬 스토리지의 토큰 삭제
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("tokenExpiration");

    // 경고 메시지 표시
    alert("로그아웃 되었습니다.");

    // 현재 페이지 다시 불러오기
    window.location.reload();
  };
  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="Logo" className="logo" />
      </Link>
      <nav className="nav">
        <ul className="nav-list">
          <li>
            <Link to="/">
              <button id="movie">동영상</button>
            </Link>
          </li>
          <li>
            <Link to="/challenge/list">
              <button id="challenge">챌린지</button>
            </Link>
          </li>
          <li>
            <Link to="/battle/list">
              <button id="bettle">배틀</button>
            </Link>
          </li>
        </ul>
      </nav>
      {isLoggedIn ? (
        <Link to="/mypage/myinfo">
          <img src={mypage} alt="mypage" className="mypage" />
        </Link>
      ) : null}
      <Link to={isLoggedIn ? "#" : "/login"} onClick={isLoggedIn ? handleLogout : undefined}>
        <img src={isLoggedIn ? logout : login} alt={isLoggedIn ? "Logout" : "Login"} className="logout" />
      </Link>
    </header>
  );
};

export default Header;
