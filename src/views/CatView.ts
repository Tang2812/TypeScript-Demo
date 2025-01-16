import { Cat } from "../models/Cat";
import Notiflix from 'notiflix';

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
      <button class="btn btn-danger btn-sm">Delete</button>
      <button class="btn btn-warning btn-sm">Detail</button>
      <button class="btn btn-primary btn-sm">Edit</button>
      </td>
      `;
      this.catListElement.appendChild(row);
    })
    Notiflix.Notify.success("fetch data success!!")
  }

  showError(message: string) {
    Notiflix.Notify.failure(message)
  }
}

