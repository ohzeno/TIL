class Singleton {
  // 전역 접근을 위해 static
  private static instance: Singleton;

  // 외부 생성을 막기 위해 private
  private constructor() {}

  // 마찬가지로 전역 접근을 위해 static
  public static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }

  public someMethod(): void {
    console.log("Hello, I am a singleton!");
  }
}

const instance1 = Singleton.getInstance();
const instance2 = Singleton.getInstance();

instance1.someMethod();
instance2.someMethod();
console.log(instance1 === instance2); // true
