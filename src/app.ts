//Project Type
enum ProjectStatus {
  Active,
  Finished,
}
class Project {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public people: number,
    public status: ProjectStatus
  ) {}
}

//Project State Management
type Listener = (items: Project[]) => void;
class ProjectState {
  private listeners: Listener[] = [];
  private projects: Project[] = [];
  private static instance: ProjectState;

  private constructor() {}

  static getInstance() {
    // here we use the singleton obj that will be created one time and be always returned
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }

  addListener(listenerFn: Listener) {
    this.listeners.push(listenerFn);
  }

  addProject(title: string, desc: string, numOfPop: number) {
    const newProject = new Project(
      Math.random().toString(),
      title,
      desc,
      numOfPop,
      ProjectStatus.Active
    );
    this.projects.push(newProject);
    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice());
    }
  }
}

const projectState = ProjectState.getInstance();

// Creating a Re-Usable validation

// a interface of an obj that can be validated
interface Validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}
// our function to validate
function validate(validatableInput: Validatable) {
  // in the beggining we set to true but after any value that is false we change it
  let isValid = true;
  // we check if the field is required
  if (validatableInput.required) {
    // isValid && will make sure that if the second value is false itself will became false
    isValid = isValid && validatableInput.value.toString().trim().length !== 0;
  }
  // here we check if it is a string and it is not empty
  if (
    typeof validatableInput.value === 'string' &&
    validatableInput.minLength != null
  ) {
    isValid =
      isValid && validatableInput.value.length > validatableInput.minLength;
  }
  if (
    typeof validatableInput.value === 'string' &&
    validatableInput.maxLength != null
  ) {
    isValid =
      isValid && validatableInput.value.length < validatableInput.maxLength;
  }
  // here we check if is not empty and it is a number
  if (
    validatableInput.min != null &&
    typeof validatableInput.value === 'number'
  ) {
    // we check if it is lower that the min value
    isValid = isValid && validatableInput.value > validatableInput.min;
  }

  if (
    validatableInput.max != null &&
    typeof validatableInput.value === 'number'
  ) {
    // we check if it is bigger than the max value
    isValid = isValid && validatableInput.value <= validatableInput.max;
  }
  return isValid;
}

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

//Project List rendering

class ProjectList {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLElement;
  assignedProj: Project[];

  constructor(private type: 'active' | 'finished') {
    //we copy the constructor of the other class and make a fell changes
    this.templateElement = document.getElementById(
      'project-list'
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById('app')! as HTMLDivElement;
    this.assignedProj = [];

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as HTMLElement;
    this.element.id = `${this.type}-projects`; //here the id is a little dinamic

    projectState.addListener((projects: Project[]) => {
      const relevantProjects = projects.filter((prj) => {
        if (this.type === 'active') {
          return prj.status === ProjectStatus.Active;
        }
        return prj.status === ProjectStatus.Finished;
      });
      this.assignedProj = relevantProjects;
      this.renderProjects();
    });

    this.attach();
    this.renderContent();
  }
  private renderProjects() {
    const listEl = document.getElementById(
      `${this.type}-projects-list`
    )! as HTMLUListElement;
    for (const projItem of this.assignedProj) {
      const listItem = document.createElement('li');
      listItem.textContent = projItem.title;
      listEl?.appendChild(listItem);
    }
  }
  private renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector('ul')!.id = listId;
    this.element.querySelector('h2')!.textContent =
      this.type.toLocaleUpperCase() + ' PROJECTS';
  }

  private attach() {
    this.hostElement.insertAdjacentElement('beforeend', this.element);
  }
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

    //here we create the obj's that will be validated
    const titleValidatable: Validatable = {
      value: enteredTitle,
      required: true,
    };
    const descValidatable: Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5,
    };
    const popValidatable: Validatable = {
      value: +enteredPeople,
      required: true,
      min: 1,
      max: 5,
    };

    // now we use a better validation
    if (
      !validate(titleValidatable) ||
      !validate(descValidatable) ||
      !validate(popValidatable)
    ) {
      alert('Invalid input, please try again');
      return;
    }
    //returning our values as an array of const
    return [enteredTitle, enteredDescription, +enteredPeople];
  }

  // clearing the inputs after are submitted
  private clearInputs() {
    this.titleInputElement.value = '';
    this.descriptionInputElement.value = '';
    this.peopleInputElement.value = '';
  }

  @autobind // here we apply the decorator and don't need to use the bind in the listener
  private submitHandler(event: Event) {
    event.preventDefault();

    // we store the values returned from the getUserInput fn
    const userInput = this.getUserInput();
    // a js validation to se if user input is an array
    if (Array.isArray(userInput)) {
      const [title, desc, people] = userInput;
      // here we pass the values of the inputs for our global state
      projectState.addProject(title, desc, people);
      this.clearInputs();
    }
  }

  private configure() {
    // adding a listener for the submission of the form
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
const activePrjList = new ProjectList('active');
const finishedPrjList = new ProjectList('finished');
