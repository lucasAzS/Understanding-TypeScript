const person = {
  name: 'Lucas',
  age: 30,
};
// if we try  to access some properties that don't exist we get an error and don't compile
console.log(person.nickname); // Property 'nickname' does not exist on type '{ name: string; age: number; }'.
