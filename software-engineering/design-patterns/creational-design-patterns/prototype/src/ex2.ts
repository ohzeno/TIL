interface ShapeProperties {
  color: string;
  x: number;
  y: number;
}

abstract class Shape {
  constructor(public properties: ShapeProperties) {}
  abstract clone(): Shape;
}

class Rectangle extends Shape {
  constructor(
    properties: ShapeProperties,
    public width: number,
    public height: number
  ) {
    super(properties);
  }

  clone(): Shape {
    let clonedProperties: ShapeProperties = {
      color: this.properties.color,
      x: this.properties.x,
      y: this.properties.y,
    };
    return new Rectangle(clonedProperties, this.width, this.height);
  }
}

class Circle extends Shape {
  constructor(properties: ShapeProperties, public radius: number) {
    super(properties);
  }

  clone(): Shape {
    let clonedProperties: ShapeProperties = {
      color: this.properties.color,
      x: this.properties.x,
      y: this.properties.y,
    };
    return new Circle(clonedProperties, this.radius);
  }
}

let redRectangle: Shape = new Rectangle(
  {
    color: "red",
    x: 0,
    y: 0,
  },
  10,
  20
);

let anotherRedRectangle: Shape = redRectangle.clone();

// 클론된 인스턴스의 색상 변경
anotherRedRectangle.properties.color = "blue";

// 원본은 변하지 않음
console.log(redRectangle);
console.log(anotherRedRectangle);
