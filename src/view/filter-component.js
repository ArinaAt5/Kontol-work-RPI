import { AbstractComponent } from "../framework/view/abstract-component.js";

function createFilterComponentTemplate() {
  return `
    <div class="filter-controls">
      <select id="category-filter">
        <option value="Все">Все</option>
        <option value="Еда">Еда</option>
        <option value="Транспорт">Транспорт</option>
        <option value="Развлечения">Развлечения</option>
        <option value="Другое">Другое</option>
      </select>
      <label>
        <input type="checkbox" id="amount-filter">
        Показывать расходы более 5000
      </label>
    </div>`;
}

export default class FilterComponent extends AbstractComponent {
  get template() {
    return createFilterComponentTemplate();
  }
}