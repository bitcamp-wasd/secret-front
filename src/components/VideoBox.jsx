import React from "react";
import "../assets/css/style.css";


const defaultThumbnail = "https://via.placeholder.com/276x155.25?text=Thumbnail";

const VideoBox = ({ thumbnail, title, views, uploadDate, length, nickname }) => {
  // 동영상 길이를 "MM:SS" 형식으로 변환
  const formatLength = (length) => {
    const minutes = Math.floor(length / 60);
    const seconds = length % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="video-box">
      {/* 아직 이미지 불러오기 구현안돼서 디폴트 썸네일 사용 */}
      <img className="video-box-thumbnail" src={defaultThumbnail ||thumbnail } alt="임시" />
      <div className="row-direction space-between pdx30">
        <div className="movie-small">
          <span>{title}</span>
          <ul className="movie-small-list">
            <li>
              <span>조회수 {views}</span>
            </li>
            <li>
              <span>&#8226; {uploadDate}</span>
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
