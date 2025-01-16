import { Cat } from "../models/Cat";
import axios from "axios";
import { CatView } from "../views/CatView";
import { Helper } from "../helpers/Helpers";
import Notiflix from "notiflix";

export class CatController {
  private catView = new CatView();
  private helper = new Helper();

  async fetchCats(): Promise<void> {
    const cats = await this.helper.getAllCat();
    if (cats.length === 0) {
      this.catView.showError("Fetch data fail!")
    } else {
      this.catView.displayCats(cats);
    }
  }

  async addNewCat(cat: Cat): Promise<void> {
    const statusResponse = await this.helper.createNewCat(cat);
    if (statusResponse === true) {
      Notiflix.Notify.success("Add new cat successfully!");
      this.fetchCats();
    } else {
      Notiflix.Notify.failure("Add new cat failed!!");
    }
  }
}
