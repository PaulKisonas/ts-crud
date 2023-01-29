import Table from "./table";
import cars from "../data/cars";
import brands from "../data/brands";
import models from "../data/models";
import CarsCollection from "../helpers/cars-collection";
import stringifyProps from "../helpers/stingify-object";
import SelectField from "./select-field";

class App {
  private htmlElement: HTMLElement;

  private carsCollection: CarsCollection;

  constructor(selector: string) {
    const foundElement = document.querySelector<HTMLElement>(selector);
    this.carsCollection = new CarsCollection({ cars, brands, models });

    if (foundElement === null)
      throw new Error(`Nerastas elementas su selektoriumi '${selector}'`);

    this.htmlElement = foundElement;
  }

  initialize = (): void => {
    const select = new SelectField();
    const carTable = new Table({
      title: "Visi automobiliai",
      columns: {
        id: "Id",
        brand: "Markė",
        model: "Modelis",
        price: "Kaina",
        year: "Metai",
      },
      rowsData: this.carsCollection.all.map(stringifyProps),
    });

    const container = document.createElement("div");
    container.className = "container d-flex flex-column my-5 gap-3";
    container.append(select.htmlElement, carTable.htmlElement);

    this.htmlElement.append(container);
  };
}

export default App;
