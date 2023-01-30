export type TextFieldProps = {
    labelText: string,
    name: string,
    value: string,
}

class TextField {
    private static count: number = 0;

    private id: string;

    private props: TextFieldProps;

    private label: HTMLLabelElement;

    private input: HTMLInputElement;

    public htmlElement: HTMLDivElement;

    constructor(props: TextFieldProps) {
        TextField.count += 1;
        this.id = `TextField_${TextField.count}`;
        this.props = props;
        this.htmlElement = document.createElement('div');

        this.input = document.createElement('input');
        this.label = document.createElement('label');

        this.initialize();
        this.renderView();
    }

    private initialize = (): void => {
        const {label, input, id} = this;

        label.htmlFor = id;
        label.className = 'form-label';
                
        input.id = id;
        input.className = 'form-control';

        this.htmlElement.append(
            label,
            input,
        );
    };

    private renderView = () => {
        const { label, input, props } = this;

        input.name = props.name
        label.innerHTML = props.labelText;
        
        input.value = props.value;
    }

    public updateProps = (props: Partial<TextFieldProps>) => {
        this.props = {
            ...this.props,
            ...props,
        };

        this.renderView();
    };
}

export default TextField