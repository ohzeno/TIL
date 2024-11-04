class MySQLDatabase {
  save(data: string): void {}
}

// 상위 모듈이 하위 모듈에 의존하고 있음
class HighLevelModule {
  private database: MySQLDatabase;

  constructor() {
    this.database = new MySQLDatabase();
  }

  execute(data: string): void {
    this.database.save(data);
  }
}
