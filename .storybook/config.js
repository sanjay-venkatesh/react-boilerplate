import { addDecorator, addParameters, configure } from '@storybook/react';
import { create } from '@storybook/theming';

function loadStories() {
    const components = require.context('../src/components', true, /\.story\.js$/);
    components.keys().forEach(filename => components(filename));
  }

addParameters({
    options: {
        theme: create({
            brandTitle: 'Mock-UI'
        }),
        panelPosition: 'right'
    }
});

configure(loadStories, module);
