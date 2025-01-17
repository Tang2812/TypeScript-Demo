import { Cat } from "../models/Cat";
import axios from "axios";

interface ValidationMessages {
  nameMessage: string;
  weightMessage: string;
}

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
      const cats = await this.getAllCat();
      const maxId = cats.reduce((max, cat) => cat.id > max ? cat.id : max, 0);
      cat.id = maxId;
      const response = await axios.post(this.apiUrl, cat);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async getCatById(catId: number): Promise<Cat | null> {
    try {
      const response = await axios.get(`${this.apiUrl}/${catId}`);
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }


  validateCatData(name: string, weight: number): ValidationMessages {
    let nameMessage = '';
    let weightMessage = '';
    const namePattern = /^[a-zA-Z\s]+$/;

    if (!name) {
      nameMessage = 'Name is required.';
    } else if (!namePattern.test(name)) {
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

  async deleteCat(catId: number): Promise<boolean> {
    try {
      const response = await axios.delete(`${this.apiUrl}/${catId}`);
      return true;
    } catch (error) {
      console.log("Delete failed with: ", error);
      return false;
    }
  };

  // update
  async updateCat(catId: number, cat: Cat): Promise<boolean> {
    try {
      await axios.put(`${this.apiUrl}/${catId}`, cat);
      return true;
    } catch (error) {
      console.log("update faile: ", error);
      return false;
    }
  }
}
