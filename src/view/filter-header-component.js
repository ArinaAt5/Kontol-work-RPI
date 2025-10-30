import { AbstractComponent } from "../framework/view/abstract-component.js";

function createFilterHeaderComponentTemplate() {
  return `<h2>Фильтровать</h2>`;
}

export default class FilterHeaderComponent extends AbstractComponent {
  get template() {
    return createFilterHeaderComponentTemplate();
  }
}
