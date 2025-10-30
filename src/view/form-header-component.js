import { AbstractComponent } from "../framework/view/abstract-component.js";

function createFormHeaderComponentTemplate() {
  return `<h2>Добавить расходы</h2>`;
}

export default class FormHeaderComponent extends AbstractComponent {
  get template() {
    return createFormHeaderComponentTemplate();
  }
}