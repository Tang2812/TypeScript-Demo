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
exports.closeInformationForm = closeInformationForm;
exports.openInformationForm = openInformationForm;
const CatController_1 = require("./controllers/CatController");
const CatView_1 = require("./views/CatView");
const Cat_1 = require("./models/Cat");
const notiflix_1 = __importDefault(require("notiflix"));
const catView = new CatView_1.CatView();
document.addEventListener('DOMContentLoaded', () => {
    CatController_1.catController.fetchCats();
    const catForm = document.querySelector('#cat-form');
    const formContainer = document.querySelector('.form__container');
    const buttonCreate = document.querySelector('.btn-create');
    const buttonClose = document.querySelector('.btn--close-Form');
    buttonCreate.addEventListener('click', () => {
        openInformationForm(formContainer);
    });
    buttonClose.addEventListener('click', () => {
        closeInformationForm(formContainer, catForm);
    });
    /**
     * when user submit form to create a new cat
     */
    catForm.addEventListener('submit', (event) => __awaiter(void 0, void 0, void 0, function* () {
        event.preventDefault();
        const formData = new FormData(catForm);
        const name = formData.get('name');
        const weight = parseFloat(formData.get('weight'));
        const color = formData.get('color');
        const gender = parseInt(formData.get('gender'));
        if (CatController_1.catController.validateCatInfor(name, weight) === true) {
            const newCat = new Cat_1.Cat(0, name, weight, color, gender);
            closeInformationForm(formContainer, catForm);
            CatController_1.catController.addNewCat(newCat);
        }
        else {
            notiflix_1.default.Notify.failure("Information is invalid!");
        }
    }));
});
/**
 *close form and resev value in form
 * @param formContainer
 * @param form
 */
function closeInformationForm(formContainer, form) {
    formContainer.classList.remove('display--flex');
    formContainer.classList.add('display--none');
    form.reset();
}
;
/**
 *open form
 * @param formContainer
 */
function openInformationForm(formContainer) {
    formContainer.classList.remove('display--none');
    formContainer.classList.add('display--flex');
}
;
