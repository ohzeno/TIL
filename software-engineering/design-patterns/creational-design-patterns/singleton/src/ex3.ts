class Logger {
  private static instance: Logger;

  private constructor() {}

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  public log(message: string): void {
    const timestamp = new Date();
    console.log(`[${timestamp.toLocaleString()}] - ${message}`);
  }
}

// 로거를 직접 참조. 로거를 다른 로거로 교체하려면 앱도 변경해야 함
// 테스트 시에도 로거쪽에서 인스턴스를 테스트용으로 바꿔야 함. 싱글톤 위반.
// 로거를 수정하려고 해도 앱도 수정해야 함
class Application {
  private logger: Logger;

  constructor() {
    this.logger = Logger.getInstance();
  }

  run(): void {
    this.logger.log("Application is starting");
    this.logger.log("Application is shutting down");
  }
}

const app = new Application();
app.run();
