function add(n1: number, n2: number, showResult: boolean) {
  if (showResult) {
    console.log(n1 + n2);
  } else return n1 + n2;
}

// here assigning types make that our code do not compile so that the mistake of adding a string and a number don't return a concatenation

const number1 = 5; // to fix this we simply pass the right type
const number2: number = 2.8; // we don't need to specify all types because ts can infere the type
const printResult = true;

//or convert to a number
const result = add(Number(number1), +number2, printResult); // Argument of type 'string' is not assignable to parameter of type 'number'.
