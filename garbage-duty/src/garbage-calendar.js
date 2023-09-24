import { LitElement, html, css } from 'lit';

class GarbageCalendar extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 80%;
      height: 100%;
      margin: 0 auto;
    }

    table {
      width: 100%;
      height: 100%
      border-collapse: collapse;
    }

    td {
      border: 1px solid black;
      padding: 5px;
      display: table-cell;
      height: 100px;
    }
    tr {
      display: table-row;
    }
  `;
  render() {
    return html`
      <table>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </table>
    `;
  }
}

customElements.define('garbage-calendar', GarbageCalendar);
