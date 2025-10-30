import { AbstractComponent } from "../framework/view/abstract-component.js";

function createEditRasComponentTemplate(expense) {
  return `
    <div class="modal-overlay">
      <div class="modal-content">
        <h2>Редактировать расход</h2>
        <form class="edit-form">
          <div class="form-group">
            <label for="edit-name">Наименование расхода:</label>
            <input 
              type="text" 
              id="edit-name" 
              value="${expense.name}" 
              required
            >
          </div>
          
          <div class="form-group">
            <label for="edit-amount">Стоимость:</label>
            <input 
              type="number" 
              id="edit-amount" 
              value="${expense.amount}" 
              min="1"
              required
            >
          </div>
          
          <div class="form-group">
            <label for="edit-category">Категория:</label>
            <select id="edit-category" required>
              <option value="">Выбрать категорию</option>
              <option value="Еда" ${
                expense.category === "Еда" ? "selected" : ""
              }>Еда</option>
              <option value="Транспорт" ${
                expense.category === "Транспорт" ? "selected" : ""
              }>Транспорт</option>
              <option value="Развлечения" ${
                expense.category === "Развлечения" ? "selected" : ""
              }>Развлечения</option>
              <option value="Другое" ${
                expense.category === "Другое" ? "selected" : ""
              }>Другое</option>
            </select>
          </div>
          
          <div class="form-actions">
            <button type="submit" class="save-btn">Сохранить</button>
            <button type="button" class="cancel-btn">Отмена</button>
          </div>
        </form>
      </div>
    </div>
  `;
}

export default class EditRasModalComponent extends AbstractComponent {
  #expense = null;
  #handleSave = null;
  #handleCancel = null;

  constructor({ expense, onSave, onCancel }) {
    super();
    this.#expense = expense;
    this.#handleSave = onSave;
    this.#handleCancel = onCancel;

    this.element.addEventListener("click", this.#overlayClickHandler);
    this.element
      .querySelector(".edit-form")
      .addEventListener("submit", this.#formSubmitHandler);
    this.element
      .querySelector(".cancel-btn")
      .addEventListener("click", this.#cancelHandler);
  }

  get template() {
    return createEditRasComponentTemplate(this.#expense);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();

    const updatedExpense = {
      name: this.element.querySelector("#edit-name").value,
      amount: parseInt(this.element.querySelector("#edit-amount").value),
      category: this.element.querySelector("#edit-category").value,
    };

    this.#handleSave(this.#expense.id, updatedExpense);
    // Добавляем автоматическое закрытие после сохранения
    this.#handleCancel();
  };

  #cancelHandler = () => {
    this.#handleCancel();
  };

  #overlayClickHandler = (evt) => {
    if (evt.target.classList.contains("modal-overlay")) {
      this.#handleCancel();
    }
  };

  removeElement() {
    this.element.removeEventListener("click", this.#overlayClickHandler);
    const form = this.element.querySelector(".edit-form");
    if (form) {
      form.removeEventListener("submit", this.#formSubmitHandler);
    }
    const cancelBtn = this.element.querySelector(".cancel-btn");
    if (cancelBtn) {
      cancelBtn.removeEventListener("click", this.#cancelHandler);
    }
    super.removeElement();
  }
}