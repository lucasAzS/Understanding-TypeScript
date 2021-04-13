class Departament {
  static fiscalYear = 2021;
  // private id:string
  // private name: string;
  protected employees: string[] = [];

  constructor(public readonly name: string, private readonly id: string) {
    // short init
    // this.id = id;
    // this.name = n;
  }

  static createEmployee(name: string) {
    return { name };
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

const employee1 = Departament.createEmployee('Max');
console.log(employee1, Departament.fiscalYear);

class ITDepartament extends Departament {
  admins: string[]; /* Just to make clear that when using the constructor or use this. in 'child' class we need to use super() */
  constructor(id: string, admins: string[]) {
    super(id, 'IT');
    this.admins = admins;
  }
}

class AccountingDepartament extends Departament {
  private lastReport: string;
  constructor(id: string, private reports: string[]) {
    super(id, 'Accounting');
    this.lastReport = reports[0];
  }

  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error('No report found.');
  }

  set mostRecentReport(value: string) {
    if (!value) throw new Error('Please pass in a valid value');
    this.addReport(value);
  }

  addEmployee(name: string) {
    if (name === 'Lucas') {
      return console.log('this unit is already ours');
    }
    this.employees.push(name);
  }

  addReport(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }

  printReports() {
    console.log(this.reports);
  }
}

const t1 = new ITDepartament('t1', ['Lucas', 'Lulu']);
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
accounting.mostRecentReport = 'Year end report';
console.log(accounting.mostRecentReport);

accounting.printReports();

accounting.addEmployee('Lucas');

console.log('The Accounting dep: ', accounting);
