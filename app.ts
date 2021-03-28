let userInput: unknown;

let userName: string;

userInput = 5;
userInput = 'Lucas';

// userName = userInput; // Type 'unknown' is not assignable to type 'string'.

if (typeof userInput === 'string') {
  //ts understand that we did a check here so it accepts
  userName = userInput;
  console.log(userName);
}

function generateError(message: string, code: number): never {
  throw { message: message, errorCode: code };
}

generateError('an error occurred', 500);
