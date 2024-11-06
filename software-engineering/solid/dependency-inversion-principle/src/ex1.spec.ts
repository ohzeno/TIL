import { HighLevelModule, IDatabase } from "./ex1-good";

// 실제 상황에서는 jest 사용.
class MockDatabase implements IDatabase {
  save(data: string): void {
    console.log("Mocked save method called with data: " + data);
  }
}

let mockDatabase: IDatabase = new MockDatabase();
let highLevelModule: HighLevelModule = new HighLevelModule(mockDatabase);

highLevelModule.execute("Test Data");
