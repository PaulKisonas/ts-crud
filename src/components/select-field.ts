type Option = {
  value: string;
  text: string;
};

class SelectField {

  public htmlElement: HTMLSelectElement;
  constructor() {
      this.htmlElement = document.createElement('select');
      this.htmlElement.className = 'form-select';
      this.htmlElement.innerHTML = `
      <option value="">BMW</option>
      <option value="">Volvo</option>
      <option value="">Audi</option>
      `;
  }
}

export default SelectField;