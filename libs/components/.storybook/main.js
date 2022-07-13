const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
  core: {
    builder: 'webpack5',
  },
  stories: [
    // '../docs/**/*.stories.mdx',
    '../**/*.stories.mdx',
    '../**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    // '../addon/src/preset.js',
  ],
  framework: '@storybook/angular',
  webpackFinal: async (config, { configType }) => {
    // config.plugins.push(
    //   new MonacoWebpackPlugin({
    //     languages: ['typescript'],
    //   })
    // );
    return config;
  },
  babel: async (options) => {
    return {
      ...options,
      presets: [...options.presets, '@babel/preset-react'],
    };
  },
};
