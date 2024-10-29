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

  move(distance: number = 5) {
    console.log("The dog is running...");
    super.move(distance);
  }
}

const myDog = new Dog("Max");
myDog.bark();
myDog.move();
