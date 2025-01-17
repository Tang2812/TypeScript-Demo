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
exports.Helper = void 0;
const Cat_1 = require("../models/Cat");
const axios_1 = __importDefault(require("axios"));
class Helper {
    constructor() {
        this.apiUrl = 'http://localhost:3000/cats';
    }
    getAllCat() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.get(this.apiUrl);
                const cats = response.data.map(cat => new Cat_1.Cat(cat.id, cat.name, cat.weight, cat.color, cat.gender));
                return cats;
            }
            catch (error) {
                console.log("fectching err");
                return [];
            }
        });
    }
    createNewCat(cat) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cats = yield this.getAllCat();
                const maxId = cats.reduce((max, cat) => cat.id > max ? cat.id : max, 0);
                cat.id = maxId;
                const response = yield axios_1.default.post(this.apiUrl, cat);
                return true;
            }
            catch (err) {
                console.log(err);
                return false;
            }
        });
    }
    getCatById(catId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.get(`${this.apiUrl}/${catId}`);
                return response.data;
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    validateCatData(name, weight) {
        let nameMessage = '';
        let weightMessage = '';
        const namePattern = /^[a-zA-Z\s]+$/;
        if (!name) {
            nameMessage = 'Name is required.';
        }
        else if (!namePattern.test(name)) {
            nameMessage = 'Name is not valid';
        }
        if (!weight || isNaN(weight) || weight <= 0) {
            weightMessage = 'Weight must be a positive number.';
        }
        return {
            nameMessage,
            weightMessage
        };
    }
    deleteCat(catId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.delete(`${this.apiUrl}/${catId}`);
                return true;
            }
            catch (error) {
                console.log("Delete failed with: ", error);
                return false;
            }
        });
    }
    ;
    // update
    updateCat(catId, cat) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield axios_1.default.put(`${this.apiUrl}/${catId}`, cat);
                return true;
            }
            catch (error) {
                console.log("update faile: ", error);
                return false;
            }
        });
    }
}
exports.Helper = Helper;
