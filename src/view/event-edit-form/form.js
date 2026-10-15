import { createElement } from '../../render.js';
import { createFormHeaderTemplate } from './form-header.js';
import {createFormEventDetailsTemplate } from './form-event-details/form-event-details.js';

function createFormTemplate() {
  return `
    <form class="event event--edit" action="#" method="post">
      ${createFormHeaderTemplate()}
      ${createFormEventDetailsTemplate()}
    </form>
  `;
}

export default class Form {
  getTemplate() {
    return createFormTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
