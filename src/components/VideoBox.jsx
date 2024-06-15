import React from 'react';
import '../styles/common.css';

const VideoBox = ({ thumbnail, title }) => {
  return (
    <div className="video-box">
      <img src={thumbnail} alt={title} />
      <p>{title}</p>
    </div>
  );
};

export default VideoBox;