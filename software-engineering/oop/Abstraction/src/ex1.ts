interface Shape {
  area(): number;
  perimeter(): number;
}

class Circle implements Shape {
  constructor(private radius: number) {}

  area() {
    return Math.PI * this.radius ** 2;
  }

  perimeter() {
    return 2 * Math.PI * this.radius;
  }
}

class Rectangle implements Shape {
  constructor(private width: number, private height: number) {}

  area() {
    return this.width * this.height;
  }

  perimeter() {
    return 2 * (this.width + this.height);
  }
}

function getArea(shape: Shape): number {
  return shape.area();
}

const circle: Shape = new Circle(5);
const rectangle: Shape = new Rectangle(2, 3);
console.log(`Circle area: ${getArea(circle)}`);
console.log(`Rectangle area: ${getArea(rectangle)}`);
