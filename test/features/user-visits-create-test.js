const { assert } = require("chai");
const { buildItemObject } = require("../test-utils");

// Add your tests below:

describe("user visits the create page", () => {
  describe("user posts a new item", () => {
    it("renders", () => {
      //setup
      const { title, description, imageUrl } = buildItemObject();
      browser.url("/items/create");

      // exercise
      browser.setValue("#title-input", title);
      browser.setValue("#description-input", description);
      browser.setValue("#imageUrl-input", imageUrl);
      browser.click("#submit-button");

      //verify
      assert.include(browser.getText("body"), title);
      assert.include(browser.getAttribute("body img", "src"), imageUrl);
    });
  });
});
