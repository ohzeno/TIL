// 안좋은 예
class Discount {
  // 새로 유형을 추가하려면 giveDiscount 메서드를 수정해야 한다.
  giveDiscount(customerType: string): number {
    if (customerType === "Regular") {
      return 10;
    } else if (customerType === "Premium") {
      return 20;
    }
  }
}
// 좋은 예
interface Customer {
  giveDiscount(): number;
}

class RegularCustomer implements Customer {
  giveDiscount(): number {
    return 10;
  }
}

class PremiumCustomer implements Customer {
  giveDiscount(): number {
    return 20;
  }
}

class Discount {
  giveDiscount(customer: Customer): number {
    return customer.giveDiscount();
  }
}
