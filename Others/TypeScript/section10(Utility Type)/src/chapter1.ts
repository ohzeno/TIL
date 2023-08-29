// Partial
// 특정 객체 타입의 모든 프로퍼티를 선택적 프로퍼티로 바꿔줌
interface Post {
  title: string;
  tags: string[];
  content: string;
  thumbnailURL?: string;
}

type Partial<T> = {
  [key in keyof T]?: T[key];
};

const draft: Partial<Post> = {
  title: "Draft",
  content: "초안",
};

// Required
// 특정 객체 타입의 모든 프로퍼티를 필수 프로퍼티로 바꿔줌
type Required<T> = {
  [key in keyof T]-?: T[key];
};

const withThumbnailPost: Required<Post> = {
  title: "Draft",
  tags: ["typescript", "javascript"],
  content: "초안",
  thumbnailURL: "https://...",
};

// Readonly
// 특정 객체 타입의 모든 프로퍼티를 읽기 전용 프로퍼티로 바꿔줌
type Readonly<T> = {
  readonly [key in keyof T]: T[key];
};

const readonlyPost: Readonly<Post> = {
  title: "Draft",
  tags: ["typescript", "javascript"],
  content: "초안",
};

// readonlyPost.title = "hello";
