import { Cat } from "../models/Cat";
import axios from "axios";

interface ValidationMessages {
  nameMessage: string;
  weightMessage: string;
}

export class Helper {

  private apiUrl = 'http://localhost:3000/cats';

  /**
   * get list data of cat
   * @returns an array of cats
   */
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

  /**
   * create new cat and add to list data
   * @param cat
   * @returns status (true if success or false if fail)
   */
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
/**
 * get data of cat by catId
 * @param catId
 * @returns a Cat or null
 */
  async getCatById(catId: number): Promise<Cat | null> {
    try {
      const response = await axios.get(`${this.apiUrl}/${catId}`);
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  /**
   * validate cat name must be letter, not contain special character and cat weight must be number and > 0
   * @param name
   * @param weight
   * @returns an object contain message of name and weight
   */

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

/**
 * delete cat by id
 * @param catId
 * @returns  status (true if success or false if fail)
 */
  async deleteCat(catId: number): Promise<boolean> {
    try {
      const response = await axios.delete(`${this.apiUrl}/${catId}`);
      return true;
    } catch (error) {
      console.log("Delete failed with: ", error);
      return false;
    }
  };

  /**
   * update cat information by catId
   * @param catId
   * @param cat
   * @returns status (true if success or false if fail)
   */
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
