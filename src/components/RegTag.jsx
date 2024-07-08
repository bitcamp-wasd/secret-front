import React, { useState } from 'react';
import Button from './Button';
import '../assets/css/style.css';
import Piano from '../assets/images/tag_piano.svg';
import Violin from '../assets/images/tag_violin.svg';
import Guitar from '../assets/images/tag_guitar.svg';
import Drum from '../assets/images/tag_drum.svg';

const RegTag = ({ onTagSelect }) => {
    const [selected, setSelected] = useState(null);

    const tags = [
        { id: 3, name: '피아노', icon: Piano, value: 'piano' },
        { id: 4, name: '바이올린', icon: Violin, value: 'violin' },
        { id: 5, name: '기타', icon: Guitar, value: 'guitar' },
        { id: 6, name: '드럼', icon: Drum, value: 'drum' },
    ];

    const handleClick = (tag) => {
        const newSelected = selected === tag.id ? null : tag.id;
        setSelected(newSelected);
        onTagSelect(newSelected ? tag : null); // 선택된 태그를 부모 컴포넌트로 전달
    };

    return (
        <div className="flex tag-box align-center mt10">
            {tags.map((tag) => (
                <Button
                    key={tag.id}
                    size="tag"
                    className={selected === tag.id ? 'selected' : ''}
                    onClick={() => handleClick(tag)}>
                    <span className="icon-wrapper">
                        <img src={tag.icon} alt={tag.name} />
                    </span>
                    {tag.name}
                </Button>
            ))}
        </div>
    );
};

export default RegTag;
