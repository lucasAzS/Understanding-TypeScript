function add(n1: number, n2: number) {
  return n1 + n2;
}

function printResult(num: number) {
  console.log('Result: ' + num);
}

printResult(add(1, 2));

let combineValues: (a: number, b: number) => number; // here we say exactly what type of function can be assigned here
combineValues = add;
// combineValues = printResult; // Type '(num: number) => void' is not assignable to type '(a: number, b: number) => number'.
// Type 'void' is not assignable to type 'number'.

// combineValues = 5; // Type 'number' is not assignable to type 'Function'.
console.log(combineValues(3, 2));
