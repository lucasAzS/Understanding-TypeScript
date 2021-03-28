enum RoleEnum {
  ADMIN,
  READ_ONLY,
  AUTHOR,
}

const person = {
  name: 'Lucas',
  age: 30,
  hobbies: ['Sports', 'Music', 'Cooking'],
  role: RoleEnum.ADMIN,
};

console.log(person);

for (const hobby of person.hobbies) {
  console.log(hobby.toUpperCase());
}

if (person.role === RoleEnum.ADMIN) {
  console.log('is an admin');
}
