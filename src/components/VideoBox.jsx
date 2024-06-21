import React from 'react';
import "../assets/css/style.css";

const VideoBox = ({ thumbnail, title }) => {
  return (
    <div className="video-box">
      <img src={thumbnail} alt={title} />
      <p>{title}</p>
    </div>
  );
};

export default VideoBox;