import { LitElement, html, css } from 'lit';
import { classMap } from 'lit/directives/class-map.js';

class GarbageCalendar extends LitElement {
  static properties = {
    background: { type: String },
    text: { type: String },
    currentDate: { type: Object },
  };
  static styles = css`
    :host {
      background: var(--background);
    color: var(--text);
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
      width: 14%;
      vertical-align: top;
      text-align: left;
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

    const firstDayOfMonth = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth(),
      1
    );
    const lastDayOfPrevMonth = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth(),
      0
    );
    const daysInPrevMonth = lastDayOfPrevMonth.getDate();
    const firstDayOfWeek = firstDayOfMonth.getDay();
    const lastDayOfMonth = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() + 1,
      0
    );
    const daysInMonth = lastDayOfMonth.getDate();

    const days = [];
    let day = 1;
    let prevMonthDay = daysInPrevMonth - firstDayOfWeek + 1;
    let nextMonthDay = 1;
    for (let i = 0; i < 6; i++) {
      // Assume max 6 weeks in a month
      const week = [];
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDayOfWeek) {
          // Fill in ending days of the previous month
          week.push(prevMonthDay++);
        } else if (day > daysInMonth) {
          // Corrected condition
          // Fill in beginning days of the next month
          week.push(nextMonthDay++);
        } else {
          // Current month's days
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
