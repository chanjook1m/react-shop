const {loadConfigFromFile, mergeConfig } = require('vite');
const path = require('path');

module.exports = {
  stories: ['../stories/**/*.stories.mdx', '../src/stories/**/*.stories.@(js|jsx|ts|tsx)', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', "storybook-addon-react-router-v6", '@storybook/addon-postcss'],
  core: {
    builder: '@storybook/builder-vite',
  },
  viteFinal: async (config) => {
    const { config: userConfig } = await loadConfigFromFile(
      path.resolve(__dirname, "../vite.config.ts")
    );

    return mergeConfig(config, {
      ...userConfig,
      // manually specify plugins to avoid conflict
      plugins: [],
    });
  },
};