import { catController } from "./controllers/CatController";
import { CatView } from "./views/CatView";
import { Cat } from "./models/Cat";
import Notiflix from 'notiflix';

const catView = new CatView();
document.addEventListener('DOMContentLoaded', () => {
  catController.fetchCats();

  const catForm = document.querySelector('#cat-form') as HTMLFormElement;
  const formContainer = document.querySelector('.form__container') as HTMLElement;
  const buttonCreate = document.querySelector('.btn-create') as HTMLButtonElement;
  const buttonClose = document.querySelector('.btn--close-Form') as HTMLButtonElement;

  buttonCreate.addEventListener('click', () => {
    openInformationForm(formContainer);
  });

  buttonClose.addEventListener('click', () => {
    closeInformationForm(formContainer, catForm);
  })

  /**
   * when user submit form to create a new cat
   */
  catForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(catForm);
    const name = formData.get('name') as string;
    const weight = parseFloat(formData.get('weight') as string);
    const color = formData.get('color') as string;
    const gender = parseInt(formData.get('gender') as string);

    if (catController.validateCatInfor(name, weight) === true) {
      const newCat = new Cat(0, name, weight, color, gender);
      closeInformationForm(formContainer, catForm);
      catController.addNewCat(newCat);
    } else {
      Notiflix.Notify.failure("Information is invalid!")
    }


  })
})

/**
 *close form and resev value in form
 * @param formContainer
 * @param form
 */
export function closeInformationForm(formContainer: HTMLElement, form: HTMLFormElement) {
  formContainer.classList.remove('display--flex');
  formContainer.classList.add('display--none');
  form.reset();
};

/**
 *open form 
 * @param formContainer
 */
export function openInformationForm(formContainer: HTMLElement) {
  formContainer.classList.remove('display--none');
  formContainer.classList.add('display--flex');
};



