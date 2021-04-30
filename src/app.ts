// DOM Element Selection and OOP Rendering
class ProjectInput {
  //  we must say that the type of this field is a template element
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;

  constructor() {
    // as we know the content of the html file we use ! to tell ts that this will never be null
    this.templateElement = document.getElementById(
      'project-input'
    )! as HTMLTemplateElement;
    // and we need to do a casting because getElementById can return any html element

    this.hostElement = document.getElementById('app')! as HTMLDivElement;

    // above we did select the elements one that is to be rendered in another
    // here we select the content itself
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    // as we know that will be a form element we type as such
    this.element = importedNode.firstElementChild as HTMLFormElement;
    // here we call the fn
    this.attach();
  }

  private attach() {
    this.hostElement.insertAdjacentElement('afterbegin', this.element);
  }
}
// we create a instance and we can see the elements rendered in the page
const projInput = new ProjectInput();
