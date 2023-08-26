// 클래스
class Employee {
  name: string;
  age: number;
  position: string;

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
    /* 
    강의에는 나오지 않았지만
    public/private/protected 등등 접근 제어자를 사용하면 필드선언 안해도 되고, 
    이니셜라이징 안해도 자동으로 this.필드명 = 파라미터로 처리된다.
    */
    public numOfReports: number
  ) {
    super(name, age, position);
  }
}

const executiveOfficer = new ExecutiveOfficer("Quill", 38, "Teacher", 10);
console.log(executiveOfficer.numOfReports);

// const employee = new Employee("Quill", 38, "Teacher");
// console.log(employee.profile());

// 타입으로 활용 가능
const employeeC: Employee = {
  name: "Quill",
  age: 38,
  position: "Teacher",
  profile: () => "hello",
};
