import countObjectProperties from "../helpers/count-object-properties";

type RowData = {
  id: string;
  [key: string]: string;
};

export type TableProps<Type> = {
  title: string;
  columns: Type;
  rowsData: Type[];
};

class Table<Type extends RowData> {
  public htmlElement: HTMLTableElement;

  private props: TableProps<Type>;

  private tbody: HTMLTableSectionElement;

  private thead: HTMLTableSectionElement;

  public constructor(props: TableProps<Type>) {
    this.props = props;
    this.checkColumnsCompatability();

    this.htmlElement = document.createElement("table");
    this.thead = document.createElement("thead");
    this.tbody = document.createElement("tbody");

    this.initialize();
    this.renderView();
  }

  private checkColumnsCompatability = (): void => {
    const { rowsData, columns } = this.props;

    if (this.props.rowsData.length === 0) return;
    const columnCount = countObjectProperties(columns);

    const columnsCompatableWithRowsData = rowsData.every((row) => {
      const rowCellsCount = countObjectProperties(row);

      return rowCellsCount === columnCount;
    });

    if (!columnsCompatableWithRowsData) {
      throw new Error(
        "Nesutampa lentelės stulpelių skaičius su eilučių stulpelių skaičiumi"
      );
    }
  };

  private renderThead = (): void => {
    const { title, columns } = this.props;

    const headersArray = Object.values(columns);
    const headersRowHtmlString = headersArray
      .map((header) => `<th>${header}</th>`)
      .join("");

      const columnLenght = headersArray.length + 1;

      this.thead.className = 'bg-dark text-white';
      this.thead.innerHTML = `
      <tr class="text-center h3">
          <th colspan="${columnLenght}">${title}</th>
      </tr>
      <tr>
            ${headersRowHtmlString}
            <th></th>
        </tr>`;
  };

  private renderTbody = (): void => {
    const { rowsData, columns } = this.props;

    this.tbody.innerHTML = "";
    const rowsHtmlElements = rowsData.map((rowData) => {
      const rowHtmlElement = document.createElement("tr");

      const cellsHtmlString = Object.keys(columns)
        .map((key) => `
        <td>${rowData[key]}</td>
        `,)
        .join(" ");

      
        rowHtmlElement.innerHTML = `${cellsHtmlString}
        <td>
        <button class="btn btn-danger btn-sm text-white fw-bolder">
        ✕</button>
        </td>`;

      return rowHtmlElement;
    });

    this.tbody.append(...rowsHtmlElements);
  };

  private initialize = (): void => {
    this.renderView();

    this.htmlElement.className = "table table-striped order border p-3";
    this.htmlElement.append(this.thead, this.tbody);
  };

  renderView = () => {
    this.renderThead();
    this.renderTbody();
  };

  updateProps = (props: Partial<TableProps<Type>>) => {
    this.props = {
      ...this.props,
      ...props,
    };
  };
}

export default Table;
