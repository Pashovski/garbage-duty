import { html } from 'lit';
import '../src/garbage-duty.js';

export default {
  title: 'GarbageDuty',
  component: 'garbage-duty',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

function Template({ header, backgroundColor }) {
  return html`
    <garbage-duty
      style="--garbage-duty-background-color: ${backgroundColor || 'white'}"
      .header=${header}
    >
    </garbage-duty>
  `;
}

export const App = Template.bind({});
App.args = {
  header: 'My app',
};
