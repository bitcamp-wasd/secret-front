import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/css/style.css";
import logo from "../assets/images/header_logo.svg";
import mypage from "../assets/images/header_mypage.svg";
import login from "../assets/images/header_login.svg";
import logout from "../assets/images/header_logout.svg";
import toggleBtn from "../assets/images/navmenu.png";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    alert("로그아웃 되었습니다.");
    navigate('/login');
  };

  return (
    <header className={`header ${isActive ? 'active' : ''}`}>
      <Link to="/">
        <img src={logo} alt="Logo" className="logo" />
      </Link>
      <ul className={`nav-list ${isActive ? 'active' : ''}`}>
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
      <div className={`nav-links ${isActive ? 'active' : ''}`}>
        {isLoggedIn ? (
          <Link to="/mypage/myinfo">
            <img src={mypage} alt="mypage" className="mypage" />
          </Link>
        ) : null}
        <Link to={isLoggedIn ? "#" : "/login"} onClick={isLoggedIn ? handleLogout : undefined}>
          <img src={isLoggedIn ? logout : login} alt={isLoggedIn ? "Logout" : "Login"} className="logout" />
        </Link>
      </div>
      <img src={toggleBtn} className="toggleBtn" onClick={handleToggle} />
    </header>
  );
};

export default Header;
