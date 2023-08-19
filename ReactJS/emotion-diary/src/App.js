import React, { useEffect, useRef, useReducer } from "react";

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";

const url = "https://jsonplaceholder.typicode.com/comments?_limit=10";

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT":
      // 강의에서는 여기서 저장을 안해준다. 그러면 초기 값이 스토리지에 저장되지 않음.
      // 다만 이러면 getData랑 겹친다. 나중에 최적화 해야함.
      localStorage.setItem("diary", JSON.stringify(action.data));
      return action.data;
    case "CREATE":
      newState = [action.data, ...state];
      break;
    case "REMOVE":
      newState = state.filter((item) => item.id !== action.data.id);
      break;
    case "EDIT":
      newState = state.map((item) =>
        item.id === action.data.id ? action.data : item
      );
      break;
    default:
      return state;
  }
  localStorage.setItem("diary", JSON.stringify(newState));
  return newState;
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    const localData = localStorage.getItem("diary");
    if (localData) {
      const diaryList = JSON.parse(localData).sort(
        (a, b) => parseInt(b.id) - parseInt(a.id)
      );
      dataId.current = diaryList[0].id + 1;
      dispatch({ type: "INIT", data: diaryList });
    }
  }, []);

  const dataId = useRef(0);

  const getData = async () => {
    const response = await fetch(url).then((res) => res.json());
    let initDate = new Date().getTime();
    const initData = response.map((item) => {
      return {
        author: item.email,
        content: item.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        created_date: initDate++,
        id: dataId.current++,
      };
    });
    dispatch({ type: "INIT", data: initData });
  };

  useEffect(() => {
    getData();
  }, []);

  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current++,
        created_date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
  };

  const onDelete = (targetId) => {
    dispatch({ type: "REMOVE", targetId });
  };

  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        created_date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
  };

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{ onCreate, onDelete, onEdit }}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/edit/:id" element={<Edit />} />
              <Route path="/diary/:id" element={<Diary />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
