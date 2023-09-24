import { LitElement, html, css } from 'lit';
import './garbage-calendar';

const logo = new URL('../assets/open-wc-logo.svg', import.meta.url).href;

class GarbageDuty extends LitElement {
  static styles = css`
    :host {
      display: block;
      height: 100vh;
      font-family: 'Arial', sans-serif;
      text-align: center;
      padding: 20px;
    }
    garbage-calendar {
      flex: 1;
      height: 300px;
    }

    h1 {
      font-size: 2em;
      margin-bottom: 20px;
    }

    div {
      margin: 10px 0;
      font-size: 1.2em;
    }

    .light {
      background: white;
      color: black;
    }

    .dark {
      background: black;
      color: white;
    }
  `;

  static properties = {
    members: { type: Array },
    currentDate: { type: Object },
    weeksAhead: { type: Number }, // Add this line
    theme: { type: String },
  };

  constructor() {
    super();
    this.members = ['Alice', 'Bob', 'Charlie', 'David'];
    this.currentDate = new Date();
    this.weeksAhead = 0;
    this.theme = 'light';
  }

  getNextMember() {
    const weekOfYear = Math.floor(
      (this.currentDate -
        new Date(this.currentDate.getFullYear(), 0, 1) +
        this.weeksAhead * 7 * 24 * 60 * 60 * 1000) /
        604800000
    );
    return this.members[weekOfYear % this.members.length];
  }

  advanceWeek() {
    this.weeksAhead++;
    this.requestUpdate();
  }

  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
  }

  render() {
    const themeClass = {
      light: this.theme === 'light',
      dark: this.theme === 'dark',
    };

    return html`
      <div class=${this.theme}>
        <button @click=${this.toggleTheme}>Toggle Theme</button>
        <h1>Garbage Duty</h1>
        <div>for</div>
        <div>
          ${new Date(
            this.currentDate.getTime() +
              this.weeksAhead * 7 * 24 * 60 * 60 * 1000
          ).toDateString()}
        </div>
        <div>${this.getNextMember()}</div>
        <button @click=${this.advanceWeek}>Next Week</button>
        <garbage-calendar .theme=${this.theme}></garbage-calendar>
        <div></div>
      </div>
    `;
  }
}

customElements.define('garbage-duty', GarbageDuty);
