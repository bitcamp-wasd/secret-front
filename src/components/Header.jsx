import React from 'react';
import "../assets/css/style.css";
import logo from '../assets/images/header_logo.svg';
import mypage from '../assets/images/header_mypage.svg';
import logout from '../assets/images/header_logout.svg';


const Header = () => {
  return (
    
	<header className='header'>
		<a href='/mypage/myinfo'>
	<img src={logo} alt="Logo" className="logo"/>
	</a>
	<nav className='nav'>
	  <ul className="nav-list">
		<li>
		  <button id="movie">동영상</button>
		</li>
		<li>
			<a href='/challenge/list'>
		  <button id="challenge">챌린지</button>
		  </a>
		</li>
		<li>
		  <button id="bettle">배틀</button>
		</li>
	  </ul>
	</nav>
	<a href="/mypage/myinfo">
	<img src={mypage} alt="mypage" className="mypage"/>
	</a>
	<a href="/logout">
	<img src={logout} alt="Logout" className="logout"/>
	</a>
  </header>
   
  );
};

export default Header;
