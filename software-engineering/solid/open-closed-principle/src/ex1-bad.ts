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
