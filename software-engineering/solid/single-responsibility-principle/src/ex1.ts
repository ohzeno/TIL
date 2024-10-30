class User {
  name: string;
  email: string;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}

// 인증 기능 분리
class UserAuthentication {
  user: User;

  constructor(user: User) {
    this.user = user;
  }

  authenticate(password: string): boolean {
    return true;
  }
}

class UserDB {
  saveUser(user: User) {}
}

class EmailService {
  sendWelcomeEmail(user: User) {}
}
