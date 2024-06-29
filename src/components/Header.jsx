import React from 'react';
import { Link } from 'react-router-dom';
import "../assets/css/style.css";
import logo from '../assets/images/header_logo.svg';
import mypage from '../assets/images/header_mypage.svg';
import logout from '../assets/images/header_logout.svg';


const Header = () => {
	return (

		<header className='header'>
      <Link to='/'>
        <img src={logo} alt="Logo" className="logo" />
      </Link>
      <nav className='nav'>
        <ul className="nav-list">
          <li>
            <Link to='/'>
              <button id="movie">동영상</button>
            </Link>
          </li>
          <li>
            <Link to='/challenge/list'>
              <button id="challenge">챌린지</button>
            </Link>
          </li>
          <li>
            <Link to='/battle/list'>
              <button id="bettle">배틀</button>
            </Link>
          </li>
        </ul>
      </nav>
      <Link to="/mypage/myinfo">
        <img src={mypage} alt="mypage" className="mypage" />
      </Link>
      <Link to="/logout">
        <img src={logout} alt="Logout" className="logout" />
      </Link>
    </header>

	);
};

export default Header;
