class Book {
  title: string;
  author: string;

  constructor(title: string, author: string) {
    this.title = title;
    this.author = author;
  }

  createPost() {}

  readPost() {}

  updatePost() {}

  deletePost() {}
}

// html 표시 기능 분리
class BookPresenter {
  book: Book;

  constructor(book: Book) {
    this.book = book;
  }

  displayHTML() {
    return `<h1>${this.book.title}</h1><p>${this.book.author}</p>`;
  }
}

// 표시 기능 분리로, 새로 기능을 추가할 때 crud 기능을 담당하는 Book 클래스는 변경되지 않음.
class TextBookPresenter {
  book: Book;

  constructor(book: Book) {
    this.book = book;
  }

  displayText() {
    return `Title: ${this.book.title}, Author: ${this.book.author}`;
  }
}

class JSONBookPresenter {
  book: Book;

  constructor(book: Book) {
    this.book = book;
  }

  displayJSON() {
    return JSON.stringify({ title: this.book.title, author: this.book.author });
  }
}
