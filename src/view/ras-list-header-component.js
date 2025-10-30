import { createElement } from "../framework/render.js";
import { AbstractComponent } from "../framework/view/abstract-component.js";

function createRasListHeaderComponentTemplate() {
  return `<h2>Список расходов</h2>`;
}

export default class RasListHeaderComponent extends AbstractComponent {
  get template() {
    return createRasListHeaderComponentTemplate();
  }
}