import Car from '../types/car';
import Model from '../types/model';
import Brand from '../types/brand';
import CarJoined from '../types/car-joined';
import brands from '../data/brands';

type CarsCollectionProps = {
  cars: Car[],
  brands: Brand[],
  models: Model[],
};

class CarsCollection {
  private props: CarsCollectionProps;

  private privateBrands: Brand[];

  constructor(props: CarsCollectionProps) {
    this.props = props;
    this.privateBrands = JSON.parse(JSON.stringify(brands));
  }

  private joinCars = ({ modelId, ...car}: Car) => {
    const { models } = this.props;
    const carModel = models.find((model) => model.id === modelId);
    const carBrand = brands.find((brand) => brand.id === carModel?.brandId);

    return {
      ...car,
      brand: (carBrand && carBrand.title) ?? 'unknown',
      model: (carModel && carModel.title) ?? 'unknown',
    };
  };

  public get all(): CarJoined[] {
    return this.props.cars.map(this.joinCars);
  }

  getByBrandId = (brandId: string): CarJoined[] => {
    const { cars, models } = this.props;

    const brandModelIds = models
    .filter((model) => model.brandId === brandId)
    .map((model) => model.id);

    const carsModelIds = cars
    .filter((car) => brandModelIds
    .includes(car.modelId))
    .map(this.joinCars);

    return carsModelIds;
};

getBrandTitleById = (brandId: string) => {
  const foundBrand = this.privateBrands.find((b) => b.id === brandId);

if (foundBrand === undefined) throw new Error(`Brand is not found "${brandId}"`);

return foundBrand;
};

}

export default CarsCollection;