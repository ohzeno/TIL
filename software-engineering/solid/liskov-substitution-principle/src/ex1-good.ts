// 좋은 예시
interface Shape {
  getArea(): number;
}

class Rectangle implements Shape {
  constructor(public width: number, public height: number) {}

  public setWidth(width: number): void {
    this.width = width;
  }

  public setHeight(height: number): void {
    this.height = height;
  }

  public getArea(): number {
    return this.width * this.height;
  }
}

class Square implements Shape {
  constructor(public size: number) {}

  public setSize(size: number): void {
    this.size = size;
  }

  public getArea(): number {
    return this.size ** 2;
  }
}

function area(shape: Shape) {
  return shape.getArea();
}

let rect = new Rectangle(10, 12);
let square = new Square(8);

// Shape을 하위 타입으로 대체할 수 있음.
console.log(area(rect));
console.log(area(square));
