interface Greetable {
  readonly name: string;

  greet(phrase: string): void;
}

class Person implements Greetable {
  name: string;
  constructor(n: string, public age: number) {
    this.name = n;
  }

  greet(phrase: string) {
    console.log(phrase + '' + this.name);
  }
}

let user1 = new Person('Lulucas', 26);

user1.greet('Hi my name is ');
user1.name = 'roberto'; // the name is not changed bcs is read-only
