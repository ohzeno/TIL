interface Customer {
  giveDiscount(): number;

  addLoyaltyPoints(amountSpent: number): number;
}

class RegularCustomer implements Customer {
  giveDiscount(): number {
    return 10;
  }

  addLoyaltyPoints(amountSpent: number): number {
    return amountSpent;
  }
}

class PremiumCustomer implements Customer {
  giveDiscount(): number {
    return 20;
  }

  addLoyaltyPoints(amountSpent: number): number {
    return 3 * amountSpent;
  }
}

class GoldCustomer implements Customer {
  giveDiscount(): number {
    return 30;
  }

  addLoyaltyPoints(amountSpent: number): number {
    return 5 * amountSpent;
  }
}

class VIPCustomer implements Customer {
  giveDiscount(): number {
    return 50;
  }

  addLoyaltyPoints(amountSpent: number): number {
    return 10 * amountSpent;
  }
}

class Discount {
  giveDiscount(customer: Customer): number {
    return customer.giveDiscount();
  }
}

class LoyaltyProgram {
  addPoints(customer: Customer, amountSpent: number): number {
    return customer.addLoyaltyPoints(amountSpent);
  }
}
