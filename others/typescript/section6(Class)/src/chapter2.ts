// 접근 제어자
class Employee {
  name: string;
  private age: number;
  protected position: string;

  constructor(name: string, age: number, position: string) {
    this.name = name;
    this.age = age;
    this.position = position;
  }

  profile() {
    return `${this.name}, ${this.age}, ${this.position}`;
  }
}

class ExecutiveOfficer extends Employee {
  constructor(
    name: string,
    age: number,
    position: string,
    public numOfReports: number
  ) {
    super(name, age, position);
  }

  func() {
    // console.log(this.age); // private는 상속받아도 접근 불가
    console.log(this.position); // protected는 상속받으면 접근 가능
  }
}

const employee = new Employee("Quill", 38, "Teacher");
const officer = new ExecutiveOfficer("Quill", 38, "Teacher", 10);
