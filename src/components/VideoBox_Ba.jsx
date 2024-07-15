import React from "react";
import "../assets/css/style.css";
import heart from "../assets/images/heart.svg";

// 함수를 사용하여 날짜 포맷팅
const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
};

// 함수를 사용하여 길이를 분:초 형식으로 변환
const formatLength = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${String(seconds).padStart(2, '0')}`;
};

const VideoBox = ({ thumbnail, title, author, views, uploadDate, length }) => {
    const formattedUploadDate = formatDate(uploadDate);
    const formattedLength = formatLength(length);

    return (
        <div className="video-box">
            <img className="video-box-thumbnail" src={thumbnail} alt={title} />

            <div className="row-direction">
                <div className="movie-small">
                    <span className="video-title">{title}</span>
                    <span className="video-author">{author}</span>
                    <ul className="movie-small-list">
                        <li>
                            <span>조회수 {views}</span>
                        </li>
                        <li>
                            <span>&#8226; {formattedUploadDate}</span>
                        </li>
                        <li>
                            <span>&#8226; {formattedLength}</span>
                        </li>

                    </ul>
                </div>
            </div>
        </div>
    );
};

export default VideoBox;
