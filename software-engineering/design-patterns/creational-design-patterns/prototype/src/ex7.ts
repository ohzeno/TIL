class UniqueIdObject implements IPrototype {
  constructor(public id: number, public data: string) {}

  clone(): IPrototype {
    // 고유id는 복사하면 안됨
    let clone = new UniqueIdObject(Math.random(), this.data);
    return clone;
  }
}
