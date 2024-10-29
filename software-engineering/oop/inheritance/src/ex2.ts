class Product {
  constructor(
    public id: string,
    public price: number,
    public description: string
  ) {}

  display(): void {
    console.log(
      `ID: ${this.id}\nPrice: ${this.price}\nDescription: ${this.description}`
    );
  }
}

class Book extends Product {
  constructor(
    id: string,
    price: number,
    description: string,
    public author: string,
    public title: string
  ) {
    super(id, price, description);
  }

  display(): void {
    super.display();
    console.log(`Author: ${this.author}\nTitle: ${this.title}`);
  }
}

class Electronic extends Product {
  constructor(
    id: string,
    price: number,
    description: string,
    public brand: string,
    public model: string
  ) {
    super(id, price, description);
  }

  display(): void {
    super.display();
    console.log(`Brand: ${this.brand}\nModel: ${this.model}`);
  }
}

let book = new Book(
  "1",
  19.99,
  "A great book",
  "Martin Seligman",
  "Learned Optimism"
);
book.display();

let electronic = new Electronic(
  "2",
  299.99,
  "A great laptop",
  "Dell",
  "XPS 15"
);
electronic.display();
