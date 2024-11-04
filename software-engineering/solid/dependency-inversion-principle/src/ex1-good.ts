interface IDatabase {
  save(data: string): void;
}

class MySQLDatabase implements IDatabase {
  save(data: string): void {}
}

class MongoDBDatabase implements IDatabase {
  save(data: string): void {}
}

// 하위 모듈 대신 추상화에 의존
class HighLevelModule {
  private database: IDatabase;

  constructor(database: IDatabase) {
    this.database = database;
  }

  execute(data: string): void {
    this.database.save(data);
  }
}

let mySQLDatabase: IDatabase = new MySQLDatabase();
let highLevelModule1: HighLevelModule = new HighLevelModule(mySQLDatabase);

highLevelModule1.execute("Some Data for MySQL");

let mongoDBDatabase: IDatabase = new MongoDBDatabase();
let highLevelModule2: HighLevelModule = new HighLevelModule(mongoDBDatabase);

highLevelModule2.execute("Some Data for MongoDB");
