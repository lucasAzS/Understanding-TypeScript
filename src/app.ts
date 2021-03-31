class Departament {
  name: string;

  constructor(n: string) {
    this.name = n;
  }
}

const accounting = new Departament('Accounting');
console.log(accounting);
