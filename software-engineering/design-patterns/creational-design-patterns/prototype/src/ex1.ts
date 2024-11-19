interface UserDetails {
  name: string;
  age: number;
  email: string;
}

interface Prototype {
  clone(): Prototype;
  getUserDetails(): UserDetails;
}

class ConcretePrototype implements Prototype {
  private user: UserDetails;

  constructor(user: UserDetails) {
    this.user = user;
  }

  public clone(): ConcretePrototype {
    // 안에 객체 있으면 딥카피.
    const clone = Object.create(this);
    clone.user = { ...this.user };
    return clone;
  }

  public getUserDetails(): UserDetails {
    return this.user;
  }
}

function clientCode() {
  const p1 = new ConcretePrototype({
    name: "John",
    age: 30,
    email: "john@example.com",
  });
  const p2 = p1.clone();

  if (p1.getUserDetails() === p2.getUserDetails()) {
    console.log("Cloned objects are the same instance.");
  } else {
    console.log("Cloned objects are not the same instance.");
  }
}

clientCode();
