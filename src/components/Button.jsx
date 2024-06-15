/*버튼 컴포넌트*/
import React from 'react';
import '../styles/components/Buttons.css';

const Button = ({ size, children, onClick }) => {
  return (
    <button className={`button ${size}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
