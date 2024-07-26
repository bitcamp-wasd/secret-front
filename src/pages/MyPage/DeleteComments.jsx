import React, { useState, useEffect } from "react";
import "../../assets/css/style.css";
import Layout from "../../components/Layout";
import Button from "../../components/Button";
import axiosInstance from "../../utils/axiosInstance";

const DeleteComments = () => {
  const [comments, setComments] = useState([]);
  const [selectedComments, setSelectedComments] = useState([]);
  const [selectedTag, setSelectedTag] = useState('video');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageRange, setPageRange] = useState([1, 5]);
  const [totalPages, setTotalPages] = useState(0);


  useEffect(() => {
    fetchComments();
    setSelectedComments([]); // 페이지나 카테고리가 변경될 때마다 초기화
  }, [selectedTag, currentPage]);

  const fetchComments = async () => {
    try {
      const response = await axiosInstance.get(`/api/${selectedTag}/auth/myComments`, {
        params: { page: currentPage - 1 },
      });
      const { content, totalPages } = response.data;
      setComments(content);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedComments(comments.map((comment) => comment.battleCommentId));
    } else {
      setSelectedComments([]);
    }
  };

  const handleSelectComment = (id) => {
    if (selectedComments.includes(id)) {
      setSelectedComments(
        selectedComments.filter((commentId) => commentId !== id)
      );
    } else {
      setSelectedComments([...selectedComments, id]);
    }
  };

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/api/${selectedTag}/auth/myComments`, {
        data: { battleCommentId: selectedComments },
        headers: {
          "Content-Type": "application/json",
        },
      });
      fetchComments(); // 댓글 삭제 후 새로고침
      setSelectedComments([]);
    } catch (error) {
      console.error("Error deleting comments:", error);
    }
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setSelectedComments([]); // 페이지 변경 시 선택 초기화
  };

  const handlePreviousPageRange = () => {
    if (pageRange[0] > 1) {
      setPageRange([pageRange[0] - 5, pageRange[1] - 5]);
      setSelectedComments([]);
    }
  };

  const handleNextPageRange = () => {
    if (pageRange[1] < totalPages) {
      setPageRange([pageRange[0] + 5, pageRange[1] + 5]);
      setSelectedComments([]);
    }
  };

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
    setCurrentPage(1);
    setPageRange([1, 5]);
    setSelectedComments([]);
  };

  const CommentsTags = [
    { id: 'video', name: "동영상" },
    { id: 'challenge', name: "챌린지" },
    { id: 'battle', name: "배틀" }
  ];

  return (
    <Layout bannerType="my">
      <div className="main-container-810 mt40">
        <div className="flex comments-tag align-center pdx15">
          {CommentsTags.map(tag => (
            <Button
              key={tag.id}
              size="tag"
              onClick={() => handleTagClick(tag.id)}
              className={selectedTag === tag.id ? 'selected' : ''}
            >
              {tag.name}
            </Button>
          ))}
        </div>
        <div className="comments-grid mt20">
          <div className="comments-header">
            <input
              type="checkbox"
              onChange={handleSelectAll}
              checked={
                selectedComments.length === comments.length &&
                selectedComments.length !== 0
              }
            />
            <span>동영상 제목</span>
            <span>댓글 내용</span>
            <span>작성일</span>
          </div>
          {comments.map((comment) => (
            <div key={comment.battleCommentId} className="comment-row">
              <input
                type="checkbox"
                checked={selectedComments.includes(comment.battleCommentId)}
                onChange={() => handleSelectComment(comment.battleCommentId)}
              />
              <span>{comment.title}</span>
              <span>{comment.comment}</span>
              <span>{new Date(comment.createDate).toLocaleDateString()}</span>
            </div>
          ))}
          <div className="flex flex-end mt20" style={{ gap: "24px" }}>
          <Button size="confirm" to="/mypage/mycomments">
            취소
          </Button>
          <Button size="confirm" onClick={handleDelete}>
            삭제 완료
          </Button>
        </div>
        <div className="mycomments-pagination justify-center mt10">
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

export default DeleteComments;
