# React

[최상위 폴더](../../README.md)

[TOC]



## useRef - React에서 DOM 조작하기

```jsx
import { useRef } from "react"

function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // `current` points to the mounted text input element
    inputEl.current.focus();
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}

const dataId = useRef(0);

const getData = async () => {
  const response = await fetch(url).then((res) => res.json());
  const initData = response.map((item) => {
    return {
      author: item.email,
      content: item.body,
      emotion: Math.floor(Math.random() * 5) + 1,
      created_date: new Date().getTime(),
      id: dataId.current++, // 컴포넌트 id가 바뀌어도 리렌더링 되지 않도록 useRef사용.
// 물론 여기선 id가 바뀔 일이 없지만 혹시 모를 사고 방지.
    };
  });
  dispatch({ type: "INIT", data: initData });
};
```

태그에 ref로 전달해주면 해당 컴포넌트에 포커스를 주는 등, dom에 개입할 수 있다.

또한 렌더링마다 동일한 객체를 제공한다. 하지만 내용물이 변경되어도 리렌더링이 되지 않으므로 변경시에 추가 작업을 하고싶다면 콜백 ref를 사용해야 한다.

[참조: 리액트 docs](https://ko.legacy.reactjs.org/docs/hooks-reference.html#useref)



## useEffect

```jsx
import { useEffect } from "react";

useEffect(() => {
	// todo
}, []};
```

콜백함수와 의존성 배열을 인자로 받는다. 의존성 배열이 없으면(빈배열이 아니라 그냥 안넣으면) 렌더링 마다 작동함. 

빈 배열을 전달하고 return값이 없으면 마운트시에만 작동함.

```jsx
useEffect(() => {
  const subscription = props.source.subscribe();
  return () => {
    // Clean up the subscription
    subscription.unsubscribe();
  };
});
```

콜백함수에 return값이 있으면 언마운트 시에 작동한다.

컴포넌트 마운트시에 구독, 언마운트 시에 return의 콜백함수가 작동하여 구독 취소가 된다.



## 최적화

크롬 확장 프로그램 [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=ko)를 설치하고, 개발자 도구의 메뉴에서 Components탭 선택, 설정의 General에서 Highlight updates when components render를 체크해주면 동적 분석을 하기 쉬움.

### useMemo

```jsx
import { useMemo } from "react"

const getDiaryAnalysis = useMemo(() => {
    const goodCount = data.filter((item) => item.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;
    return { goodCount, badCount, goodRatio };
  }, [data.length]);

// 함수가 아니라 값이기 때문에 ()를 사용하지 않음.
const { goodCount, badCount, goodRatio } = getDiaryAnalysis;
```

useMemo로 전달된 함수는 렌더링 시에 작동한다. 의존성 배열의 요소가 변하지 않으면 같은 값을 반환한다. 배열이 없으면 렌더링 마다 새 값을 계산한다.

값을 반환하기 때문에 함수 호출처럼 사용하지 않는다.

### React.memo

```jsx
import React from "react"

const ControlMenu = React.memo(({ value, onChange, optionList }) => {
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
});
```

useMemo는 값을 반환하기 때문에, 컴포넌트를 최적화하기 위해서는 React.memo를 사용한다.

props가 변화하지 않으면 메모이제이션 된 리턴값을 돌려줌. 즉, 재 렌더링 되지 않음.

위 코드의 onChange의 경우 컴포넌트 렌더링마다 재생성되지 않음. 이유는 useState의 세팅함수이기 때문. [setState는 리렌더링 시에도 변경되지 않음.](https://ko.legacy.reactjs.org/docs/hooks-reference.html#usestate)

### useCallback

```jsx
import { useCallback } from "react"

const onCreate = useCallback((author, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: { author, content, emotion, id: dataId.current },
    });
    dataId.current += 1;
  }, []);
```

React.memo는 props가 변하면 재생성 되는데, prop에 부모 컴포넌트에서 생성되는 함수가 있으면 부모 컴포넌트 재 렌더링 시에 자식도 리렌더링이 일어난다.

메모이제이션됨 콜백을 반환함. 뒤쪽 []는 의존성 배열. 의존성 요소가 변경되었을 때만 변경됨. 

useCallback을 사용하면 의존성 배열의 요소가 변경되지 않았다면 함수는 메모이제이션 된 것이 반환되므로 같은 props가 내려가서 자식 요소가 재 렌더링 되지 않는다.



## useReducer - 상태관리 로직 분리하기

```jsx
import { useReducer } from "react"

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

const App = () => {
  const [data, dispatch] = useReducer(reducer, []);  //두번째 인자는 초기값
	
	const onCreate = useCallback((author, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: { author, content, emotion, id: dataId.current },
    });
    dataId.current += 1;
  }, []);
...
```

함수 전부 따로 만들지 않고 dispatch로 통일할 수 있음.



# State Management

## Context

```jsx
import React from "react"

// useCallback으로 최적화된 함수들을 한꺼번에 context에 넣어줌.
const memoizedDispatches = useMemo(() => {
    return { onCreate, onDelete, onEdit };
  }, []);

export const DiaryDispatchContext = React.createContext();
// <DiaryDispatchContext.Provider value={memoizedDispatches}>  컴포넌트 감싸서 리턴

--------------하위 컴포넌트
import { DiaryDispatchContext } from "./App";

const { onCreate } = useContext(DiaryDispatchContext);

```

컨텍스트 하위의 컴포넌트들은 컨텍스트들을 통해 데이터를 공유할 수 있다. Vuex 비슷함.



## Recoil

### RecoilRoot

```jsx
import { RecoilRoot } from "recoil";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>
);
```

App을 RecoilRoot로 감싼다. 위처럼 index.js에서 해도 되고 App.js에서 해도 된다.



### Atom

```jsx
import { atom } from "recoil";

export const todoListState = atom({
  key: "todoListState",
  default: [],
});
```

atoms.js를 만들어서 값을 만든다. atom값을 읽는 모든 컴포넌트들을 atom을 구독하므로 atom이 변하면 구독하는 모든 컴포넌트가 리렌더링 된다.



### useSetRecoilState

```jsx
import { useSetRecoilState } from "recoil";
import { todoListState } from "./atoms";

// 고유한 Id 생성을 위한 유틸리티
let id = 0;
const getId = () => id++;

const TodoItemCreator = () => {
...
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
...
};
...
```

setter만 필요할 경우 사용