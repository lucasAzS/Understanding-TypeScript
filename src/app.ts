// Generic Function
// we use generic here to get a better  suport of ts
// Constraints
// with constraints we make sure that our generics have to be of some type
function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

const mergedObj1 = merge({ name: 'Lucas' }, { age: 26 });

console.log(mergedObj1.name);
