import { LitElement, html, css } from 'lit';
import './garbage-calendar';

const logo = new URL('../assets/open-wc-logo.svg', import.meta.url).href;

class GarbageDuty extends LitElement {
  static styles = css`
    :host {
      @apply --light-theme;
      background: var(--background);
      color: var(--text);
      display: block;
      min-height: 100vh;
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

    body.light {
      --light-theme: {
        --background: white;
        --text: black;
      }
    }

    body.dark {
      --dark-theme: {
        --background: black;
        --text: white;
      }
    }
  `;

  static properties = {
    members: { type: Array },
    currentDate: { type: Object },
    weeksAhead: { type: Number }, // Add this line
    theme: { type: String },
    themeCSS: {
      type: String,
      reflect: true,
    },
  };

  constructor() {
    super();
    this.members = ['Alice', 'Bob', 'Charlie', 'David'];
    this.currentDate = new Date(2023, 10, 1);
    this.weeksAhead = 0;
    this.theme = 'light';
  }

  updated(changedProperties) {
    if (changedProperties.has('themeCSS')) {
      document.body.style.setProperty(
        '--background',
        this.theme === 'light' ? 'white' : 'black'
      );
      document.body.style.setProperty(
        '--text',
        this.theme === 'light' ? 'black' : 'white'
      );
    }
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
  advanceMonth() {
    // Advance currentDate by 1 month
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);

    this.requestUpdate();
  }

  toggleTheme() {
    if (this.theme === 'light') {
      this.theme = 'dark';
    } else {
      this.theme = 'light';
    }

    this.themeCSS = this.theme === 'light' ? '--light-theme' : '--dark-theme';
  }

  render() {
    const memberNames = Array.from({ length: 6 }, (_, weekIndex) =>
      this.getNextMember(weekIndex)
    ); // Calculate member names for each week
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
        <button @click=${this.advanceMonth}>Next Month</button>
        <garbage-calendar
        .currentDate=${this.currentDate}  // Add this line
        .members=${this.members}
        .weeksAhead=${this.weeksAhead}
          .theme=${this.theme}
          .background=${this.theme === 'light' ? 'white' : 'black'}
          .text=${this.theme === 'light' ? 'black' : 'white'}
        >
        </garbage-calendar>
        <div></div>
      </div>
    `;
  }
}

customElements.define('garbage-duty', GarbageDuty);
