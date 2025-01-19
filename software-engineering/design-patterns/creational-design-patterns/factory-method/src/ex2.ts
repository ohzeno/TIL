abstract class PaymentProcessor {
  constructor(public amount: number) {}

  abstract processPayment(): void;
}

class PaypalProcessor extends PaymentProcessor {
  processPayment() {
    console.log(`Processing PayPal payment of $${this.amount}`);
  }
}

class StripeProcessor extends PaymentProcessor {
  processPayment() {
    console.log(`Processing Stripe payment of $${this.amount}`);
  }
}

class BankTransferProcessor extends PaymentProcessor {
  processPayment() {
    console.log(`Processing Bank Transfer payment of $${this.amount}`);
  }
}

// 이것도 단순 팩토리
class PaymentProcessorFactory {
  public createProcessor(type: string, amount: number): PaymentProcessor {
    switch (type) {
      case "Paypal":
        return new PaypalProcessor(amount);
      case "Stripe":
        return new StripeProcessor(amount);
      case "BankTransfer":
        return new BankTransferProcessor(amount);
      default:
        throw new Error("Invalid payment processor type");
    }
  }
}

const paymentProcessorFactory = new PaymentProcessorFactory();

const paypalProcessor = paymentProcessorFactory.createProcessor("Paypal", 100);
paypalProcessor.processPayment();
// Outputs: Processing PayPal payment of $100

const stripeProcessor = paymentProcessorFactory.createProcessor("Stripe", 200);
stripeProcessor.processPayment();
// Outputs: Processing Stripe payment of $200

const bankTransferProcessor = paymentProcessorFactory.createProcessor(
  "BankTransfer",
  300
);
bankTransferProcessor.processPayment();
// Outputs: Processing Bank Transfer payment of $300
