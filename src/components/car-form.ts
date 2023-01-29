type CarFormProps = {}
import TextField from './text-field';
import SelectField from './select-field';
import brands from '../data/brands';
import models from '../data/models';

export type Values = {
    brand: string,
    model: string,
    price: string,
    year: string,
  };


class CarForm {
    private props: CarFormProps;

    public htmlElement: HTMLFormElement;

    constructor(props: CarFormProps) {
        this.props = props
        this.htmlElement = document.createElement('form')

        this.initialize();
        this.renderView();
    };

    private initialize() {

    };

    private renderView() {

    };


public updateProps(props: Partial<CarFormProps>) {
    this.props = {
        ...this.props,
        ...props,
    };

    this.renderView();
    };
}

export default CarForm;