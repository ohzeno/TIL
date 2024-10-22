// 인덱스드 엑세스 타입
// interface Post {
//   title: string;
//   content: string;
//   author: {
//     id: number;
//     name: string;
//   };
// }
type PostList = {
  title: string;
  content: string;
  author: {
    id: number;
    name: string;
  };
}[];

// const key = "author"; Post[key] 처럼 접근하지 못함.
// 인덱스로는 타입만 들어올 수 있음.
function printAuthorInfo(author: PostList[number]["author"]) {
  console.log(`${author.name} (${author.id})`);
}

const post: PostList[number] = {
  title: "Hello TypeScript",
  content: "TypeScript is a typed superset of JavaScript.",
  author: {
    id: 1,
    name: "Dev",
  },
};

printAuthorInfo(post.author);

type Tup = [number, string, boolean];
type Tup0 = Tup[0];
type Tup1 = Tup[1];
type Tup2 = Tup[2];
type TupNum = Tup[number];
