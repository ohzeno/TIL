interface IPrototype {
  clone(): IPrototype;
}

class ComplexObject implements IPrototype {
  constructor(
    public simpleProp: string,
    public complexProp: ComplexSubObject
  ) {}

  clone(): IPrototype {
    // 속성에 인스턴스가 있어서 단순 복사로는 안됨.
    let clone = new ComplexObject(
      this.simpleProp,
      this.complexProp.clone() as ComplexSubObject
    );
    return clone;
  }
}

class ComplexSubObject implements IPrototype {
  someProp: string;

  constructor(someProp: string) {
    this.someProp = someProp;
  }

  clone(): IPrototype {
    let clone = new ComplexSubObject(this.someProp);
    return clone;
  }
}
