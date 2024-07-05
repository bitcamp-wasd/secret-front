import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const OAuthCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const accessToken = urlParams.get("accessToken");
    const refreshToken = urlParams.get("refreshToken");

    // 토큰을 로컬 스토리지에 저장
    if (accessToken && refreshToken) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      // 토큰 만료 시간 등 추가 정보 저장
      localStorage.setItem("tokenExpiration", Date.now() + 3600 * 1000); // 예: 1시간 후 만료

      // 로그인 후 메인 페이지로 이동
      navigate("/");
    } else {
      console.error("Invalid OAuth callback response: Missing tokens or expiration time.");
      navigate("/login");
    }
  }, [location, navigate]);

  return <div>로그인 중...</div>;
};

export default OAuthCallback;
