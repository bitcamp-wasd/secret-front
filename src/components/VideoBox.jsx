import React from "react";
import "../assets/css/style.css";

const VideoBox = ({ thumbnail, title }) => {
  return (
    <div className="video-box">
      <img src={thumbnail} alt={title} />
      
      <div class="row-direction space-between pdx30">
        <div class="movie-small">
        <span>{title}</span>
          <ul class="movie-small-list">
            <li>
              <span>조회수 2536</span>
            </li>
            <li>
              <span>&#8226; 2일전</span>
            </li>
            <li>
              <span>&#8226; 19:36</span>
            </li>
            <li>
              <span>김융</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VideoBox;
