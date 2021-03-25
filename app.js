function add(n1, n2, showResult) {
    if (showResult) {
        console.log(n1 + n2);
    }
    else
        return n1 + n2;
}
// here assigning types make that our code do not compile so that the mistake of adding a string and a number don't return a concatenation
var number1 = 5; // to fix this we simply pass the right type
var number2 = 2.8;
var printResult = true;
//or convert to a number
var result = add(Number(number1), +number2, printResult); // Argument of type 'string' is not assignable to parameter of type 'number'.
