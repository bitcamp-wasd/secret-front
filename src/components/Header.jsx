import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import "../assets/css/style.css";
import logo from "../assets/images/main_logo.svg";
import mypage from "../assets/images/header_mypage.svg";
import login from "../assets/images/header_login.svg";
import logout from "../assets/images/header_logout.svg";
import toggleBtn from "../assets/images/navmenu.png";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리
  const [isActive, setIsActive] = useState(false);
  const location = useLocation(); // 현재 경로 가져오기
  const headerRef = useRef(null); // 헤더 요소 ref
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    // 클릭 이벤트 핸들러 함수
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        // 클릭된 요소가 헤더 영역 외부에 있는 경우 토글 상태를 비활성화
        setIsActive(false);
      }
    };

    // 전체 문서에 클릭 이벤트 리스너 추가
    document.addEventListener("mousedown", handleClickOutside);

    // 컴포넌트가 언마운트될 때 클릭 이벤트 리스너 제거
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // 로컬 스토리지에서 토큰 유무를 확인하여 로그인 상태 설정
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // 로그아웃 처리 함수
  const handleLogout = async () => {
    // 서버로 로그아웃 요청 보내기
    try {
      const response = await axiosInstance.post("/api/user/signout");

      if (response.status === 200) {
        // 로컬 스토리지의 토큰 삭제
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("tokenExpiration");

        // 로그아웃 상태로 변경
        setIsLoggedIn(false);

        // 경고 메시지 표시
        alert("로그아웃 되었습니다.");

        // 현재 페이지 다시 불러오기
        window.location.reload();
      }
    } catch (error) {
      console.error("로그아웃 실패:", error.message);
      // 실패 시 처리 로직 추가
    }
  };

  const isCurrentPage = (path) => {
    return location.pathname.startsWith(path);
  };

  //이동할 페이지와 같은경우 리로드
  const handleLinkClick = (path, event) => {
    if (location.pathname === path) {
      event.preventDefault();
      window.location.reload();
    } else {
      navigate(path);
    }
  };

  return (
    <header ref={headerRef} className={`header ${isActive ? 'active' : ''}`}>
      <Link to="/" onClick={(e) => handleLinkClick("/", e)}>
        <img src={logo} alt="Logo" className="logo pdx15" />
      </Link>
      <ul className={`nav-list ${isActive ? 'active' : ''}`}>
        <li>
          <Link to="/"  onClick={(e) => handleLinkClick("/", e)} className={isCurrentPage("/video") || location.pathname === "/" ? "current" : ""}>
            <button id="movie">동영상</button>
          </Link>
        </li>
        <li>
          <Link to="/challenge/list" onClick={(e) => handleLinkClick("/challenge/list", e)} className={isCurrentPage("/challenge") ? "current" : ""}>
            <button id="challenge">챌린지</button>
          </Link>
        </li>
        <li>
          <Link to="/battle/list" onClick={(e) => handleLinkClick("/battle/list", e)} className={isCurrentPage("/battle") ? "current" : ""}>
            <button id="battle">배틀</button>
          </Link>
        </li>
      </ul>
      <div className={`nav-links ${isActive ? 'active' : ''}`}>
        
        {isLoggedIn ? (
          <div className="nav-icon w20">
          <Link to="/mypage/myinfo">
            <img src={mypage} alt="mypage" className="icon-image" />
          </Link>
          </div>
        ) : null}
      
      <div className="nav-icon">
        <Link to={isLoggedIn ? "#" : "/login"} onClick={isLoggedIn ? handleLogout : undefined}>
          <img src={isLoggedIn ? logout : login} alt={isLoggedIn ? "Logout" : "Login"} className="icon-image" />
        </Link>
        </div>
        
      </div>
      <img src={toggleBtn} className="toggleBtn" onClick={handleToggle} />
    </header>
  );
};

export default Header;
