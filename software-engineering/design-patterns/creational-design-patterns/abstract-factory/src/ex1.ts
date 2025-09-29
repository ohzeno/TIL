interface IProductA {
  operationA(): string;
}

interface IProductB {
  operationB(): string;

  combinedOperation(collaborator: IProductA): string;
}

// 두 타입의 제품을 생산할 수 있는 추상 팩토리 인터페이스
interface IFactory {
  createProductA(): IProductA;

  createProductB(): IProductB;
}

class ProductA implements IProductA {
  public operationA(): string {
    return "The result of the operation A1.";
  }
}

class ProductB implements IProductB {
  public operationB(): string {
    return "The result of the operation B1.";
  }

  public combinedOperation(collaborator: IProductA): string {
    const result = collaborator.operationA();
    return `The result of the B1 collaborating with the (${result})`;
  }
}

// 특정 제품군의 구체 제품들을 생성하는 구체 팩토리 클래스
class Factory1 implements IFactory {
  public createProductA(): IProductA {
    return new ProductA();
  }

  public createProductB(): IProductB {
    return new ProductB();
  }
}

function clientCode(factory: IFactory) {
  const productA = factory.createProductA();
  const productB = factory.createProductB();

  console.log(productB.operationB());
  console.log(productB.combinedOperation(productA));
}

console.log("Client: Testing client code with the factory...");
clientCode(new Factory1());
