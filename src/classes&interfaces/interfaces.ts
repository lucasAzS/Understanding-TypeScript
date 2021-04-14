interface AddFn {
  (a: number, b: number): number;
}

let add: AddFn;

add = (n1: number, n2: number) => {
  return n1 + n2;
};

interface Named {
  readonly name: string;
  outputName?: string;
  showOutput?: () => void;
}
interface Greetable extends Named {
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
