import { AbstractComponent } from "../framework/view/abstract-component.js";

function createEditButtonComponentTemplate() {
  return `
      <button class="expense-edit-btn" type="button"> 
        Редактировать
      </button>
    `;
}

export default class EditButtonComponent extends AbstractComponent {
  #handleClick = null;

  constructor({ onEdit }) {
    super();
    this.#handleClick = onEdit;

    this.element.addEventListener("click", this.#clickHandler);
  }
  
  get template() {
    return createEditButtonComponentTemplate();
  }
  
  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  };

  removeElement() {
    this.element.removeEventListener("click", this.#clickHandler);
    super.removeElement();
  }
}