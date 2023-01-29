import Car from '../types/car';
import Model from '../types/model';
import Brand from '../types/brand';
import CarJoined from '../types/car-joined';

type CarsCollectionProps = {
  cars: Car[],
  brands: Brand[],
  models: Model[],
};

class CarsCollection {
  private props: CarsCollectionProps;

  constructor(props: CarsCollectionProps) {
    this.props = props;
  }

  private joinCars = ({ modelId, ...car}: Car) => {
    const { brands, models } = this.props;
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

}

export default CarsCollection;