import cars from '../data/cars';
import brands from '../data/brands';
import models from '../data/models';
import Table from './table';
import CarsCollection from '../helpers/cars-collection';
import type Brand from '../types/brand';
import type CarJoined from '../types/car-joined';
import stringifyProps, { StringifyObjectProps } from '../helpers/stringify-object';
import SelectField, { type Option } from './select-field';

const ALL_BRAND_ID = '-1' as const;
const ALL_BRAND_TITLE = 'All Cars';

const brandToOption = ({ id, title }: Brand): Option => ({
 value: id,
 text: title,
});

class App {
  private htmlElement: HTMLElement;

  private carsCollection: CarsCollection;

  private selectedBrandId: string;

  private carsTable: Table<StringifyObjectProps<CarJoined>>;

  constructor(selector: string) {
    const foundElement = document.querySelector<HTMLElement>(selector);
    this.carsCollection = new CarsCollection({ cars, brands, models });

    if (foundElement === null) throw new Error(`Nerastas elementas su selektoriumi '${selector}'`);

    this.selectedBrandId = ALL_BRAND_ID;
    this.htmlElement = foundElement;

    this.carsTable = new Table({
      title: ALL_BRAND_TITLE,
      columns: {
        id: 'Id',
        brand: 'Brand',
        model: 'Model',
        price: 'Price',
        year: 'Year',
      },
      rowsData: this.carsCollection.all.map(stringifyProps),
      onDelete: this.handleCarDelete,
    });
  }

  private handleBrandChange = (carId: string): void => {
    this.selectedBrandId = carId;

    this.update();
  };

  private handleCarDelete = (brandId: string) => {
    this.carsCollection.deleteCarById(brandId);
    this.update();
  };

  public initialize = (): void => {
  const select = new SelectField({
    options: [
      { value: ALL_BRAND_ID, text: ALL_BRAND_TITLE },
      ...brands.map(brandToOption),
    ],
    onChange: this.handleBrandChange,
  });

  const container = document.createElement('div');
  container.className = 'container d-flex flex-column my-5 gap-3';
  container.append(
    select.htmlElement,
    this.carsTable.htmlElement,
    );

    this.htmlElement.append(container);
  };

  private update = (): void => {
    const { selectedBrandId, carsCollection } = this;

    if (this.selectedBrandId === ALL_BRAND_ID) {
      this.carsTable.updateProps({
        title: ALL_BRAND_TITLE,
        rowsData: carsCollection.all.map(stringifyProps),
      });
    } else {
      const brand = this.carsCollection.getBrandTitleById(selectedBrandId);

      this.carsTable.updateProps({
        title: brand.title,
        rowsData: carsCollection
        .getByBrandId(selectedBrandId)
        .map(stringifyProps),
      });
    }
  };
}

export default App;
