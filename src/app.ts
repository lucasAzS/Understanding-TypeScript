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
if (v1 instanceof Truck) v1.loadCargo(1000);
// in obj born from a class we can use the instanceof "guard".
