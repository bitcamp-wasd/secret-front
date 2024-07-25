import React from 'react';
import { Link } from 'react-router-dom';
import "../assets/css/style.css";

const Button = ({ size, children, onClick, to, className = "" }) => {
  const classes = `button ${size} ${className || ""}`.trim();

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;

