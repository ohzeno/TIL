import { selector } from "recoil";
import { todoListState, todoListFilterState } from "./atoms";

export const filteredTodoListState = selector({
  key: "filteredTodoListState",
  get: ({ get }) => {
    // get 함수는 다른 atom이나 selector의 값을 읽어올 때 사용
    // 의존성을 추적하고, 변경될 때마다 새로운 값을 계산
    const filter = get(todoListFilterState);
    const list = get(todoListState);

    switch (filter) {
      case "Show Completed":
        return list.filter((item) => item.isComplete);
      case "Show Uncompleted":
        return list.filter((item) => !item.isComplete);
      default:
        return list;
    }
  },
});

export const todoListStatsState = selector({
  key: "todoListStatsState",
  get: ({ get }) => {
    const todoList = get(todoListState);
    const totalNum = todoList.length;
    const totalCompletedNum = todoList.filter((item) => item.isComplete).length;
    const totalUncompletedNum = totalNum - totalCompletedNum;
    const percentCompleted = totalNum === 0 ? 0 : totalCompletedNum / totalNum;

    return {
      totalNum,
      totalCompletedNum,
      totalUncompletedNum,
      percentCompleted,
    };
  },
});
