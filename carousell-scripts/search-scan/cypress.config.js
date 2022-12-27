const { defineConfig } = require('cypress');

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  video: false,
  screenshotsFolder: 'images',
  e2e: {
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);

      // return require("./cypress/plugins/index.js")(on, config);
    },
  },
});
