import { expenses } from "../mock/mock.js";
import { generateID } from "../utils.js";

export default class RasModel {
  #expenses = [];
  #observers = [];

  constructor() {
    this.#expenses = expenses;
  }

  get expenses() {
    return this.#expenses;
  }

  addExpense(expense) {
    const newExpense = {
      ...expense,
      id: generateID() 
    };
    this.#expenses = [newExpense, ...this.#expenses];
    this.#notifyObservers();
  }

  addObserver(observer) {
    this.#observers.push(observer);
  }

  removeObserver(observer) {
    this.#observers = this.#observers.filter((obs) => obs !== observer);
  }

  #notifyObservers() {
    this.#observers.forEach((observer) => observer());
  }

  deleteExpense(expenseId) {
    this.#expenses = this.#expenses.filter((expense) => expense.id !== expenseId);
    this.#notifyObservers();
  }

  updateExpense(expenseId, updatedFields) {
    this.#expenses = this.#expenses.map((expense) =>
      expense.id === expenseId ? { ...expense, ...updatedFields } : expense
    );
    this.#notifyObservers();
  }

  getExpenseById(expenseId) {
    return this.#expenses.find((expense) => expense.id === expenseId);
  }


  getExpensesByCategory(category) {
    if (category === "Все") {
      return this.#expenses;
    }
    return this.#expenses.filter((expense) => expense.category === category);
  }

  getExpensesAboveAmount(amount) {
    return this.#expenses.filter((expense) => expense.amount > amount);
  }

  getExpensesByCategoryAboveAmount(category, amount) {
    let filteredExpenses = this.#expenses;

    if (category !== "Все") {
      filteredExpenses = filteredExpenses.filter((expense) => expense.category === category);
    }

    return filteredExpenses.filter((expense) => expense.amount > amount);
  }
}