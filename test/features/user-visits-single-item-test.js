const { assert } = require("chai");
const { buildItemObject } = require("../test-utils");
/*
 * Tests 
 */

describe("when user submits a new item", () => {
  //setup:constants
  const { title, description, imageUrl } = buildItemObject();

  beforeEach(() => {
    //setup:create new item
    browser.url("/items/create");
    browser.setValue("#title-input", title);
    browser.setValue("#description-input", description);
    browser.setValue("#imageUrl-input", imageUrl);
    browser.click("#submit-button");
  });

  it("displays the new item on the `root` page", () => {
    //verify: container text includes item title
    assert.include(browser.getText("#items-container"), title);
  });

  describe("and clicks on the new item", () => {
    it("displays the new item description", () => {
      // exercise: click on item link
      browser.click(".item-card a");

      // verify: item-description block on item page contains new item description
      assert.include(browser.getText("#item-description"), description);
    });
  });
});
