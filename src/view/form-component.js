export default class ExpenseFormView {
  constructor() {
    this.container = document.querySelector(".expense-form");
  }

  render() {
    this.container.innerHTML = `
      <h2>Добавить расход</h2>
      <form id="expense-form">
        <input type="text" id="expense-name" placeholder="Наименование" required />
        <input type="number" id="expense-amount" placeholder="Сумма" required />
        <select id="expense-category" required>
          <option value="">Выберите категорию</option>
          <option value="Еда">Еда</option>
          <option value="Транспорт">Транспорт</option>
          <option value="Развлечения">Развлечения</option>
          <option value="Другое">Другое</option>
        </select>
        <button type="submit">Добавить</button>
      </form>
    `;
  }

  setAddHandler(callback) {
    const form = this.container.querySelector("#expense-form");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const expense = {
        name: form.querySelector("#expense-name").value,
        amount: Number(form.querySelector("#expense-amount").value),
        category: form.querySelector("#expense-category").value,
      };
      callback(expense);
      form.reset();
    });
  }
}
