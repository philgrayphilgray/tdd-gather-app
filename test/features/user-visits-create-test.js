const { assert } = require("chai");
const { buildItemObject } = require("../test-utils");

// Add your tests below:

describe("When user visits the create page", () => {
  describe("and submits a new item", () => {
    it("is displayed on the `root` page", () => {
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
