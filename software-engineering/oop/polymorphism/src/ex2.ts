// 제네릭 사용으로 다양한 타입을 일관된 방식으로 다룰 수 있음.
function identity<T>(value: T): T {
  return value;
}

const numIdentity: number = identity<number>(42);
const strIdentity: string = identity<string>("Hello");

console.log(`Number identity: ${numIdentity}`);
console.log(`String identity: ${strIdentity}`);

class Pair<T> {
  constructor(public first: T, public second: T) {}

  swap(): void {
    const tmp = this.first;
    this.first = this.second;
    this.second = tmp;
  }
}

const numPair: Pair<number> = new Pair(1, 2);
const strPair: Pair<string> = new Pair("Alice", "Bob");

numPair.swap();
strPair.swap();

console.log(`Number pair after swap: (${numPair.first}, ${numPair.second})`);
console.log(`String pair after swap: (${strPair.first}, ${strPair.second})`);
