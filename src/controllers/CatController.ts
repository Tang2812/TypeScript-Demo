import { Cat } from "../models/Cat";
import axios from "axios";
import { CatView } from "../views/CatView";
import { Helper } from "../helpers/Helpers";
import Notiflix from "notiflix";

export class CatController {
  private catView = new CatView();
  private helper = new Helper();

  /**
   * get list data, show message error if fail.
   */
  async fetchCats(): Promise<void> {
    const cats = await this.helper.getAllCat();
    if (cats.length === 0) {
      this.catView.showError("Fetch data fail!")
    } else {
      this.catView.displayCats(cats);
    }
  }

  /**
   * add new cat, show message if success or fail
   * @param cat infor of new cat
   */
  async addNewCat(cat: Cat): Promise<void> {
    const statusResponse = await this.helper.createNewCat(cat);
    if (statusResponse === true) {
      Notiflix.Notify.success("Add new cat successfully!");
      this.fetchCats();
    } else {
      Notiflix.Notify.failure("Add new cat failed!!");
    }
  };

  /**
   * get information by id and set to view, show message if fail
   * @param catId
   */
  async showDetail(catId: number) {
    const response = await this.helper.getCatById(catId);
    if (response) {
      this.catView.setCatInformation(response);
    } else {
      this.catView.showError("show information failed")
    }
  }

  /**
   * update information of cat. show message if success or fail
   * @param cat
   */
  async update(cat: Cat) {
    const statusResponse = await this.helper.updateCat(cat.id, cat);
    if (statusResponse === true) {
      Notiflix.Notify.success("Update cat successfully!");
      this.fetchCats();
    } else {
      Notiflix.Notify.failure("Update cat failed!!");
    }
  }

  /**
   * validate value of information, return true if values are valid, return false if values invalid
   * @param name
   * @param weight
   * @returns
   */
  validateCatInfor(name: string, weight: number): boolean {
    const messages = this.helper.validateCatData(name, weight);
    return this.catView.validateCatInfor(messages.nameMessage, messages.weightMessage);
  }

  /**
   * remove cat by id, show message if success or fail
   * @param catId
   */
  async removeCat(catId: number): Promise<void> {
    const response = await this.helper.deleteCat(catId);
    if (response) {
      this.catView.showSuccess("Delete cat success!")
      this.fetchCats();
    } else {
      this.catView.showError("Delete cat failed!");
    }
  }
}
export const catController = new CatController();
