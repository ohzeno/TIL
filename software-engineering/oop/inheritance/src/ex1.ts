class Animal {
  protected name: string;

  constructor(name: string = "animal") {
    this.name = name;
  }

  move(distance: number = 0) {
    console.log(`${this.name} moved ${distance} meters.`);
  }
}

class Dog extends Animal {
  constructor(name: string = "dog") {
    super(name);
  }

  bark() {
    console.log("Woof! Woof!");
  }

  // 물려받은 move 오버라이드 가능.
  move(distance: number = 5) {
    console.log("The dog is running...");
    super.move(distance); // 부모의 move 사용 가능.
  }
}

const myDog = new Dog("Max");
myDog.bark();
myDog.move();
