interface IDatabaseRecordPrototype {
  clone(): IDatabaseRecordPrototype;

  getDataFromDatabase(id: number): any;
}

class DatabaseRecord implements IDatabaseRecordPrototype {
  data: any;

  constructor(id: number) {
    this.data = this.getDataFromDatabase(id);
  }

  // 생성자에 쿼리가 포함되어 비효율적
  clone(): IDatabaseRecordPrototype {
    let clone = new DatabaseRecord(this.data.id);
    return clone;
  }

  getDataFromDatabase(id: number): any {
    console.log(`Querying database for record with id ${id}`);
    return { id: id, value: "Some data" };
  }
}

let original = new DatabaseRecord(1);
let clone: DatabaseRecord = original.clone() as DatabaseRecord;
