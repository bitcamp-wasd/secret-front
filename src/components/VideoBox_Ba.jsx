import React from "react";
import "../assets/css/style.css";
import heart from "../assets/images/heart.svg";

const VideoBox = ({ thumbnail, title }) => {
    return (
        <div className="video-box">
            <img className="video-box-thumbnail" src={thumbnail} alt={title} />

            <div className="row-direction">
                <div className="movie-small">
                    <span className="video-title">{title}</span>
                    <span className="video-author">김융</span>
                    <ul className="movie-small-list">
                        <li>
                            <span>조회수 2536</span>
                        </li>
                        <li>
                            <span>&#8226; 2일전</span>
                        </li>
                        <li>
                            <span>&#8226; 19:36</span>
                        </li>

                    </ul>
                </div>
            </div>
        </div>
    );
};

export default VideoBox;
