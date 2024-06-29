import React from "react";
import "../../assets/css/style.css";
import Button from "../../components/Button";
import Layout from "../../components/Layout";

const Administer = () => {
    return (
      <Layout showFooter={true} bannerType="admin">
        <div className="main-box-810 mt123">
        <div className="myinfo-box">
          <div className="myinfo-headline">
            <div class="flex align-center">
              
              <h2 class="ml8">챌린지 업데이트</h2>
            </div>
          </div>

          <div className="info-box">
            <div className="info-item">
              <label>이번주곡</label>
              <input
                type="text"
                
              />
              
            </div>
            
            <div className="info-item">
              <label>인원수</label>
              <input
                type="number"
                
              />
            </div>
            <div className="info-item">
              <label>날짜</label>
              <input
                type="date"
                
              />
              
            </div>
            <div className="info-item justify-center mt60">
            <Button size="large" >
              완료
            </Button>
            </div>
          </div>
        </div>
      </div>
      </Layout>
    );
  };
  
  export default Administer;