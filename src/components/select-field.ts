export type Option = {
  value: string;
  text: string;
};

type SelectFieldProps = {
  options: Option[];
  onChange: (value: string) => void;
};

class SelectField {
  private props: SelectFieldProps;

  public htmlElement: HTMLSelectElement;
  constructor(props: SelectFieldProps) {
    this.htmlElement = document.createElement("select");
    this.htmlElement.className = "form-select";
    this.htmlElement.innerHTML = `
      <option value="">BMW</option>
      <option value="">Volvo</option>
      <option value="">Audi</option>
      `;
    this.props = props;
    this.initialize();
  }

  private initialize = () => {
    this.htmlElement.className = "form-select";
    this.htmlElement.innerHTML = this.props.options
      .map(
        ({ value, text }) => `
    <option value="${value}">${text}</option>
    `
      )
      .join("");
      this.htmlElement.addEventListener(
        'change',
         () => this.props.onChange(this.htmlElement.value),
    );
  };
}

export default SelectField;
