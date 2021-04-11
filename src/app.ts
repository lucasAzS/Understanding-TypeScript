class Departament {
  // private id:string
  // private name: string;
  private employees: string[] = [];

  constructor(public readonly name: string, private readonly id: string) {
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

class ITDepartament extends Departament {
  admins: string[]; /* Just to make clear that when using the constructor or use this. in 'child' class we need to use super() */
  constructor(id: string, admins: string[]) {
    super(id, 'IT');
    this.admins = admins;
  }
}

class AccountingDepartament extends Departament {
  constructor(id: string, private reports: string[]) {
    super(id, 'Accounting');
  }
  addReport(text: string) {
    this.reports.push(text);
  }

  printReports() {
    console.log(this.reports);
  }
}

const t1 = new ITDepartament('t1', ['lucas', 'lulu']);
t1.addEmployee('Lucas');
t1.addEmployee('Lulu');

t1.decribe();
// t1.name = 'other name' // Cannot assign to 'name' because it is a read-only property.
t1.printEmployInfo();
// const accountingCopy = { name: 'wrong name :)', describe: accounting.decribe };

// accountingCopy.describe(); // error

console.log(t1);

const accounting = new AccountingDepartament('d2', []);

accounting.addReport('Something happened...');
accounting.printReports();

console.log('The Accounting dep: ', accounting);
