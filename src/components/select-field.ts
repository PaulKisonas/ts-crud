export type Option = {
  value: string;
  text: string;
};

type SelectFieldProps = {
options: Option[],
onChange: (newValue: string) => void,
name?: string,
labelText?: string,
value?: string,
};

class SelectField {
  private props: SelectFieldProps;

  public htmlElement: HTMLSelectElement;

  constructor(props: SelectFieldProps) {
      this.htmlElement = document.createElement('select');
      this.props = props;

      this.initialize();
  }

  private initialize = () => {
      this.htmlElement.className = 'form-select';
      this.htmlElement.innerHTML = this.props.options
      .map(({ value, text }) => `
      <option value="${value}">${text}</option>
      `).join('');
      this.htmlElement.addEventListener(
          'change',
          () => this.props.onChange(this.htmlElement.value),
      );
  };
}

export default SelectField;
