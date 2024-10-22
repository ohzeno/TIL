// Pick<T, K>
// 특정 객체 타입 T의 프로퍼티 K만을 모아 타입을 정의함
interface Post {
  title: string;
  tags: string[];
  content: string;
  thumbnailURL?: string;
}

type Pick<T, K extends keyof T> = {
  // 강의에서는 상위집합 하위집합이라고만 설명했는데
  // class, interface, type 등을 extends 하는 경우에는 프로퍼티가 적은 쪽이 상위집합이다. 그런 경우는 프로퍼티들이 and로 이어져있지만 여기서(keyof)는 or로 이어져있어서 상위/하위 타입이 반대가 된다.
  // K extends 'title' | 'tags' | 'content' | 'thumbnailURL'
  // 'title' | 'content' extends 'title' | 'tags' | 'content' | 'thumbnailURL'
  [key in K]: T[key];
};

const legacyPost: Pick<Post, "title" | "content"> = {
  title: "Hello World",
  content: "Best Content",
};

// Omit<T, K>
// 특정 객체 타입 T의 프로퍼티 K만을 제거한 타입을 정의함

// type Omit<T, K extends keyof T> = {
//   [key in Exclude<keyof T, K>]: T[key];
// };
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
// T = Post, K = 'title' | 'content'
// Pick<Post, Exclude<keyof Post, 'title' | 'content'>>
// Pick<Post, Exclude<'title' | 'tags' | 'content' | 'thumbnailURL', 'title' | 'content'>>
// Pick<Post, 'tags' | 'thumbnailURL'>

const legacyPost2: Omit<Post, "title" | "content"> = {
  tags: ["typescript", "javascript"],
  thumbnailURL: "https://...",
};

// Record<K, V>
// 특정 타입 V를 K의 프로퍼티로 갖는 타입을 정의함
type Record<K extends keyof any, V> = {
  // 강의에서는 오류의 이유에 대한 설명이 없는데
  // K의 요소를 key로 뽑아서 사용중이고, key는 string | number | symbol 이어야 한다.
  // 그래서 그대로 사용하면 key in K에서 오류가 발생한다.
  // keyof any로 key의 타입을 string | number | symbol로 바꿔줌
  [key in K]: V;
};

type Thumbnail = Record<
  "large" | "medium" | "small" | "watch",
  { url: string; size: number }
>;
