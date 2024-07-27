import React, { useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const UseTokenRefresh = () => {
    useEffect(() => {
        const refreshToken = async () => {
            try {
                const expirationTime = parseInt(sessionStorage.getItem("tokenExpiration"), 10);
                const tokenIssuedAt = parseInt(sessionStorage.getItem("tokenIssuedAt"), 10);
                const now = new Date().getTime();
                const tokenExpiryTime = tokenIssuedAt + expirationTime;

                // 토큰 남은 유효 기간 내여야 실행
                if (tokenExpiryTime - now <= expirationTime) {            
                    const refreshToken = sessionStorage.getItem('refreshToken');
    
                    if (refreshToken) {
                        const config = {
                            headers: {
                                Authorization: `Bearer ${refreshToken}`,
                                'Content-Type': 'application/json'
                            }
                        };

                        // 빈 객체를 두 번째 인수로 전달 (요청 본문 없음)
                        const response = await axios.post(
                            `${API_URL}/api/user/auth/refreshtoken`,
                            {}, // 데이터 없음
                            config // 헤더를 포함한 config 객체
                        );

                        if (response.status === 200) {
                            const {accessToken,expirationTime} = response.data;
                            
                            sessionStorage.setItem("accessToken", accessToken);
                            sessionStorage.setItem("tokenIssuedAt", new Date().getTime());
                            sessionStorage.setItem("tokenExpiration", expirationTime);
                        }
                        else {
                            console.error("Failed to refresh token, status: ", response.status);
                        }
                    } else {
                        console.error("Refresh token is missing.");
                    }
                }
            } catch (error) {
                console.error('Token refresh failed:', error);
                
            }
        };

        
        const interval = setInterval(refreshToken, 30000);

        return () => clearInterval(interval);
    }, []);

    return null; 
};

export default UseTokenRefresh;
