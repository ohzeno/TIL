interface INotification {
  send(message: string): void;
}

class EmailNotification implements INotification {
  send(message: string): void {
    console.log(`Sending Email with message: "${message}"`);
  }
}

class SMSNotification implements INotification {
  send(message: string): void {
    console.log(`Sending SMS with message: "${message}"`);
  }
}

class PushNotification implements INotification {
  send(message: string): void {
    console.log(`Sending Push INotification with message: "${message}"`);
  }
}

abstract class NotificationSender {
  abstract createNotification(): INotification;

  send(message: string): void {
    const notification = this.createNotification();
    notification.send(message);
  }
}

class EmailSender extends NotificationSender {
  createNotification(): INotification {
    return new EmailNotification();
  }
}

class SMSSender extends NotificationSender {
  createNotification(): INotification {
    return new SMSNotification();
  }
}

class PushSender extends NotificationSender {
  createNotification(): INotification {
    return new PushNotification();
  }
}

const emailSender: NotificationSender = new EmailSender();
emailSender.send("Hello, this is email notification!");

const smsSender: NotificationSender = new SMSSender();
smsSender.send("Hello, this is SMS notification!");

const pushSender: NotificationSender = new PushSender();
pushSender.send("Hello, this is Push notification!");
