import { createElement } from '../render.js';

export class AbstractComponent {
  #element = null;

  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error('Cannot instantiate AbstractComponent directly');
    }
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  get template() {
    throw new Error('Template method must be implemented');
  }

  removeElement() {
    this.#element = null;
  }
}