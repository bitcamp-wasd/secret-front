import React, {useState} from 'react';
import Button from './Button';
import "../assets/css/style.css";
import View from "../assets/images/tag_view.svg";
import Like from "../assets/images/tag_like.svg";
import Piano from "../assets/images/tag_piano.svg";
import Violin from "../assets/images/tag_violin.svg";
import Guitar from "../assets/images/tag_guitar.svg";
import Drum from "../assets/images/tag_drum.svg";

const Tag = () => {
    const [selected, setSelected] = useState([0]);

    const handleClick = (index) => {
        if (index === 0) {
            setSelected([0]);
        } else {
            if (selected.includes(index)) {
                setSelected(selected.filter(i => i !== index));
            } else {
                setSelected(selected.filter(i => i !== 0).concat(index));
            }
        }
    };

    return (
        <div className="tag align-center mb8">
            <button
                className={`button tag ${selected.includes(0) ? 'selected' : ''}`}
                onClick={() => handleClick(0)}
            >
                전체
            </button>
            <button
                className={`button tag ${selected.includes(1) ? 'selected' : ''}`}
                onClick={() => handleClick(1)}
            >
                <img src={View} alt="view" />조회수
            </button>
            <button
                className={`button tag ${selected.includes(2) ? 'selected' : ''}`}
                onClick={() => handleClick(2)}
            >
                 <img src={Like} alt="piano" />좋아요
            </button>
            <button
                className={`button tag ${selected.includes(3) ? 'selected' : ''}`}
                onClick={() => handleClick(3)}
            >
                <img src={Piano} alt="piano" /> 피아노
            </button>
            <button
                className={`button tag ${selected.includes(4) ? 'selected' : ''}`}
                onClick={() => handleClick(4)}
            >
                <img src={Violin} alt="violin" /> 바이올린
            </button>
            <button
                className={`button tag ${selected.includes(5) ? 'selected' : ''}`}
                onClick={() => handleClick(5)}
            >
                <img src={Guitar} alt="guitar" /> 기타
            </button>
            <button
                className={`button tag ${selected.includes(6) ? 'selected' : ''}`}
                onClick={() => handleClick(6)}
            >
                <img src={Drum} alt="drum" /> 드럼
            </button>
        </div>
    );
}

export default Tag;