import { AbstractComponent } from "../framework/view/abstract-component.js";

function createRasListComponentTemplate() {
  return `<ul id="expense-list"></ul>`;
}

export default class RasListComponent extends AbstractComponent {
  get template() {
    return createRasListComponentTemplate();
  }
}