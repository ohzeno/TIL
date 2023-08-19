import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";
import DiaryItem from "./DiaryItem";

const sortOptionList = [
  { value: "latest", text: "최신순" },
  { value: "oldest", text: "오래된 순" },
];

const filterOptionList = [
  { value: "all", text: "전체" },
  { value: "good", text: "좋은 감정" },
  { value: "bad", text: "안좋은 감정" },
];

const ControlMenu = ({ value, onChange, optionList }) => {
  return (
    <select
      className="ControlMenu"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {optionList.map((item, idx) => (
        <option key={idx} value={item.value}>
          {item.text}
        </option>
      ))}
    </select>
  );
};

const DiaryList = ({ diaryList }) => {
  const navigate = useNavigate();
  const [sortType, setSortType] = useState("latest");
  const [filter, setFilter] = useState("all");

  const getOrderedDiaryList = () => {
    const filterCallBack = (item) => {
      if (filter === "all") return true;
      if (filter === "good") return parseInt(item.emotion) >= 3;
      return parseInt(item.emotion) < 3;
    };

    const compare = (a, b) => {
      if (sortType === "latest") {
        return parseInt(b.created_date) - parseInt(a.created_date);
      }
      return parseInt(a.created_date) - parseInt(b.created_date);
    };
    const copiedList = JSON.parse(JSON.stringify(diaryList));
    const filteredList = copiedList.filter(filterCallBack);
    return filteredList.sort(compare);
  };

  return (
    <div className="DiaryList">
      <div className="menu_wrapper">
        <div className="left_col">
          <ControlMenu
            value={sortType}
            onChange={setSortType}
            optionList={sortOptionList}
          />
          <ControlMenu
            value={filter}
            onChange={setFilter}
            optionList={filterOptionList}
          />
        </div>
        <div className="right_col">
          <MyButton
            type={"positive"}
            text={"새 일기 작성"}
            onClick={() => navigate("/new")}
          />
        </div>
      </div>
      {getOrderedDiaryList().map((item) => (
        <DiaryItem key={item.id} {...item} />
      ))}
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
