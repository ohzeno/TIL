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
