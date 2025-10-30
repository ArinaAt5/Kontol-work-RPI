import { render, RenderPosition } from './framework/render.js';
import HeaderComponent from './view/header-component.js';
import FormHeaderComponent from './view/form-header-component.js';
import FilterHeaderComponent from './view/filter-header-component.js';
import RasListHeaderComponent from './view/ras-list-header-component.js';

import RasModel from './model/ras-model.js';
import RasPresenter from './presenter/ras-presenter.js';
import FormPresenter from './presenter/form-presenter.js';

const bodyContainer = document.querySelector('.container');
const formContainer = document.querySelector('.ras-form');
const filterContainer = document.querySelector('.ras-filter');
const rasListContainer = document.querySelector('.ras-list');

console.log('Containers found:', { 
  bodyContainer: !!bodyContainer, 
  formContainer: !!formContainer, 
  filterContainer: !!filterContainer, 
  rasListContainer: !!rasListContainer 
});

const rasModel = new RasModel();

const formPresenter = new FormPresenter({
  formContainer: formContainer,
  rasModel: rasModel,
});

const rasPresenter = new RasPresenter({
  boardContainer: rasListContainer,
  rasModel: rasModel,
});

render(new HeaderComponent(), bodyContainer, RenderPosition.AFTERBEGIN);
render(new FormHeaderComponent(), formContainer, RenderPosition.AFTERBEGIN);
render(new FilterHeaderComponent(), filterContainer, RenderPosition.AFTERBEGIN);
render(new RasListHeaderComponent(), rasListContainer, RenderPosition.AFTERBEGIN);

formPresenter.init();
rasPresenter.init();

