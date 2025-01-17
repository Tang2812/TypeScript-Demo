"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatView = void 0;
const Cat_1 = require("../models/Cat");
const notiflix_1 = __importDefault(require("notiflix"));
const CatController_1 = require("../controllers/CatController");
const __1 = require("..");
const __2 = require("..");
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
      <button class="btn btn-danger btn-sm" id='btn-delete' data-id="${cat.id}">Delete</button>
      <button class="btn btn-warning btn-sm" id='btn-detail' data-id="${cat.id}" >Detail</button>
      </td>
      `;
            this.catListElement.appendChild(row);
        });
        notiflix_1.default.Notify.success("fetch data success!!");
        // Add delete event
        const deleteButtons = this.catListElement.querySelectorAll('#btn-delete');
        deleteButtons.forEach(button => {
            button.addEventListener('click', (event) => __awaiter(this, void 0, void 0, function* () {
                const target = event.target;
                const catId = parseInt(target.getAttribute('data-id'));
                yield CatController_1.catController.removeCat(catId);
            }));
        });
        // add view information event
        const detailButton = this.catListElement.querySelectorAll('#btn-detail');
        const formContainer = document.querySelector('.form__container');
        detailButton.forEach(button => {
            button.addEventListener('click', (event) => __awaiter(this, void 0, void 0, function* () {
                const target = event.target;
                const catId = parseInt(target.getAttribute('data-id'));
                yield CatController_1.catController.showDetail(catId);
                (0, __1.openInformationForm)(formContainer);
                const createButton = document.querySelector('#form__btn-create');
                createButton.style.display = 'none';
                const updateButton = document.querySelector('#form__btn-update');
                updateButton.style.display = 'flex';
                updateButton.onclick = () => this.saveCat(catId);
            }));
        });
    }
    showError(message) {
        notiflix_1.default.Notify.failure(message);
    }
    ;
    showSuccess(message) {
        notiflix_1.default.Notify.success(message);
    }
    ;
    validateCatInfor(nameErrMessage, weighErrtMessage) {
        const nameMessage = document.querySelector('#name-error');
        const weightMessage = document.querySelector('#weight-error');
        if (nameErrMessage === '' && weighErrtMessage === '') {
            return true;
        }
        else {
            nameMessage.textContent = nameErrMessage;
            weightMessage.textContent = weighErrtMessage;
            return false;
        }
    }
    ;
    // set infomation to form
    setCatInformation(cat) {
        document.getElementById('name').value = cat.name;
        document.getElementById('weight').value = cat.weight.toString();
        document.getElementById('color').value = cat.color;
        document.getElementById('gender').value = cat.gender.toString();
    }
    ;
    saveCat(catId) {
        return __awaiter(this, void 0, void 0, function* () {
            const catForm = document.getElementById('cat-form');
            const formContainer = document.querySelector('.form__container');
            const formData = new FormData(catForm);
            const name = formData.get('name');
            const weight = parseFloat(formData.get('weight'));
            const color = formData.get('color');
            const gender = parseInt(formData.get('gender'));
            if (CatController_1.catController.validateCatInfor(name, weight) === true) {
                const updateCat = new Cat_1.Cat(catId, name, weight, color, gender);
                (0, __2.closeInformationForm)(formContainer, catForm);
                CatController_1.catController.update(updateCat);
            }
            else {
                notiflix_1.default.Notify.failure("Information is invalid!");
            }
        });
    }
}
exports.CatView = CatView;
