import React, { useState } from 'react';
import Layout from '../../components/Layout';
import Button from '../../components/Button';
import "../../assets/css/style.css";

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [authNum,setAuthNum] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickName,setNickName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    console.log('Sign Up Submitted', { email, password });
  };

  return (
    <Layout>
      <div className="auth-container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>E-MAIL</label>
            <input 
              type="이메일" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label>인증번호 입력</label>
            <input 
              type="number" 
              value={authNum} 
              onChange={(e) => setAuthNum(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label>비밀번호 입력:</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label>비밀번호 확인:</label>
            <input 
              type="password" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label>닉네임:</label>
            <input 
              type="string" 
              value={nickName} 
              onChange={(e) => setNickName(e.target.value)} 
              required 
            />
          </div>

          <div className='flex justify-center'>
          <Button size="large">가입 완료</Button>
          </div>

        </form>
      </div>
    </Layout>
  );
};

export default SignUp;
