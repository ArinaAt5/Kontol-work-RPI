import { AbstractComponent } from "../framework/view/abstract-component.js";

function createRasItemTemplate(expense) {
  return `
    <div class="expense-item">
      <div class="expense-info">
        <h3 class="expense-name">${expense.name}</h3>
        <p class="expense-category">Категория: ${expense.category}</p>
        <p class="expense-amount">Сумма: ${expense.amount} руб.</p>
        <p class="expense-date">Дата: ${expense.date}</p>
      </div>
      <div class="expense-actions"></div>
    </div>
  `;
}

export default class RasItemComponent extends AbstractComponent {
  #expense = null;
  #actionsContainer = null;

  constructor({ expense }) {
    super();
    this.#expense = expense;
  }

  get template() {
    return createRasItemTemplate(this.#expense);
  }

  get actionsContainer() {
    if (!this.#actionsContainer) {
      this.#actionsContainer = this.element.querySelector('.expense-actions');
    }
    return this.#actionsContainer;
  }
}