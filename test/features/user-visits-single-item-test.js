const { assert } = require("chai");
const { buildItemObject } = require("../test-utils");

describe("When a user visits a single item", () => {
  //setup: constants
  const { title, description, imageUrl, _id } = buildItemObject();

  beforeEach(() => {
    // setup: create new item
    browser.url("/items/create");
    browser.setValue("#title-input", title);
    browser.setValue("#description-input", description);
    browser.setValue("#imageUrl-input", imageUrl);
    browser.click("#submit-button");
    // exercise: click on item link
    browser.click(".item-card a");
  });

  it("displays the item description", () => {
    // verify: item-description block on item page contains new item description
    assert.include(browser.getText("#item-description"), description);
  });
  it("displays the item image", () => {
    // verify: .single-item-img `src` is equal to new item `imageUrl`
    assert.equal(browser.getAttribute(".single-item-img img", "src"), imageUrl);
  });
});
