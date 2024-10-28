class BankAccount {
  #balance: number;

  constructor(initialBalance: number) {
    this.#balance = initialBalance;
  }

  public get balance(): number {
    return this.#balance;
  }

  public deposit(amount: number): void {
    if (amount <= 0) {
      console.log("Invalid deposit amount");
      return;
    }
    this.#balance += amount;
  }

  public withdraw(amount: number): void {
    if (amount <= 0) {
      console.log("Invalid withdrawal amount");
      return;
    }
    if (this.#balance - amount < 0) {
      console.log("Insufficient funds");
      return;
    }
    this.#balance -= amount;
  }
}

const myAccount = new BankAccount(1000);
myAccount.deposit(300);
myAccount.withdraw(100);
console.log("Your balance:", myAccount.balance);
