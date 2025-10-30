export default class ExpenseModel {
  constructor(expenses = []) {
    this.expenses = expenses;
  }

  getExpenses() {
    return this.expenses;
  }

  addExpense(expense) {
    this.expenses.push({ id: Date.now(), ...expense });
  }

  deleteExpense(id) {
    this.expenses = this.expenses.filter((e) => e.id !== id);
  }

  updateExpense(id, patch) {
    this.expenses = this.expenses.map((e) =>
      e.id === id ? { ...e, ...patch } : e
    );
  }
}
