// 인터페이스와 클래스

interface CharacterInterface {
  name: string;
  moveSpeed: number;
  move(): void;
}

class Character implements CharacterInterface {
  // 인터페이스에 정의된 필드는 무조건 public임. 다른거 안됨.
  constructor(public name: string, public moveSpeed: number) {}

  move() {
    console.log(`${this.name} moved ${this.moveSpeed}m.`);
  }
}
