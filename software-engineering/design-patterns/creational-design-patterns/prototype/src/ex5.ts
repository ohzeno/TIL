interface IPrototype {
  clone(): IPrototype;
}

class DatabaseData implements IPrototype {
  constructor(private data: any) {}

  clone(): IPrototype {
    // data 공유
    let clone = new DatabaseData(this.data);
    return clone;
  }
}

class DatabaseRecord {
  data: DatabaseData;

  constructor(id: number) {
    // getDataFromDatabase를 비용 많이 드는 작업이라고 가정
    this.data = this.getDataFromDatabase(id) as DatabaseData;
  }

  getDataFromDatabase(id: number): IPrototype {
    console.log(`Querying database for record with id ${id}`);
    return new DatabaseData({ id, value: "Some data" });
  }
}

let original = new DatabaseRecord(1);
let clonedData: DatabaseData = original.data.clone() as DatabaseData;

console.log(clonedData);
