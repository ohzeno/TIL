// 서비스가 커지면서 유저에 따라 일부 메서드만 사용해야 할 필요가 생길 수 있음.
interface BlogService {
  createPost(post: Post): void;

  commentOnPost(comment: Comment): void;

  sharePost(post: Post): void;
}
