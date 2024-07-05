import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../assets/css/style.css";
import Layout from "../../components/Layout";
import Button from "../../components/Button";

const MyComments = () => {
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageRange, setPageRange] = useState([1, 5]);
  const commentsPerPage = 10;

  useEffect(() => {
    // 더미 데이터 생성
    const dummyComments = Array.from({ length: 20 }, (_, index) => ({
      id: index + 1,
      videoTitle: `비디오 Title ${index + 1}`,
      comment: `This is comment number ${index + 1}`,
      date: `2023-06-1${index % 10}`,
    }));

    // API 호출
    // axios
    //   .get("/api/user/auth/comments")
    //   .then((response) => {
    //     setComments(response.data);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching data:", error);
    //   });

    setComments(dummyComments);
  }, []);

  // 페이지네이션
  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const displayedComments = comments.slice(
    indexOfFirstComment,
    indexOfLastComment
  );
  const totalPages = Math.ceil(comments.length / commentsPerPage);

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
      <div class="my-container-810 mt80">
        <div className="comments-grid">
          <div className="comments-header">
            <span></span>
            <span>동영상 제목</span>
            <span>댓글 내용</span>
            <span>작성일</span>
          </div>
          {displayedComments.map((comment) => (
            <div key={comment.id} className="comment-row">
              <span></span>
              <span>{comment.videoTitle}</span>
              <span>{comment.comment}</span>
              <span>{comment.date}</span>
            </div>
          ))}
          <div className="flex flex-end mt10">
            <Button size="confirm" to="/mypage/deletecomments">
              삭제하기
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
      </div>
    </Layout>
  );
};

export default MyComments;
