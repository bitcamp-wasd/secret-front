import React, { useState, useEffect } from 'react';
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
        } else if (index === 1 || index === 2) {
            setSelected((prevSelected) => {
                const otherIndex = index === 1 ? 2 : 1;
                if (prevSelected.includes(index)) {
                    return prevSelected.filter(i => i !== index && i !== 0);
                } else {
                    return [...prevSelected.filter(i => i !== otherIndex && i !== 0), index];
                }
            });
        } else {
            setSelected((prevSelected) => {
                if (prevSelected.includes(index)) {
                    return prevSelected.filter(i => i !== index);
                } else {
                    return [...prevSelected.filter(i => i !== 0), index];
                }
            });
        }
    };

    // selected가 모두 해제되었을 때 전체버튼이 selected되게 함
    useEffect(() => {
        if (selected.length === 0) {
            setSelected([0]);
        }
    }, [selected]);

    return (
        <div className="flex tag-box align-center">
            <Button
                size="tag"
                className={selected.includes(0) ? 'selected' : ''}
                onClick={() => handleClick(0)}
            >
                전체
            </Button>
            <Button
                size="tag"
                className={selected.includes(1) ? 'selected' : ''}
                onClick={() => handleClick(1)}
            >
                <span className='icon-wrapper'>
                    <img src={View} alt="view" />
                </span>
                조회수
            </Button>
            <Button
                size="tag"
                className={selected.includes(2) ? 'selected' : ''}
                onClick={() => handleClick(2)}
            >
                <span className='icon-wrapper'>
                    <img src={Like} alt="like" />
                </span>
                좋아요
            </Button>
            <Button
                size="tag"
                className={selected.includes(3) ? 'selected' : ''}
                onClick={() => handleClick(3)}
            >
                <span className='icon-wrapper'>
                    <img src={Piano} alt="piano" />
                </span>
                피아노
            </Button>
            <Button
                size="tag"
                className={selected.includes(4) ? 'selected' : ''}
                onClick={() => handleClick(4)}
            >
                <span className='icon-wrapper'>
                    <img src={Violin} alt="violin" />
                </span>
                바이올린
            </Button>
            <Button
                size="tag"
                className={selected.includes(5) ? 'selected' : ''}
                onClick={() => handleClick(5)}
            >
                <span className='icon-wrapper'>
                    <img src={Guitar} alt="guitar" />
                </span>
                기타
            </Button>
            <Button
                size="tag"
                className={selected.includes(6) ? 'selected' : ''}
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
