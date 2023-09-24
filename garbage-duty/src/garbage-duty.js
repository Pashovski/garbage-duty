import { LitElement, html, css } from 'lit';

const logo = new URL('../assets/open-wc-logo.svg', import.meta.url).href;

class GarbageDuty extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: 'Arial', sans-serif;
      text-align: center;
      padding: 20px;
    }

    h1 {
      font-size: 2em;
      margin-bottom: 20px;
    }

    div {
      margin: 10px 0;
      font-size: 1.2em;
    }
  `;

  static properties = {
    members: { type: Array },
    currentDate: { type: Object },
    weeksAhead: { type: Number }, // Add this line
  };

  constructor() {
    super();
    this.members = ['Alice', 'Bob', 'Charlie', 'David'];
    this.currentDate = new Date();
    this.weeksAhead = 0;
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

  render() {
    return html`
      <h1>Garbage Duty</h1>
      <div>for</div>
      <div>
        ${new Date(
          this.currentDate.getTime() + this.weeksAhead * 7 * 24 * 60 * 60 * 1000
        ).toDateString()}
      </div>
      <div>${this.getNextMember()}</div>
      <button @click=${this.advanceWeek}>Next Week</button>
    `;
  }
}

customElements.define('garbage-duty', GarbageDuty);
