import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { todoListState } from "./atoms";

// 고유한 Id 생성을 위한 유틸리티
let id = 0;
const getId = () => id++;

const TodoItemCreator = () => {
  const [inputValue, setInputValue] = useState("");
  const setTodoList = useSetRecoilState(todoListState); // todoListState의 setter를 가져옴

  const addItem = () => {
    setTodoList((oldTodoList) => [
      ...oldTodoList,
      {
        id: getId(),
        text: inputValue,
        isComplete: false,
      },
    ]);
    setInputValue("");
  };

  const onChange = ({ target: { value } }) => setInputValue(value);

  return (
    <div>
      <input type="text" value={inputValue} onChange={onChange} />
      <button onClick={addItem}>Add</button>
    </div>
  );
};

export default TodoItemCreator;
