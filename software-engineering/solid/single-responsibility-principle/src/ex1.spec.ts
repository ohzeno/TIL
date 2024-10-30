import { User, UserDB, EmailService } from "./ex1";

describe("User", () => {
  let user;

  beforeEach(() => {
    user = new User("John", "john@example.com");
  });

  describe("Database Operations", () => {
    it("should save user to the database", () => {
      const userDB = new UserDB();
      // save 테스트 구현
    });
  });

  describe("Email Operations", () => {
    it("should send a welcome email to the user", () => {
      const emailService = new EmailService();
      // 이메일 전송 테스트 구현
    });
  });
});
