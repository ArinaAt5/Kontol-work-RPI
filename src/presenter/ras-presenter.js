import { render, RenderPosition } from "../framework/render.js";
import RasListComponent from "../view/ras-list-component.js";
import RasListHeaderComponent from "../view/ras-list-header-component.js";
import RasItemComponent from "../view/ras-item-component.js";
import DeleteButtonComponent from "../view/delete-button-component.js";
import EditButtonComponent from "../view/edit-button-component.js";
import EditRasModalComponent from "../view/edit-ras-component.js";

export default class RasPresenter {
  #rasboardContainer = null;
  #rasModel = null;
  #rasListComponent = null;
  #expenses = [];
  #editModalComponent = null;

  constructor({ boardContainer, rasModel }) {
    this.#rasboardContainer = boardContainer;
    this.#rasModel = rasModel;
    this.#rasModel.addObserver(this.#handleModelChange);
  }

  init() {
    this.#renderRasBoard();
  }

  #renderRasBoard() {
    this.#rasboardContainer.innerHTML = "";
    render(
      new RasListHeaderComponent(),
      this.#rasboardContainer,
      RenderPosition.AFTERBEGIN
    );

    this.#rasListComponent = new RasListComponent();
    render(this.#rasListComponent, this.#rasboardContainer);
    this.#renderExpenses();
  }

  #renderExpenses() {
    this.#rasListComponent.element.innerHTML = "";

    this.#expenses = [...this.#rasModel.expenses];

    this.#expenses.forEach((expense) => {
      const expenseItem = new RasItemComponent({ expense });
      render(expenseItem, this.#rasListComponent.element);

      const editButtonComponent = new EditButtonComponent({
        onEdit: () => this.#handleEditExpense(expense.id),
      });
      render(editButtonComponent, expenseItem.actionsContainer);
      
      const deleteButtonComponent = new DeleteButtonComponent({
        onDelete: () => this.#handleDeleteExpense(expense.id),
      });
      render(deleteButtonComponent, expenseItem.element);
    });
  }

  #handleEditExpense = (expenseId) => {
    const expense = this.#rasModel.getExpenseById(expenseId);

    if (!expense) return;

    if (this.#editModalComponent) {
      this.#editModalComponent.removeElement();
    }

    this.#editModalComponent = new EditRasModalComponent({
      expense: expense,
      onSave: this.#handleSaveExpense,
      onCancel: this.#handleCancelEdit,
    });

    render(this.#editModalComponent, document.body);
  };

  #handleSaveExpense = (expenseId, updatedExpense) => {
    this.#rasModel.updateExpense(expenseId, updatedExpense);
    this.#closeEditModal();
  };

  #handleCancelEdit = () => {
    this.#closeEditModal();
  };

  #closeEditModal = () => {
    if (this.#editModalComponent) {
      this.#editModalComponent.removeElement();
      this.#editModalComponent = null;
    }
  };

  #handleDeleteExpense = (expenseId) => {
    this.#rasModel.deleteExpense(expenseId);
  };

  #handleModelChange = () => {
    this.#renderExpenses();
  };
}