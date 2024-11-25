let original = {
  name: "John",
  address: {
    street: "123 Main St",
    city: "New York",
  },
};

// json 호환 객체 딥카피
let deepCopy = JSON.parse(JSON.stringify(original));

// json호환 아닌 경우도 대응 가능
let deepCopy2 = structuredClone(original);

deepCopy2.address.city = "Los Angeles";

// 원본은 변하지 않음
console.log(original.address.city);
console.log(deepCopy2.address.city);
