class SelectField {

  public htmlElement: HTMLSelectElement;
  constructor() {
      this.htmlElement = document.createElement('select');
      this.htmlElement.innerHTML = `
      <option>BMW</option>
      <option>Volvo</option>
      <option>Audi</option>
      `;
  }
}

export default SelectField;