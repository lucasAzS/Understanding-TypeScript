class Departament {
  // private id:string
  // private name: string;
  private employees: string[] = [];

  constructor(public name: string, private id: string) {
    // short init
    // this.id = id;
    // this.name = n;
  }

  decribe(this: Departament) {
    console.log(`Department (${this.id}) : ${this.name}`);
  }

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployInfo() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

const accounting = new Departament('d1', 'Accounting');

accounting.addEmployee('Lucas');
accounting.addEmployee('Lulu');

accounting.decribe();
// accounting.name = 'other name' // Cannot assign to 'name' because it is a read-only property.
accounting.printEmployInfo();
// const accountingCopy = { name: 'wrong name :)', describe: accounting.decribe };

// accountingCopy.describe(); // error
