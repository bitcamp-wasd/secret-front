import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/css/style.css";
import logo from "../assets/images/header_logo.svg";
import mypage from "../assets/images/header_mypage.svg";
import login from "../assets/images/header_login.svg";
import logout from "../assets/images/header_logout.svg";

const Header = () => {
  //더미데이터 초기:로그인
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const navigate = useNavigate();

  // 로그아웃 처리(추가적으로 삭제 실제 구현해야함)
  const handleLogout = () => {
    setIsLoggedIn(false);
    alert("로그아웃 되었습니다.");
    navigate('/login');
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
