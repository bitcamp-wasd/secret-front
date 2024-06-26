import React from 'react';
import "../assets/css/style.css";
import logo from '../assets/images/header_logo.svg';
import mypage from '../assets/images/header_mypage.svg';
import logout from '../assets/images/header_logout.svg';


const Header = () => {
	return (

		<header className='header'>
			<a href='/'>
				<img src={logo} alt="Logo" className="logo" />
			</a>
			<nav className='nav'>
				<ul className="nav-list">
					<li>

						<a href='/'>
							<button id="movie">동영상</button>
						</a>
					</li>
					<li>
						<a href='/challenge/list'>
							<button id="challenge">챌린지</button>
						</a>
					</li>
					<li>
						<a href='/battle/list'>
							<button id="bettle">배틀</button>
						</a>
					</li>
				</ul>
			</nav>
			<a href="/mypage/myinfo">
				<img src={mypage} alt="mypage" className="mypage" />
			</a>
			<a href="/logout">
				<img src={logout} alt="Logout" className="logout" />
			</a>
		</header>

	);
};

export default Header;
