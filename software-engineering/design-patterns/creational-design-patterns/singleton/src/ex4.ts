class Logger {
  private static instance: Logger;

  private constructor() {}

  public static async getInstance(): Promise<Logger> {
    if (!Logger.instance) {
      // 지연 시뮬레이션
      await new Promise((resolve) => setTimeout(resolve, 1000));
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  public log(message: string): void {
    const timestamp = new Date();
    console.log(`[${timestamp.toLocaleString()}] - ${message}`);
  }
}

async function main() {
  const [logger1, logger2] = await Promise.all([
    Logger.getInstance(),
    Logger.getInstance(),
  ]);
  console.log(logger1 === logger2); // false
}

main();
