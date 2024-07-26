import React from "react";
import "../assets/css/style.css";
import heart from "../assets/images/heart.svg";
import defaultThumbnail from "../assets/images/defaultThumbnail.jpg";

// .env 파일에서 클라우드 이미지 URL 가져오기
const cloudImageUrl = process.env.REACT_APP_CLOUD_IMAGE_URL;

const VideoBox_best = ({ thumbnail, title, nickname, cnt }) => {

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
        <div className="video-box">
            <img className="video-box-thumbnail" src={thumbnail} alt={title} />

            <div className="row-direction space-between pdx30">
                <div className="movie-small">
                    <span className="video-title mt10">{title}</span>
                    <ul className="movie-small-list">
                        <li>
                            <span>{nickname}</span>
                        </li>
                        <li className="flex align-center">
                            {/* <img src={heart} className="f20 no-transform" alt="heart" /> */}
                            <span className="likes-number">투표수 : {cnt}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default VideoBox_best;
