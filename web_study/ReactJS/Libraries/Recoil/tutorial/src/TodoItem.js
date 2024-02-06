import { useRecoilState } from "recoil";
import { todoListState } from "./atoms";

const TodoItem = ({ item }) => {
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const index = todoList.findIndex((listItem) => listItem === item);

  /* 항목 텍스트 수정. 
  target은 input객체 자체를 의미. 거기서 value값 가져와서 value변수에 구조분해 할당. */
  const editItemText = ({ target: { value } }) => {
    const newList = replaceItemAtIndex(todoList, index, {
      ...item,
      text: value,
    });
    setTodoList(newList);
  };

  const toggleItemCompletion = () => {
    const newList = replaceItemAtIndex(todoList, index, {
      ...item,
      isComplete: !item.isComplete,
    });
    setTodoList(newList);
  };

  const deleteItem = () => {
    const newList = removeItemAtIndex(todoList, index);
    setTodoList(newList);
  };

  return (
    <div>
      <input type="text" value={item.text} onChange={editItemText} />
      <input
        type="checkbox"
        checked={item.isComplete}
        onChange={toggleItemCompletion}
      />
      <button onClick={deleteItem}>X</button>
    </div>
  );
};

// 배열에서 특정 인덱스 항목 새 값으로 교체
const replaceItemAtIndex = (arr, index, newValue) => {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
};

// 배열에서 특정 인덱스 항목 제거
const removeItemAtIndex = (arr, index) => {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
};

export default TodoItem;
