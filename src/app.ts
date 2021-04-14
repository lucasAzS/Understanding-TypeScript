interface Greetable {
  name: string;

  greet(phrase: string): void;
}

class Person implements Greetable {
  constructor(public name: string, public age: number) {}

  greet(phrase: string) {
    console.log(phrase + '' + this.name);
  }
}

let user1 = new Person('Lucas', 26);

user1.greet('Hi my name is ');
