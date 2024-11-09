describe("Logger", () => {
  // 각 테스트마다 로거 공유돼서 테스트 간 영향을 줄 수 있음
  it("should log messages", () => {
    const logger = Logger.getInstance();
    const spy = jest.spyOn(console, "log");
    logger.log("Test message");
    expect(spy).toHaveBeenCalledWith("[<timestamp>] - Test message");
  });

  it("should log different messages", () => {
    const logger = Logger.getInstance();
    const spy = jest.spyOn(console, "log");
    logger.log("Another test message");
    expect(spy).toHaveBeenCalledWith("[<timestamp>] - Another test message");
  });
});
