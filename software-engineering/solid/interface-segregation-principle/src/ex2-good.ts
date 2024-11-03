interface PostCreator {
  createPost(post: Post): void;
}

interface CommentCreator {
  commentOnPost(comment: Comment): void;
}

interface PostSharer {
  sharePost(post: Post): void;
}

// 인터페이스 분리 덕분에 필요한 기능만 구현할 수 있음.
class Admin implements PostCreator, CommentCreator, PostSharer {
  createPost(post: Post): void {}

  commentOnPost(comment: Comment): void {}

  sharePost(post: Post): void {}
}

class RegularUser implements CommentCreator, PostSharer {
  commentOnPost(comment: Comment): void {}

  sharePost(post: Post): void {}
}

// ReadOnlyUser는 세 메서드 모두 사용하지 않음.
class ReadOnlyUser {}
