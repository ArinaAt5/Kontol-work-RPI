import { expenses } from "./mock/mock.js";
import ExpenseModel from "./model/model.js";
import ExpenseFormView from "./view/form-component.js";
import ExpenseListView from "./view/list-component.js";
import ExpenseFilterView from "./view/filter-component.js";
import ExpensePresenter from "./presenter/presenter.js";

const model = new ExpenseModel(expenses);
const formView = new ExpenseFormView();
const listView = new ExpenseListView();
const filterView = new ExpenseFilterView();
const presenter = new ExpensePresenter(model, formView, listView, filterView);

presenter.init();
