export function createElement(template) {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;
  return newElement.firstElementChild;
}

export const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend'
};

export function render(component, container, place = RenderPosition.BEFOREEND) {
  if (!component || !container) {
    console.error('Render: component or container is null', { component, container });
    return;
  }
  
  const element = component.element;
  if (!element) {
    console.error('Render: component.element is null', component);
    return;
  }

  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
    default:
      container.append(element);
  }
}