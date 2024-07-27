import React, { useState } from "react";
import "../assets/css/style.css";
import Button from "./Button";
import View from "../assets/images/tag_view.svg";
import Like from "../assets/images/tag_like.svg";
import Piano from "../assets/images/tag_piano.svg";
import Violin from "../assets/images/tag_violin.svg";
import Guitar from "../assets/images/tag_guitar.svg";
import Drum from "../assets/images/tag_drum.svg";

const Tag = ({ onTagClick }) => {
  const [selected, setSelected] = useState({
    sort: "uploadDate", // 기본 정렬 기준
    category: [] // 선택된 카테고리 없음
  });

  const sortTags = [
    { id: 1, name: "조회수", icon: View },
    { id: 2, name: "좋아요", icon: Like }
  ];

  const categoryTags = [
    { id: 3, name: "피아노", icon: Piano, englishName: "piano" },
    { id: 4, name: "바이올린", icon: Violin, englishName: "violin" },
    { id: 5, name: "기타", icon: Guitar, englishName: "guitar" },
    { id: 6, name: "드럼", icon: Drum, englishName: "drum" }
  ];

  const handleClick = (tag) => {
    let newSelected = { ...selected };

    if (tag.id === 0) {
      newSelected.sort = "uploadDate";
      newSelected.category = []; // 전체 선택 시 카테고리 초기화
    } else if (tag.id === 1) {
      newSelected.sort = "views";
    } else if (tag.id === 2) {
      newSelected.sort = "video.likeCount";
    } else if (tag.id >= 3 && tag.id <= 6) {
      const categoryName = tag.englishName; // 영어 이름으로 수정
      const index = newSelected.category.indexOf(categoryName);

      if (index === -1) {
        newSelected.category = [...newSelected.category, categoryName];
      } else {
        newSelected.category = newSelected.category.filter(cat => cat !== categoryName);
      }
    }

    setSelected(newSelected);
    onTagClick(newSelected); // 최신 상태를 부모 컴포넌트로 전달
  };

  return (
    <div className="flex tag-box align-center">
      <Button
        size="tag"
        className={selected.sort === "uploadDate" ? "selected" : ""}
        onClick={() => handleClick({ id: 0 })}
      >
        전체
      </Button>
      {sortTags.map(tag => (
        <Button
          key={tag.id}
          size="tag"
          className={selected.sort === (tag.id === 1 ? "views" : "video.likeCount") ? "selected" : ""}
          onClick={() => handleClick(tag)}
        >
          <span className='icon-wrapper'>
            <img src={tag.icon} alt={tag.name} />
          </span>
          {tag.name}
        </Button>
      ))}
      <div className='tag-margin'>
        {categoryTags.map(tag => (
          <Button
            key={tag.id}
            size="tag"
            className={selected.category.includes(tag.englishName) ? "selected" : ""}
            onClick={() => handleClick(tag)}
          >
            <span className='icon-wrapper'>
              <img src={tag.icon} alt={tag.name} />
            </span>
            {tag.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Tag;
