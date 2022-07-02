const { resolve } = require('path');

function managerEntries(entry = []) {
  return [...entry, require.resolve(resolve(__dirname, './register.tsx'))];
}

module.exports = { managerEntries };
