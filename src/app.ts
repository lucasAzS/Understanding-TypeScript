interface Person {
  name: string;
  age: number;

  greet(phrase: string): void;
}

let user1: Person = {
  name: 'Lucas',
  age: 26,

  greet(phrase: string) {
    console.log(phrase + '' + this.name);
  },
};

user1.greet('Hi my name is ');
