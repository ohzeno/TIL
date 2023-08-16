import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import React, {
  useCallback,
  useMemo,
  useEffect,
  useRef,
  useReducer,
} from "react";

const url = "https://jsonplaceholder.typicode.com/comments?_limit=10";

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT":
      return action.data;
    case "CREATE":
      const created_date = new Date().getTime();
      const newItem = {
        ...action.data,
        created_date,
      };
      return [newItem, ...state];
    case "DELETE":
      return state.filter((item) => item.id !== action.targetId);
    case "EDIT":
      return state.map((item) =>
        item.id === action.targetId
          ? { ...item, content: action.newContent }
          : item
      );
    default:
      return state;
  }
};

export const DiaryStateContext = React.createContext();

export const DiaryDispatchContext = React.createContext();

const App = () => {
  const [data, dispatch] = useReducer(reducer, []);

  const dataId = useRef(0);

  const getData = async () => {
    const response = await fetch(url).then((res) => res.json());
    const initData = response.map((item) => {
      return {
        author: item.email,
        content: item.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        created_date: new Date().getTime(),
        id: dataId.current++,
      };
    });
    dispatch({ type: "INIT", data: initData });
  };

  useEffect(() => {
    getData();
  }, []);

  const onCreate = useCallback((author, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: { author, content, emotion, id: dataId.current },
    });
    dataId.current += 1;
  }, []);

  const onDelete = useCallback((targetId) => {
    dispatch({ type: "DELETE", targetId });
    // setData((data) => data.filter((item) => item.id !== targetId));
  }, []);

  const onEdit = useCallback((targetId, newContent) => {
    dispatch({ type: "EDIT", targetId, newContent });
  }, []);

  const memoizedDispatches = useMemo(() => {
    return { onCreate, onDelete, onEdit };
  }, []);

  const getDiaryAnalysis = useMemo(() => {
    const goodCount = data.filter((item) => item.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;
    return { goodCount, badCount, goodRatio };
  }, [data.length]);

  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={memoizedDispatches}>
        <div className="App">
          <DiaryEditor />
          <div className="analysis">
            <div className="analysis__item">
              <div className="analysis__item__title">좋은 일기</div>
              <div className="analysis__item__content">{goodCount}개</div>
            </div>
            <div className="analysis__item">
              <div className="analysis__item__title">나쁜 일기</div>
              <div className="analysis__item__content">{badCount}개</div>
            </div>
            <div className="analysis__item">
              <div className="analysis__item__title">긍정 비율</div>
              <div className="analysis__item__content">{goodRatio}%</div>
            </div>
          </div>
          <DiaryList />
        </div>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
};

export default App;
