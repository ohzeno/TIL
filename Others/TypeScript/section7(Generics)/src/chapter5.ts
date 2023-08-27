// Promise
// 제네릭 설정 안해주면 resolve는 unknown, reject는 any로 설정됨.
const promise = new Promise<number>((resolve, reject) => {
  setTimeout(() => {
    // resolve(20);
    reject("무슨타입?");
  }, 1000);
});

promise
  .then((value) => {
    console.log(value * 20);
  })
  .catch((error) => {
    console.log(error);
  });

// 프라미스 반환하는 함수의 타입 정의
interface Post {
  id: number;
  title: string;
  content: string;
}

function fetchPost(): Promise<Post> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        id: 1,
        title: "Hello",
        content: "World",
      });
    }, 1000);
  });
}
const postPromise = fetchPost();
postPromise.then((post) => {
  console.log(post.id);
});
