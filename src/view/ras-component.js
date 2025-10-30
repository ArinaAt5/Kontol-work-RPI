import { AbstractComponent } from "../framework/view/abstract-component.js";

function createRasComponentTemplate() {
  return `
    <form id="expense-form">
      <input type="text" id="expense-name" placeholder="Наименование расхода" required>
      <input type="number" id="expense-amount" placeholder="Стоимость" required min="1">
      <select id="expense-category" required>
        <option value="">Выбрать категорию</option>
        <option value="Еда">Еда</option>
        <option value="Транспорт">Транспорт</option>
        <option value="Развлечения">Развлечения</option>
        <option value="Другое">Другое</option>
      </select>
      <button type="submit">Добавить расходы</button>
    </form>`;
}

export default class RasComponent extends AbstractComponent {
  #handleFormSubmit = null;

  constructor({ onFormSubmit }) {
    super();
    this.#handleFormSubmit = onFormSubmit;

    this.element.addEventListener("submit", this.#formSubmitHandler);
  }

  get template() {
    return createRasComponentTemplate();
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    
    const expense = {
      name: this.element.querySelector("#expense-name").value,
      amount: parseInt(this.element.querySelector("#expense-amount").value),
      category: this.element.querySelector("#expense-category").value,
      date: new Date().toISOString().split('T')[0]
    };

    this.#handleFormSubmit(expense);
    this.#clearForm();
  };

  #clearForm() {
    this.element.querySelector("#expense-form").reset();
  }
}