// Autobind Decorator
// a method decorator takes 3 parameters the target, the methodName and the descriptor of the method that will be applied
function autobind(
  target: any,
  methodName: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  // we replace the original descriptor with one that has a get function that autobind the this keyword to the original method that the decorator will be applied
  const newDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return newDescriptor;
}

// DOM Element Selection and OOP Rendering
class ProjectInput {
  //  we must say that the type of this field is a template element
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;

  // Interacting with DOM elements
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    // as we know the content of the html file we use ! to tell ts that this will never be null
    this.templateElement = document.getElementById(
      'project-input'
    )! as HTMLTemplateElement;
    // and we need to do a casting because getElementById can return any html element

    this.hostElement = document.getElementById('app')! as HTMLDivElement;

    // above we did select the element that is to be rendered in another
    // here we select the content itself
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    // as we know that will be a form element we type as such
    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.element.id = 'user-input'; // we add an id to style the form

    // here we are catching the inputs that we have in our form
    this.titleInputElement = this.element.querySelector(
      '#title'
    ) as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      '#description'
    ) as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      '#people'
    ) as HTMLInputElement;

    // here we call the fns
    this.configure();
    this.attach();
  }

  // Fetching user input
  // using a tuple to return exactly an array with three values
  private getUserInput(): [string, string, number] | void {
    //storing the values of our inputs
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;
    // simply validation if is not empty
    if (
      enteredTitle.trim().length === 0 ||
      enteredDescription.trim().length === 0 ||
      enteredPeople.trim().length === 0
    ) {
      alert('Invalid input, please try again');
      return;
    }
    //returning our values as an array of const
    return [enteredTitle, enteredDescription, +enteredPeople];
  }

  @autobind // here we apply the decorator and don't need to use the bind in the listener
  private submitHandler(event: Event) {
    event.preventDefault();

    // we store the values returned from the getUserInput fn
    const userInput = this.getUserInput();
    // a js validation to se if user input is an array
    if (Array.isArray(userInput)) {
      const [title, desc, people] = userInput;
      console.log(title, desc, people);
    }
  }

  private configure() {
    // adding an listener for the submission of the form
    // we have to make a bind for the this or use our autobind decorator
    this.element.addEventListener('submit', this.submitHandler);
  }

  private attach() {
    // we insert the content in the host element
    this.hostElement.insertAdjacentElement('afterbegin', this.element);
  }
}
// we create a instance and we can see the elements rendered in the page
const projInput = new ProjectInput();
