/*버튼 컴포넌트*/
import React from 'react';
import { Link } from 'react-router-dom';
import "../assets/css/style.css";

const Button = ({ size, children, onClick, to }) => {
  if (to) {
    return (
      <Link to={to} className={`button ${size}`}>
        {children}
      </Link>
    );
  }

  return (
    <button className={`button ${size}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;

