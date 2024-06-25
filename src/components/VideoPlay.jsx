import React from 'react';
import "../assets/css/style.css";

const VideoView = ({ thumbnail, title }) => {
    return (
        <div className="video-play">
            <img src={thumbnail} alt={title} />
            <p>{title}</p>
        </div>
    );
};

export default VideoView;