import { AbstractComponent } from "../framework/view/abstract-component.js";

function createDeleteButtonComponentTemplate() {
  return `
   <button>Удалить</button>
  `;
}

export default class DeleteButtonComponent extends AbstractComponent {
  #handleClick = null;
  
  get template() {
    return createDeleteButtonComponentTemplate();
  }
  
  constructor({ onDelete }) {
    super();
    this.#handleClick = onDelete;

    this.element.addEventListener("click", this.#clickHandler);
  }
  
  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  };
}