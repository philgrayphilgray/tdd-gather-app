const { assert } = require("chai");
const { buildItemObject } = require("../test-utils");
/*
 * Featue Tests
 * These are optional/reduntant as the server level tests provide reasonable coverage.
 */

describe.skip("when user submits a new item", () => {
  //setup: constants
  const { title, description, imageUrl } = buildItemObject();

  beforeEach(() => {
    // setup: create new item
    browser.url("/items/create");
    browser.setValue("#title-input", title);
    browser.setValue("#description-input", description);
    browser.setValue("#imageUrl-input", imageUrl);
    browser.click("#submit-button");
  });

  it("displays the new item on the `root` page", () => {
    // verify: container text includes item title
    assert.include(browser.getText("#items-container"), title);
  });

  describe("and clicks on the new item", () => {
    beforeEach(() => {
      // exercise: click on item link
      browser.click(".item-card a");
    });

    it("displays the new item description", () => {
      // verify: item-description block on item page contains new item description
      assert.include(browser.getText("#item-description"), description);
    });
    it("displays the new item image", () => {
      // verify: .single-item-img `src` is equal to new item `imageUrl`
      assert.equal(
        browser.getAttribute(".single-item-img img", "src"),
        imageUrl
      );
    });
  });
});
