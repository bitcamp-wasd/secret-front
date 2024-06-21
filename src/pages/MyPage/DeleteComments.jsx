import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../../assets/css/style.css";
import Layout from '../../components/Layout';
import Banner from '../../components/Banner';
import Button from "../../components/Button";

const MyComments = () => {
  // 더미 데이터 생성
  const dummyComments = Array.from({ length: 15 }, (_, index) => ({
    id: index + 1,
    videoTitle: `Video Title ${index + 1}`,
    comment: `This is comment number ${index + 1}`,
    date: `2023-06-1${index % 10}`,
  }));

  const [selectedComments, setSelectedComments] = useState([]);

  // 전체 선택 혹은 해제
  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedComments(dummyComments.map(comment => comment.id));
    } else {
      setSelectedComments([]);
    }
  };

  // 개별 선택 혹은 해제
  const handleSelectComment = (id) => {
    if (selectedComments.includes(id)) {
      setSelectedComments(selectedComments.filter(commentId => commentId !== id));
    } else {
      setSelectedComments([...selectedComments, id]);
    }
  };

  // 삭제하기 페이지로 이동
  const handleDelete = () => {
    console.log('Deleting selected comments:', selectedComments);
    // 여기서 선택된 댓글들을 삭제하기 위한 로직을 구현할 수 있습니다.
    // 예를 들어 API 호출 등의 방식으로 구현할 수 있습니다.
  };

  return (
    <Layout>
      <Banner />
    <div className="main-box-1150">
      <div className="comments-grid">
        <div className="comments-header">
        <span>선택</span>
          <span>동영상 제목</span>
          <span>댓글 내용</span>
          <span>작성일</span>
        </div>
        {dummyComments.map((comment) => (
          <div key={comment.id} className="comment-row">
            <input
              type="checkbox"
              checked={selectedComments.includes(comment.id)}
              onChange={() => handleSelectComment(comment.id)}
            />
            <span>{comment.videoTitle}</span>
            <span>{comment.comment}</span>
            <span>{comment.date}</span>
            
          </div>
        ))}
      </div>
      <div className="pagination">
        {Array.from({ length: Math.ceil(dummyComments.length / 10) }, (_, index) => (
          <button key={index + 1} onClick={() => console.log(`Go to page ${index + 1}`)}>
            {index + 1}
          </button>
        ))}
        <div className='flex flex-end' style={{ gap: '24px' }}>
          <Button size='confirm'>취소</Button>
          <Button size='confirm'>삭제 완료</Button>
        </div>
      </div>
      
    </div>
    </Layout>
  );
};

export default MyComments;
