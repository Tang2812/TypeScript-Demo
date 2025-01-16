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
Object.defineProperty(exports, "__esModule", { value: true });
const CatController_1 = require("./controllers/CatController");
const Cat_1 = require("./models/Cat");
const catController = new CatController_1.CatController();
document.addEventListener('DOMContentLoaded', () => {
    catController.fetchCats();
    const catForm = document.getElementById('cat-form');
    catForm.addEventListener('submit', (event) => __awaiter(void 0, void 0, void 0, function* () {
        event.preventDefault();
        const formData = new FormData(catForm);
        const name = formData.get('name');
        const weight = parseFloat(formData.get('weight'));
        const color = formData.get('color');
        const gender = parseInt(formData.get('gender'));
        const newCat = new Cat_1.Cat(0, name, weight, color, gender);
        catController.addNewCat(newCat);
    }));
});
