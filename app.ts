function add(n1: number, n2: number) {
  return n1 + n2;
}

// here assigning types make that our code do not compile so that the mistake of adding a string and a number don't return a concatenation

const number1 = 5; // to fix this we simply pass the right type
const number2 = 2.8;

//or convert to a number
const result = add(Number(number1), +number2); // Argument of type 'string' is not assignable to parameter of type 'number'.
console.log(result);
