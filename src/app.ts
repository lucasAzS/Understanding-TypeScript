// Generic Function
// We use generic here to get a better  suport of ts
function merge<T, U>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

const mergedObj1 = merge({ name: 'Lucas' }, { age: 26 });

console.log(mergedObj1.name);
