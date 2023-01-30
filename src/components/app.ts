import cars from '../data/cars';
import brands from '../data/brands';
import models from '../data/models';
import Table from './table';
import CarsCollection, { CarProps } from '../helpers/cars-collection';
import type Brand from '../types/brand';
import type CarJoined from '../types/car-joined';
import strProps, { type StringifyObjectProps } from '../helpers/stringify-object';
import SelectField, { type OptionType } from './select-field';
import CarForm, { type Values } from './car-form';

const ALL_BRAND_ID = '-1' as const;
const ALL_BRAND_TITLE = 'All Cars';

const brandToOption = ({ id, title }: Brand): OptionType => ({
 value: id,
 text: title,
});

class App {
  private htmlElement: HTMLElement;

  private carsCollection: CarsCollection;

  private selectedBrandId: string;

  private carsTable: Table<StringifyObjectProps<CarJoined>>;

  private carForm: CarForm | undefined;

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
      rowsData: this.carsCollection.all.map(strProps),
      onDelete: this.handleCarDelete,
    });
  }

  private handleBrandChange = (carId: string): void => {
    this.selectedBrandId = carId;

    this.renderView();
  };

  private handleCarDelete = (brandId: string) => {
    this.carsCollection.deleteCarById(brandId);
    this.renderView();
  };

  public initialize = (): void => {
  const select = new SelectField({
    options: [
      { value: ALL_BRAND_ID, text: ALL_BRAND_TITLE },
      ...brands.map(brandToOption),
    ],
    onChange: this.handleBrandChange,
  });

  const initialBrandId = brands[0].id;
  this.carForm = new CarForm({
    title: 'Sukurkite naują automobilį',
    submitBtnText: 'Sukurti',
    values: {
      brand: initialBrandId,
      model: models.filter((m) => m.brandId === initialBrandId)[0].id,
      price: '0',
      year: '2000',
    },
    onSubmit: this.handleCreateCar,
  });

  const container = document.createElement('div');
  container.className = 'container d-flex flex-column my-5 gap-3';
  container.append(
    select.htmlElement,
    this.carsTable.htmlElement,
    this.carForm.htmlElement,
    );

    this.htmlElement.append(container);
  };

  private handleCreateCar = ({
    brand, model, price, year,
  }: Values): void => {
    const carProps: CarProps = {
      brandId: brand,
      modelId: model,
      price: Number(price),
      year: Number(year),
    };

    this.carsCollection.add(carProps);

    this.renderView();
  };

  private renderView = (): void => {
    const { selectedBrandId, carsCollection } = this;

    if (this.selectedBrandId === ALL_BRAND_ID) {
      this.carsTable.updateProps({
        title: ALL_BRAND_TITLE,
        rowsData: carsCollection.all.map(strProps),
      });
    } else {
      const brand = this.carsCollection.getByBrandTitleId(selectedBrandId);

      this.carsTable.updateProps({
        title: brand.title,
        rowsData: carsCollection
        .getByBrandId(selectedBrandId)
        .map(strProps),
      });
    }
  };
}

export default App;
