import React from "react";
import "../../assets/css/style.css";
import "../../components/Layout";
import Button from "../../components/Button";
import Layout from "../../components/Layout_banner_my";


const MyInfo = () => {

    
  return (
    <Layout showFooter={false}>
      
      <div className="main-box-810">
        <div className="flex space-between align-center">
          <h2>내 정보</h2>
          <Button size='confirm'>수정하기</Button>
        </div>
        
        <div className="info-box">
          <div className="info-item">
            <label>닉네임:</label>
            <div className="info-content">
              <span>사용자 닉네임</span>
              
            </div>
          </div>
          <div className="info-item">
            <label>이메일:</label>
            <span>user@example.com</span>
          </div>
          <div className="info-item">
            <label>포인트:</label>
            <span>12345</span>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MyInfo;
