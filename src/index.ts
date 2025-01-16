import { CatController } from "./controllers/CatController";
import { Cat } from "./models/Cat";

const catController = new CatController()
document.addEventListener('DOMContentLoaded', () => {
  catController.fetchCats();

  const catForm = document.getElementById('cat-form') as HTMLFormElement;
  catForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(catForm);
    const name = formData.get('name') as string;
    const weight = parseFloat(formData.get('weight') as string);
    const color = formData.get('color') as string;
    const gender = parseInt(formData.get('gender') as string);

    const newCat = new Cat(0, name, weight, color, gender);
    catController.addNewCat(newCat);
  })
})
