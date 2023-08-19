import React, { useEffect, useRef, useReducer } from "react";

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT":
      // init은 로컬스토리지에 데이터가 있는 경우에만 실행되기 때문에 굳이 또 저장해줄 필요 없다.
      return action.data;
    case "CREATE":
      newState = [action.data, ...state];
      break;
    case "DELETE":
      newState = state.filter((item) => item.id !== action.targetId);
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
      if (diaryList.length === 0) return;
      dataId.current = diaryList[0].id + 1;
      dispatch({ type: "INIT", data: diaryList });
    }
  }, []);

  const dataId = useRef(0);

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
    dispatch({ type: "DELETE", targetId });
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
