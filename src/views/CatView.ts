import { Cat } from "../models/Cat";
import Notiflix from 'notiflix';
import { catController } from "../controllers/CatController";
import { openInformationForm } from "..";
import { closeInformationForm } from "..";
export class CatView {
  private catListElement = document.querySelector('#cat-list')!.getElementsByTagName('tbody')[0];


  displayCats(cats: Cat[]): void {
    this.catListElement.innerHTML = '';
    cats.forEach((cat, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
      <th scope="row">${index + 1}</th>
      <td>${cat.name}</td>
      <td>${cat.weight}</td>
      <td>${cat.color}</td>
      <td>${cat.gender === 1 ? "Male" : "Female"}</td>
      <td>
      <button class="btn btn-danger btn-sm" id='btn-delete' data-id="${cat.id}">Delete</button>
      <button class="btn btn-warning btn-sm" id='btn-detail' data-id="${cat.id}" >Detail</button>
      </td>
      `;
      this.catListElement.appendChild(row);
    })
    Notiflix.Notify.success("fetch data success!!")

    // Add delete event
    const deleteButtons = this.catListElement.querySelectorAll('#btn-delete');
    deleteButtons.forEach(button => {
      button.addEventListener('click', async (event) => {
        const target = event.target as HTMLButtonElement;
        const catId = parseInt(target.getAttribute('data-id')!);
        await catController.removeCat(catId);
      })
    });

    // add view information event
    const detailButton = this.catListElement.querySelectorAll('#btn-detail');
    const formContainer = document.querySelector('.form__container') as HTMLElement;
    detailButton.forEach(button => {
      button.addEventListener('click', async (event) => {
        const target = event.target as HTMLButtonElement;
        const catId = parseInt(target.getAttribute('data-id')!);
        await catController.showDetail(catId);
        openInformationForm(formContainer);
        const createButton = document.querySelector('#form__btn-create') as HTMLButtonElement;
        createButton.style.display = 'none';

        const updateButton = document.querySelector('#form__btn-update') as HTMLButtonElement;
        updateButton.style.display = 'flex';
        updateButton.onclick = () => this.saveCat(catId);
      })
    })

  }

  //  show message error to toast
  showError(message: string) {
    Notiflix.Notify.failure(message);
  };

  //  show message success to toast
  showSuccess(message: string) {
    Notiflix.Notify.success(message);
  };

  // validate value when user input
  validateCatInfor(nameErrMessage: string, weighErrtMessage: string): boolean {
    const nameMessage = document.querySelector('#name-error') as HTMLElement;
    const weightMessage = document.querySelector('#weight-error') as HTMLElement;
    if (nameErrMessage === '' && weighErrtMessage === '') {
      return true;
    } else {
      nameMessage.textContent = nameErrMessage;
      weightMessage.textContent = weighErrtMessage;
      return false;
    }
  };

  // set infomation to form
  setCatInformation(cat: Cat): void {
    (document.getElementById('name') as HTMLInputElement).value = cat.name;
    (document.getElementById('weight') as HTMLInputElement).value = cat.weight.toString();
    (document.getElementById('color') as HTMLSelectElement).value = cat.color;
    (document.getElementById('gender') as HTMLInputElement).value = cat.gender.toString();
  };

//
  async saveCat(catId: number): Promise<void> {
    const catForm = document.getElementById('cat-form') as HTMLFormElement;
    const formContainer = document.querySelector('.form__container') as HTMLElement;
    const formData = new FormData(catForm);
    const name = formData.get('name') as string;
    const weight = parseFloat(formData.get('weight') as string);
    const color = formData.get('color') as string;
    const gender = parseInt(formData.get('gender') as string);

    if (catController.validateCatInfor(name, weight) === true) {
      const updateCat = new Cat(catId, name, weight, color, gender);
      closeInformationForm(formContainer, catForm);
      catController.update(updateCat);
    } else {
      Notiflix.Notify.failure("Information is invalid!")
    }

  }

}

