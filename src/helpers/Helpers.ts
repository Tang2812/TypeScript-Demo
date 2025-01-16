import { Cat } from "../models/Cat";
import axios from "axios";
export class Helper {

  private apiUrl = 'http://localhost:3000/cats';
  async getAllCat(): Promise<Cat[]> {
    try {
      const response = await axios.get<Cat[]>(this.apiUrl);
      const cats = response.data.map(cat => new Cat(cat.id, cat.name, cat.weight, cat.color, cat.gender));
      return cats
    } catch (error) {
      console.log("fectching err");
      return [];
    }
  }

  async createNewCat(cat: Cat): Promise<boolean> {
    try {
      const response = await axios.post(this.apiUrl, cat);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }


  }
}
