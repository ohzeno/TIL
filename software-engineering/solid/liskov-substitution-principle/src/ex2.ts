interface PaymentProcessor {
  processPayment(amount: number): void;
}

class CreditCardProcessor implements PaymentProcessor {
  processPayment(amount: number): void {
    console.log(`Processing credit card payment of $${amount}`);
  }
}

class DebitCardProcessor implements PaymentProcessor {
  processPayment(amount: number): void {
    console.log(`Processing debit card payment of $${amount}`);
  }
}

class PayPalProcessor implements PaymentProcessor {
  processPayment(amount: number): void {
    console.log(`Processing PayPal payment of $${amount}`);
  }
}

// 기존 코드 수정 없이 새 유형 추가 가능.
class BitcoinProcessor implements PaymentProcessor {
  processPayment(amount: number): void {
    console.log(`Processing Bitcoin payment of ${amount} BTC`);
  }
}

function executePayment(paymentProcessor: PaymentProcessor, amount: number) {
  paymentProcessor.processPayment(amount);
}

// PaymentProcessor를 하위 타입으로 대체할 수 있음.
const creditCardProcessor = new CreditCardProcessor();
executePayment(creditCardProcessor, 100);

const debitCardProcessor = new DebitCardProcessor();
executePayment(debitCardProcessor, 200);

const payPalProcessor = new PayPalProcessor();
executePayment(payPalProcessor, 300);

const bitcoinProcessor = new BitcoinProcessor();
executePayment(bitcoinProcessor, 2);
