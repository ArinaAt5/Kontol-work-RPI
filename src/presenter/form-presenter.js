import RasComponent from "../view/ras-component.js";

export default class FormPresenter {
  #formContainer = null;
  #rasModel = null;
  #formComponent = null;

  constructor({ formContainer, rasModel }) {
    this.#formContainer = formContainer;
    this.#rasModel = rasModel;
  }

  init() {
    this.#formComponent = new RasComponent({
      onFormSubmit: this.#handleFormSubmit,
    });

    this.#renderForm();
  }

  #renderForm() {
    this.#formContainer.innerHTML = "";
    this.#formContainer.appendChild(this.#formComponent.element);
  }

  #handleFormSubmit = (expense) => {
    this.#rasModel.addExpense(expense);
  };
}