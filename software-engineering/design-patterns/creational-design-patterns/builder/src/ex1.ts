interface Builder {
  setPartA(): void;
  setPartB(): void;
  setPartC(): void;
}

class ConcreteBuilder implements Builder {
  private product!: Product;

  constructor() {
    this.reset();
  }

  public reset(): void {
    this.product = new Product();
  }

  public setPartA(): void {
    this.product.add("PartA");
  }

  public setPartB(): void {
    this.product.add("PartB");
  }

  public setPartC(): void {
    this.product.add("PartC");
  }

  public getProduct(): Product {
    const result = this.product;
    this.reset();
    return result;
  }
}

class Product {
  private parts: string[] = [];

  public add(part: string): void {
    this.parts.push(part);
  }

  public listParts(): void {
    console.log(`Product parts: ${this.parts.join(", ")}`);
  }
}

class Director {
  private builder!: Builder;

  public setBuilder(builder: Builder): void {
    this.builder = builder;
  }

  public buildMinimalViableProduct(): void {
    this.builder.setPartA();
  }

  public buildFullFeaturedProduct(): void {
    this.builder.setPartA();
    this.builder.setPartB();
    this.builder.setPartC();
  }
}

function clientCode(director: Director) {
  const builder = new ConcreteBuilder();
  director.setBuilder(builder);

  console.log("Basic product:");
  director.buildMinimalViableProduct();
  builder.getProduct().listParts();

  console.log("Full featured product:");
  director.buildFullFeaturedProduct();
  builder.getProduct().listParts();

  // 감독 없이 사용 가능
  console.log("Custom product:");
  builder.setPartA();
  builder.setPartB();
  builder.getProduct().listParts();
}

const director = new Director();
clientCode(director);
