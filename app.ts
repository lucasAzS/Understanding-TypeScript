const person = {
  name: 'Lucas',
  age: 30,
  hobbies: ['Sports', 'Music', 'Cooking'], // in ts an array have a type in this case string[] meaning that is an array of strings
  // is best practice to not mix types in one array but we can do it with any[]
};

console.log(person);

for (const hobby of person.hobbies) {
  console.log(hobby.toUpperCase()); // here we have a great auto completion because the ts compiler knows that every hobby is a string.

  // console.log(hobby.map()); // Property 'map' does not exist on type 'string'.
}
