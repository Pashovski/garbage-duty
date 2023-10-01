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
      height: 100%cu
      border-collapse: collapse;
    }

    td {
      border: 1px solid black;
      padding: 5px;
      display: table-cell;
      height: 100px;
      width: 14%;
      vertical-align: top;
      text-align: left;
    }
    tr {
      display: table-row;
    }
  `;

  render() {
    const currentDate = new Date();
    const firstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const lastDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );
    const daysInMonth = lastDayOfMonth.getDate();

    const themeClass = {
      light: this.theme === 'light',
      dark: this.theme === 'dark',
    };
    const days = [];
    let day = 1;
    const firstDayOfWeek = firstDayOfMonth.getDay();
    for (let i = 0; i < 5; i++) {
      // Assume max 6 weeks in a month
      const week = [];
      for (let j = 0; j < 7; j++) {
        if ((i === 0 && j < firstDayOfWeek) || day > daysInMonth) {
          week.push(''); // Empty day cell
        } else {
          week.push(day++);
        }
      }
      days.push(week);
    }
    return html`
      <div class=${classMap(themeClass)}>
        <table>
          <tr>
            <td>Sun</td>
            <td>Mon</td>
            <td>Tue</td>
            <td>Wed</td>
            <td>Thu</td>
            <td>Fri</td>
            <td>Sat</td>
          </tr>
          ${days.map(
            week => html`
              <tr>
                ${week.map(day => html` <td>${day}</td> `)}
              </tr>
            `
          )}
        </table>
      </div>
    `;
  }
}

customElements.define('garbage-calendar', GarbageCalendar);
