// print만 있는 새 기능 추가하고 싶어도 scan, fax까지 구현해야 함.
interface Machine {
  print(document: Document): void;

  scan(document: Document): void;

  fax(document: Document): void;
}

class MultiFunctionPrinter implements Machine {
  print(document: Document): void {}

  scan(document: Document): void {}

  fax(document: Document): void {}
}
