// map
const arr = [1, 2, 3];
const newArr = arr.map((item) => item * 2);

function map<T, U>(arr: T[], fn: (item: T) => U): U[] {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    result[i] = fn(arr[i]);
  }
  return result;
}

map(arr, (item) => item * 2);
map(["a", "b", "c"], (item) => parseInt(item));

// forEach
const arr2 = [1, 2, 3];
arr2.forEach((item) => console.log(item));

function forEach<T>(arr: T[], fn: (item: T) => void): void {
  for (let i = 0; i < arr.length; i++) {
    fn(arr[i]);
  }
}

forEach(arr2, (item) => console.log(item.toFixed()));
forEach(["a", "b", "c"], (item) => console.log(item));
forEach(["a", 1, false], (item) => console.log(item));
