"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatView = void 0;
const notiflix_1 = __importDefault(require("notiflix"));
class CatView {
    constructor() {
        this.catListElement = document.querySelector('#cat-list').getElementsByTagName('tbody')[0];
    }
    displayCats(cats) {
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
        });
        notiflix_1.default.Notify.success("fetch data success!!");
    }
    showError(message) {
        notiflix_1.default.Notify.failure(message);
    }
}
exports.CatView = CatView;
