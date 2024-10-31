// 좋은 예
interface Customer {
  giveDiscount(): number;
}

class RegularCustomer implements Customer {
  giveDiscount(): number {
    return 10;
  }
}

// 고객 유형을 추가할 때 Discount 클래스를 수정할 필요가 없다.
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
