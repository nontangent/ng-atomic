module.exports = {
  "stories": [
    "../docs/**/*.stories.mdx",
    "../libs/components/**/*.stories.mdx",
    "../libs/components/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  "framework": "@storybook/angular"
}