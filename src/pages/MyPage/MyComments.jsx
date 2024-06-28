import React from "react";
import { Link } from "react-router-dom";
import "../../assets/css/style.css";
import Layout from "../../components/Layout_banner_my";
import Button from "../../components/Button";

const MyComments = () => {
  // 더미 데이터 생성
  const dummyComments = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    videoTitle: `Video Title ${index + 1}`,
    comment: `This is comment number ${index + 1}`,
    date: `2023-06-1${index % 10}`,
  }));

  return (
    <Layout>
      <div class="main-container-810 mt80">
        <div className="comments-grid">
          <div className="comments-header">
            <span></span>
            <span>동영상 제목</span>
            <span>댓글 내용</span>
            <span>작성일</span>
          </div>
          {dummyComments.map((comment) => (
            <div key={comment.id} className="comment-row">
              <span></span>
              <span>{comment.videoTitle}</span>
              <span>{comment.comment}</span>
              <span>{comment.date}</span>
            </div>
          ))}
          <div className="flex flex-end mt10">
          
            <Button size="confirm" to="/mypage/deletecomments">삭제하기</Button>
            
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MyComments;
