// 여기선 인터페이스여도 상관 없음.
abstract class Shape {
  abstract area(): number;
}

class Circle extends Shape {
  constructor(private radius: number) {
    super();
  }

  area(): number {
    return Math.PI * this.radius ** 2;
  }
}

class Rectangle extends Shape {
  constructor(private width: number, private height: number) {
    super();
  }

  area(): number {
    return this.width * this.height;
  }
}

const rect: Shape = new Rectangle(5, 4);
const circle: Shape = new Circle(3);

function getTotalArea(shapes: Shape[]): number {
  return shapes.reduce((totalArea, shape) => totalArea + shape.area(), 0);
}

const totalArea = getTotalArea([rect, circle]);
console.log(`Total area of shapes: ${totalArea}`);
