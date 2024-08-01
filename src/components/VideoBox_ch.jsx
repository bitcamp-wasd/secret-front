import React from "react";
import "../assets/css/style.css";
import heart from "../assets/images/heart.svg";
import defaultThumbnail from "../assets/images/defaultThumbnail.jpg";

// .env 파일에서 클라우드 이미지 URL 가져오기
const cloudImageUrl = process.env.REACT_APP_CLOUD_IMAGE_URL;

const VideoBox_ch = ({ thumbnail, title, nickname, cnt }) => {

    console.log(thumbnail);
    const thumbnailUrl = thumbnail ? `${cloudImageUrl}${thumbnail}` : defaultThumbnail;
    console.log(thumbnailUrl)

    return (
        <div className="video-box mt20">
            <img className="video-box-thumbnail" src={thumbnailUrl} alt={title} />

            <div className="row-direction space-between pdx30">
                <div className="movie-small">
                    <span className="video-title mt10">{title}</span>
                    <ul className="movie-small-list">
                        <li>
                            <span>{nickname}</span>
                        </li>
                        <li className="flex align-center">
                            <span className="likes-number">투표수 : {cnt}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default VideoBox_ch;
