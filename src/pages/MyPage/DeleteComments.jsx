import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/css/style.css";
import Layout from "../../components/Layout";
import Button from "../../components/Button";

const MyComments = () => {
  // 더미 데이터 생성
  const dummyComments = Array.from({ length: 110 }, (_, index) => ({
    id: index + 1,
    videoTitle: `비디오 ${index + 1}번째`,
    comment: `내용 ${index + 1}번째`,
    date: `2023-06-1${index % 10}`,
  }));

  const [selectedComments, setSelectedComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageRange, setPageRange] = useState([1, 5]);
  const commentsPerPage = 10;

  // 전체 선택 혹은 해제
  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedComments(displayedComments.map((comment) => comment.id));
    } else {
      setSelectedComments([]);
    }
  };

  // 개별 선택 혹은 해제
  const handleSelectComment = (id) => {
    if (selectedComments.includes(id)) {
      setSelectedComments(
        selectedComments.filter((commentId) => commentId !== id)
      );
    } else {
      setSelectedComments([...selectedComments, id]);
    }
  };

  const handleDelete = () => {
    console.log("Deleting selected comments:", selectedComments);
    // 삭제기능 구현
  };

  // 페이지네이션
  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const displayedComments = dummyComments.slice(
    indexOfFirstComment,
    indexOfLastComment
  );
  const totalPages = Math.ceil(dummyComments.length / commentsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handlePreviousPageRange = () => {
    if (pageRange[0] > 1) {
      setPageRange([pageRange[0] - 5, pageRange[1] - 5]);
    }
  };

  const handleNextPageRange = () => {
    if (pageRange[1] < totalPages) {
      setPageRange([pageRange[0] + 5, pageRange[1] + 5]);
    }
  };

  return (
    <Layout bannerType="my">
      <div class="main-container-810 mt80">
        <div className="comments-grid">
          <div className="comments-header">
            <input
              type="checkbox"
              onChange={handleSelectAll}
              checked={
                selectedComments.length === displayedComments.length &&
                selectedComments.length !== 0
              }
            />

            <span>동영상 제목</span>
            <span>댓글 내용</span>
            <span>작성일</span>
          </div>
          {displayedComments.map((comment) => (
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
        <div className="flex flex-end mt10" style={{ gap: "24px" }}>
          <Button size="confirm" to="/mypage/mycomments">
            취소
          </Button>
          <Button size="confirm" to="/mypage/mycomments">
            삭제 완료
          </Button>
        </div>
        <div className="mycomments-pagenation">
          <button
            onClick={handlePreviousPageRange}
            disabled={pageRange[0] === 1}
          >
            {"<"}
          </button>
          {Array.from({ length: totalPages }, (_, index) => index + 1)
            .slice(pageRange[0] - 1, pageRange[1])
            .map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => paginate(pageNumber)}
                className={currentPage === pageNumber ? "active" : ""}
              >
                {pageNumber}
              </button>
            ))}
          <button
            onClick={handleNextPageRange}
            disabled={pageRange[1] >= totalPages}
          >
            {">"}
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default MyComments;
