export default class ExpenseListView {
  constructor() {
    this.container = document.querySelector(".expense-list");
  }
  getCategoryLabel(category) {
  const map = {
    Food: "Еда",
    Transport: "Транспорт",
    Entertainment: "Развлечения",
    Other: "Другое",
  };
  return map[category] || category;
}


  render(expenses) {
    this.container.innerHTML = `
      <h2>Список расходов</h2>
      <ul id="expense-list">
        ${expenses
          .map(
            (e) => `
          <li data-id="${e.id}">
            <div class="row">
              <div class="info">
                <strong>${e.name}</strong> — ${e.amount}₽ 
                <em>(${this.getCategoryLabel(e.category)})</em>

              </div>
              <div class="actions">
                <button class="edit-btn">Редактировать</button>
                <button class="delete-btn">Удалить</button>
              </div>
            </div>
          </li>
        `
          )
          .join("")}
      </ul>
    `;
  }

  showEditForm(expense) {
    const li = this.container.querySelector(`li[data-id="${expense.id}"]`);
    if (!li) return;
    li.innerHTML = `
      <form class="edit-form">
        <div style="display:flex; gap:8px; flex-wrap:wrap; align-items:center;">
          <label>Название:
            <input type="text" name="name" value="${expense.name}" required />
          </label>
          <label>Сумма:
            <input type="number" name="amount" value="${expense.amount}" required />
          </label>
          <label>Категория:
            <select name="category" required>
              <option value="Еда" ${expense.category === "Еда" ? "selected" : ""}>Еда</option>
              <option value="Транспорт" ${expense.category === "Транспорт" ? "selected" : ""}>Транспорт</option>
              <option value="Равлечения" ${expense.category === "Развлечения" ? "selected" : ""}>Развлечения </option>
              <option value="Другое" ${expense.category === "Другое" ? "selected" : ""}>Другое</option>
            </select>
          </label>
          <div style="margin-left:auto; display:flex; gap:8px;">
            <button type="submit" class="save-btn">Сохранить</button>
            <button type="button" class="cancel-btn">Отмена</button>
          </div>
        </div>
      </form>
    `;
  }

  setDeleteHandler(callback) {
    this.container.addEventListener("click", (e) => {
      if (e.target.classList.contains("delete-btn")) {
        const id = Number(e.target.closest("li").dataset.id);
        callback(id);
      }
    });
  }

  setEditClickHandler(callback) {
    this.container.addEventListener("click", (e) => {
      if (e.target.classList.contains("edit-btn")) {
        const id = Number(e.target.closest("li").dataset.id);
        callback(id);
      }
    });
  }

  setEditSubmitHandler(callback) {
    const form = this.container.querySelector(".edit-form");
    if (!form) return;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const li = e.target.closest("li");
      const id = Number(li.dataset.id);
      const formData = new FormData(form);
      const updated = {
        name: formData.get("name").trim(),
        amount: Number(formData.get("amount")),
        category: formData.get("category"),
      };
      callback(id, updated);
    });
  }

  setEditCancelHandler(callback) {
    const form = this.container.querySelector(".edit-form");
    if (!form) return;
    form.querySelector(".cancel-btn")?.addEventListener("click", () => {
      callback();
    });
  }
}
