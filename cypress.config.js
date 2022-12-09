const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern:
      "**/*.{js,jsx,ts,tsx}",
      excludeSpecPattern:
      "cypress/support/**/*.{js,jsx,ts,tsx}"
  }
});
