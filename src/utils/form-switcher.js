import { replace } from '../framework/render.js';

export function createFormSwitcher(eventItemComponent, eventEditComponent) {
  function closeForm() {
    replace(eventItemComponent, eventEditComponent);
    document.removeEventListener('keydown', onEscKeyDown);
  }

  function onEscKeyDown(evt) {
    if (evt.key === 'Escape') {
      closeForm();
    }
  }

  function openForm() {
    replace(eventEditComponent, eventItemComponent);
    document.addEventListener('keydown', onEscKeyDown);
  }

  return { openForm, closeForm };
}
