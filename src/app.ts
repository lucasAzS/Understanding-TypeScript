class Departament {
  name: string;

  constructor(n: string) {
    this.name = n;
  }

  decribe(this: Departament) {
    console.log('Departament ' + this.name);
  }
}

const accounting = new Departament('Accounting');
accounting.decribe();

// const accountingCopy = { name: 'wrong name :)', describe: accounting.decribe };

// accountingCopy.describe(); // error
