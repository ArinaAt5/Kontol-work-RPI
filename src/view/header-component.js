import { AbstractComponent } from "../framework/view/abstract-component.js";

function createHeaderComponentTemplate() {
  return `<h1>Учет расходов</h1>`;
}

export default class HeaderComponent extends AbstractComponent {
  get template() {
    return createHeaderComponentTemplate();
  }
}