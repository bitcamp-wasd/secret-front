import React, { useState } from "react";
import Layout from "../../components/Layout";
import Button from "../../components/Button";
import "../../styles/pages/Auth.css";
import "../../styles/common.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Submitted", { email, password });
  };

  return (
    <Layout showHeader={false}>
      <div className="auth-container">
        <h2 className="font-medium">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="font-light">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="font-light">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-center">
            <Button size="large">로그인</Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
