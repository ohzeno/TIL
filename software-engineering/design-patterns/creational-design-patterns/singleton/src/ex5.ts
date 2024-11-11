class Logger {
  private static instance: Logger;

  // 생성자가 private이라 상속 불가
  private constructor() {}

  // 상속해도 부모 인스턴스를 반환. 오버라이딩 하면 싱글톤 원칙 위반.
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

// 싱글톤은 상속과 개념적으로 충돌함
class FileLogger extends Logger {
  public log(message: string): void {
    const timestamp = new Date();
    this.writeToFile(`[${timestamp.toLocaleString()}] - ${message}`);
  }

  private writeToFile(message: string): void {}
}

const logger = FileLogger.getInstance();
logger.log("테스트");
