// 안좋은 예시
class Rectangle {
  constructor(public width: number, public height: number) {}

  public setWidth(width: number) {
    this.width = width;
  }

  public setHeight(height: number) {
    this.height = height;
  }

  public getArea(): number {
    return this.width * this.height;
  }
}

// 수학적으로는 정사각형은 직사각형의 일종.
class Square extends Rectangle {
  constructor(public side: number) {
    super(side, side);
  }

  // lsp 위반. 부모 클래스의 메서드를 오버라이딩하여 부모 클래스를 대체할 수 없음.
  // 정사각형은 가로, 세로가 같으므로 setWidth, setHeight를 호출할 때 둘 다 변경되어야 함.
  public setWidth(width: number) {
    this.width = width;
    this.height = width;
  }

  public setHeight(height: number) {
    this.width = height;
    this.height = height;
  }

  public getArea(): number {
    return this.side ** 2;
  }
}
