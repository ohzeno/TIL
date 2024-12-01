class CyclicalReferenceObject implements IPrototype {
  public selfReference: CyclicalReferenceObject | null = null;

  constructor(public data: string) {}

  clone(): IPrototype {
    let clone = new CyclicalReferenceObject(this.data);
    // 단순하게 복사하면 순환 참조로 무한 루프 발생.
    if (this.selfReference) {
      clone.selfReference =
        this.selfReference.clone() as CyclicalReferenceObject;
    }
    return clone;
  }
}

let A = new CyclicalReferenceObject("A");
let B = new CyclicalReferenceObject("B");
A.selfReference = B;
B.selfReference = A;

let clonedA = A.clone() as CyclicalReferenceObject;

/* 
A.clone 내부에서 C생성.
C.selfReference = this(A).selfReference(B).clone() 실행
B.clone 내부에서 D생성.
D.selfReference = this(B).selfReference(A).clone() 실행
A.clone 내부에서 E생성.
E.selfReference = this(A).selfReference(B).clone() 실행
...
*/
