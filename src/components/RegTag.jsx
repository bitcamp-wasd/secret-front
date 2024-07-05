import React, { useState } from 'react';
import Button from './Button';
import "../assets/css/style.css";
import Piano from "../assets/images/tag_piano.svg";
import Violin from "../assets/images/tag_violin.svg";
import Guitar from "../assets/images/tag_guitar.svg";
import Drum from "../assets/images/tag_drum.svg";

const Tag = () => {
    const [selected, setSelected] = useState(null);

    const handleClick = (index) => {
        setSelected(selected === index ? null : index);
    };

    return (
        <div className="tag-box align-center mt10">
            <Button
                size="tag"
                className={selected === 3 ? 'selected' : ''}
                onClick={() => handleClick(3)}
            >
                <span className='icon-wrapper'>
                    <img src={Piano} alt="piano" />
                </span>
                피아노
            </Button>
            <Button
                size="tag"
                className={selected === 4 ? 'selected' : ''}
                onClick={() => handleClick(4)}
            >
                <span className='icon-wrapper'>
                    <img src={Violin} alt="violin" />
                </span>
                바이올린
            </Button>
            <Button
                size="tag"
                className={selected === 5 ? 'selected' : ''}
                onClick={() => handleClick(5)}
            >
                <span className='icon-wrapper'>
                    <img src={Guitar} alt="guitar" />
                </span>
                기타
            </Button>
            <Button
                size="tag"
                className={selected === 6 ? 'selected' : ''}
                onClick={() => handleClick(6)}
            >
                <span className='icon-wrapper'>
                    <img src={Drum} alt="drum" />
                </span>
                드럼
            </Button>
        </div>
    );
}

export default Tag;
