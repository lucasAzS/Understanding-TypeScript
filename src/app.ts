// Generic Function
// we use generic here to get a better  suport of ts
// Constraints
// with constraints we make sure that our generics have to be of some type
function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

const mergedObj1 = merge({ name: 'Lucas' }, { age: 26 });

console.log(mergedObj1.name);

// Generic Function 2
interface Lengthy {
  length: number;
}
// here we don't care what element is, but he will need to have a length prop
// generics with constraints give us a controlled flexibility
function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  let describeText = 'Got no value';
  if (element.length === 1) {
    describeText = 'Got 1 element';
  } else if (element.length > 1) {
    describeText = 'Got ' + element.length + ' elements';
  }

  return [element, describeText];
}

console.log(countAndDescribe('Hi my name is Lucas'));

// Keyof Constraint
// here we say that one of the params is an obj and the other must be a key of that obj
function extractAndDescribe<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return 'Value ' + obj[key];
}
console.log(extractAndDescribe({ name: 'lucas' }, 'name'));
