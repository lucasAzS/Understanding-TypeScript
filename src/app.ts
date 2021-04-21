function Logger(logString: string) {
  return function (constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}

function withTemplate(template: string, hookId: string) {
  return function (constructor: any) {
    console.log('Redering Template');

    const hookEl = document.getElementById(hookId);
    const p = new constructor();
    if (hookEl) {
      hookEl.innerHTML = template;
      hookEl.querySelector('h1')!.textContent = p.name;
    }
  };
}

@Logger('LOGGIN PERSON')
@withTemplate('<h1> Person Obj</h1>', 'app')
class Person {
  name = 'Lucas';
  constructor() {
    console.log('Creating Person Object...');
  }
}

function Log(target: any, propName: string | symbol) {
  console.log('Prop decorator');
  console.log(target, propName);
}

class Product {
  @Log
  title: string;
  constructor(t: string, private _price: number) {
    this.title = t;
  }
  set price(val: number) {
    if (val < 0) {
      this._price = val;
    }
  }
}
