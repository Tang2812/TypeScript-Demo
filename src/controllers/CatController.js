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
exports.CatController = void 0;
const CatView_1 = require("../views/CatView");
const Helpers_1 = require("../helpers/Helpers");
const notiflix_1 = __importDefault(require("notiflix"));
class CatController {
    constructor() {
        this.catView = new CatView_1.CatView();
        this.helper = new Helpers_1.Helper();
    }
    fetchCats() {
        return __awaiter(this, void 0, void 0, function* () {
            const cats = yield this.helper.getAllCat();
            if (cats.length === 0) {
                this.catView.showError("Fetch data fail!");
            }
            else {
                this.catView.displayCats(cats);
            }
        });
    }
    addNewCat(cat) {
        return __awaiter(this, void 0, void 0, function* () {
            const statusResponse = yield this.helper.createNewCat(cat);
            if (statusResponse === true) {
                notiflix_1.default.Notify.success("Add new cat successfully!");
                this.fetchCats();
            }
            else {
                notiflix_1.default.Notify.failure("Add new cat failed!!");
            }
        });
    }
}
exports.CatController = CatController;
