import React from "react";
import "../assets/css/style.css";
import defaultThumbnail from "../assets/images/defaultThumbnail.jpg";

const cloudImageUrl = process.env.REACT_APP_CLOUD_IMAGE_URL;

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

  const thumbnailUrl = thumbnail ? `${cloudImageUrl}${thumbnail}` : defaultThumbnail;
  
  return (
    <div className="video-box mt20">
      <div className="thumbnail-container">
        <img className="video-box-thumbnail" src={thumbnailUrl} alt="썸네일" />
        <div className="video-length">{formatLength(length)}</div>
      </div>
      <div className="row-direction space-between pdx30">
        <div className="movie-small">
          <span className="video-title mt10" >{title}</span>
          <ul className="movie-small-list">
            <li>
              <span>조회수 {views}</span>
            </li>
            <li>
              <span> {uploadDate ? formatDate(uploadDate) : "날짜 없음"}</span>
            </li>
            <li>
              <span className="nickname">{nickname.length > 3 ? `${nickname.slice(0, 3)}...` : nickname}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VideoBox;
