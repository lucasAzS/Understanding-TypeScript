type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
  name: 'Lucas',
  privileges: ['shutdown-server'],
  startDate: new Date(),
};

type Combinable = string | number;
type Numeric = number | boolean;
type Universal = Combinable & Numeric; // universal is typed number bcs number intersect both types.

function add(a: Combinable, b: Combinable) {
  // A type "Guard" make sure that we work correctly with our types.
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b;
}

type UnknownEmployee = Employee | Admin;

function printEmployeeInfo(emp: UnknownEmployee) {
  console.log('Name:', emp.name); // This will work bcs both types have a prop 'name'.
  // console.log(emp.privileges);
  // Here we have to use another "Guard" type
  if ('privileges' in emp) {
    console.log('Privileges:', emp.privileges);
  }
  if ('startDate' in emp) {
    console.log('Start Date:', emp.startDate);
  }
}
printEmployeeInfo(e1);

class Car {
  drive() {
    console.log('driving...');
  }
}

class Truck {
  drive() {
    console.log('driving a truck...');
  }

  loadCargo(n: number) {
    console.log('loaded cargo: ' + n);
  }
}

type Vehicle = Car | Truck;

const v1: Vehicle = new Truck();

// here works bcs both have the method drive().
v1.drive();
// for this one we need a Guard type:
// in obj born from a class we can use the instanceof "guard":
if (v1 instanceof Truck) v1.loadCargo(1000);

//Type Discriminator
//When our interfaces have a field that is similar but not the same we use a type 'discriminator':
interface Bird {
  //We put a type prop in our interface and give it a string value:
  type: 'bird';
  flyingSpeed: number;
}

interface Horse {
  type: 'horse';
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  let speed;
  switch (animal.type) {
    case 'bird':
      speed = animal.flyingSpeed;
      break;
    case 'horse':
      speed = animal.runningSpeed;
      break;
    default:
      break;
  }
  console.log('moving at speed:' + speed);
}

// Type casting
// we select the element here:
const input = document.getElementById('user-input') as HTMLInputElement;
//but as we getElementById we receive a generic type called HTMLElement
//HTMLElement represents any html element so we don't have access to input methods
// for that we need to cast the type using "as" + the type that we want
// so now we have the input's methods
input.value = 'Hi there!!';

// Index Props
// When we need to create a flexible object
interface ErrorsContainer {
  // here we say that the props of the obj need to have the value string
  // id: string //We can add some pre determined fields and how more we need, but the values must be strings
  [prop: string]: string;
}

const errorBag: ErrorsContainer = {
  email: 'Not a Valid email',
  username: 'Must have 3 characters',
  //id: 1 // not valid
  1: 'This is ok, bcs we can convert 1 to "1"',
};
console.log(errorBag.email);
