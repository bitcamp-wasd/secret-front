import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/style.css";
import Layout from "../../components/Layout";
import Button from "../../components/Button";
import UserIcon from "../../assets/images/user_icon.svg";
import axiosInstance from "../../utils/axiosInstance";

const MyInfoEdit = () => {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get("/api/user/auth/myinfo");
        const userData = response.data;
        setEmail(userData.email);
        setNickname(userData.nickName);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;

    // 모든 필드가 채워졌는지 확인
    if (!nickname || !password || !confirmPassword) {
      alert("빈 칸이 있으면 안됩니다.");
      valid = false;
    }

    // 비밀번호 일치 체크
    if (password !== confirmPassword) {
      setPasswordError("*비밀번호가 일치하지 않습니다");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (valid) {
      try {
        // 서버에 수정된 정보를 put으로 전송
        const response = await axiosInstance.put("/api/user/auth/editinfo", {
          nickName: nickname,
          password: password,
        });
        console.log("Edit info successful:", response.data);
        navigate("/mypage/myinfo"); // 수정 완료 후 마이페이지로 이동
      } catch (error) {
        if (error.response && error.response.data.code === "DN") {
          setNicknameError("* 다른 닉네임을 입력해주세요");
        } else {
          console.error("Failed to edit user info:", error);
          // 실패 시 처리
        }
      }
    }
  };

  return (
    <Layout showFooter={true} bannerType="my">
      <div className="main-box-810 mt123">
        <div className="myinfo-box">
          <div className="myinfo-headline">
            <div className="flex align-center">
              <img src={UserIcon} alt="usericon" className="usericon" />
              <h2 className="ml8">내 정보</h2>
            </div>
          </div>

          <div className="info-box">
            <div className="info-item">
              <label>닉네임</label>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                required
              />
              {nicknameError && (
                <span className="error-message">{nicknameError}</span>
              )}
            </div>
            <div className="info-item">
              <label>이메일</label>
              <div className="info-content">
                <span>{email}</span>
              </div>
            </div>
            <div className="info-item">
              <label>비밀번호</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="info-item">
              <label>비밀번호 확인</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {passwordError && (
                <span className="error-message">{passwordError}</span>
              )}
            </div>
            <div className="info-item justify-center mt20">
              <Button size="large" onClick={handleSubmit}>
                수정 완료
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MyInfoEdit;
