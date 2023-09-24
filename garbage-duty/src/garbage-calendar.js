import { LitElement, html, css } from 'lit';
import { classMap } from 'lit/directives/class-map.js';

class GarbageCalendar extends LitElement {
  static properties = {
    theme: { type: String },
  };
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
    const themeClass = {
      light: this.theme === 'light',
      dark: this.theme === 'dark',
    };
    return html`
      <div class=${classMap(themeClass)}>
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
      </div>
    `;
  }
}

customElements.define('garbage-calendar', GarbageCalendar);
