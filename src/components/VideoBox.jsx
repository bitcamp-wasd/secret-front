import React from "react";
import "../assets/css/style.css";
import defaultThumbnail from "../assets/images/defaultThumbnail.jpg";


const thumbnailStyle = {
  width: "276px",
  height: "155.25px",
};

const VideoBox = ({ thumbnail, title, views, uploadDate, length, nickname }) => {
  // 동영상 길이를 "MM:SS" 형식으로 변환
  const formatLength = (length) => {
    const minutes = Math.floor(length / 60);
    const seconds = length % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

 // 날짜 형식을 "YY.MM.DD" 형식으로 변환
 const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = String(date.getFullYear()).slice(-2);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
};

  return (
    <div className="video-box">
      {/* 아직 이미지 불러오기 구현안돼서 디폴트 썸네일 사용 */}
      <img className="video-box-thumbnail" src={defaultThumbnail ||thumbnail } alt="임시" style={thumbnailStyle}/>
      <div className="row-direction space-between pdx30">
        <div className="movie-small">
          <span>{title}</span>
          <ul className="movie-small-list">
            <li>
              <span>조회수 {views}</span>
            </li>
            <li>
              <span>&#8226; {uploadDate ? formatDate(uploadDate) : "날짜 없음"}</span>
            </li>
            <li>
              <span>&#8226; {formatLength(length)}</span>
            </li>
            <li>
              <span>{nickname}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VideoBox;
