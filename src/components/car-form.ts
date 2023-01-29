type CarFormProps = {}

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