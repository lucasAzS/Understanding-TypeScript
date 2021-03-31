class Departament {
  readonly name: string;
  private employees: string[] = [];

  constructor(n: string) {
    this.name = n;
  }

  decribe(this: Departament) {
    console.log('Departament ' + this.name);
  }

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployInfo() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

const accounting = new Departament('Accounting');

accounting.addEmployee('Lucas');
accounting.addEmployee('Lulu');

accounting.decribe();
// accounting.name = 'other name' // Cannot assign to 'name' because it is a read-only property.
accounting.printEmployInfo();
// const accountingCopy = { name: 'wrong name :)', describe: accounting.decribe };

// accountingCopy.describe(); // error
