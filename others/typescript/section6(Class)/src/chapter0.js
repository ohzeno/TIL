// 클래스
let studentA = {
  name: "stark",
  grade: "A+",
  age: 23,
  study() {
    console.log(`${this.name} is studying`);
  },
  introduce() {
    console.log(`My name is ${this.name}. I'm ${this.age} years old.`);
  },
};

class Student {
  constructor(name, grade, age) {
    this.name = name;
    this.grade = grade;
    this.age = age;
  }
  study() {
    console.log(`${this.name} is studying`);
  }
  introduce() {
    console.log(`My name is ${this.name}. I'm ${this.age} years old.`);
  }
}

class StudentDeveloper extends Student {
  constructor(name, grade, age, mainLang) {
    super(name, grade, age); // 상속받은 경우 this 사용하기 전에 super를 먼저 호출해야 함
    this.mainLang = mainLang;
  }
  coding() {
    console.log(`${this.name} is coding ${this.mainLang}`);
  }
}

const studentB = new StudentDeveloper("stark", "A+", 23, "JavaScript");
console.log(studentB);
studentB.study();
studentB.introduce();
studentB.coding();

// let studentB = new Student("stark", "A+", 23);
// console.log(studentB);
// studentB.study();
// studentB.introduce();
