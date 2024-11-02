// 기존 Machine 인터페이스를 세분화.
interface Printer {
  print(document: Document): void;
}

interface Scanner {
  scan(document: Document): void;
}

interface FaxMachine {
  fax(document: Document): void;
}

// 사용하지 않는 scan, fax에 의존하지 않음.
class SimplePrinter implements Printer {
  print(document: Document): void {}
}

class MultiFunctionMachine implements Printer, Scanner, FaxMachine {
  print(document: Document): void {}

  scan(document: Document): void {}

  fax(document: Document): void {}
}
