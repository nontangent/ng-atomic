const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
  stories: [
    "../docs/**/*.stories.mdx",
    "../libs/components/**/*.stories.mdx",
    "../libs/components/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "../addon/src/preset.js",
  ],
  framework: "@storybook/angular",
  webpackFinal: async (config, { configType }) => {
    return config;
  },
  babel: async (options) => {
    return {
      ...options,
      presets: [...options.presets, "@babel/preset-react"],
    };
  },
}