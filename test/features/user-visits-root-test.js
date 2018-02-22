const { assert } = require("chai");
const { buildItemObject } = require("../test-utils");

describe("When user visits root", () => {
  describe("without existing items", () => {
    it("starts blank", () => {
      browser.url("/");
      assert.equal(browser.getText("#items-container"), "");
    });
  });
  describe("and clicks a link to navigate to `/items/create`", () => {
    it("navigates to `/items/create`", () => {
      //setup
      browser.url("/");

      // exercise
      browser.click("a[href='/items/create']");

      //verify
      assert.include(browser.getText("body"), "Create");
    });
  });
  describe("and submits a new item", () => {
    //setup: constants
    const { title, description, imageUrl, _id } = buildItemObject();

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

    // the tests below could be moved to user-visits-root-test
  });

  describe("and clicks a button to delete an item", () => {
    //setup: constants
    const { title, description, imageUrl, _id } = buildItemObject();

    beforeEach(() => {
      // setup: create new item
      browser.url("/items/create");
      browser.setValue("#title-input", title);
      browser.setValue("#description-input", description);
      browser.setValue("#imageUrl-input", imageUrl);
      browser.click("#submit-button");
    });
    it("is not displayed on the `root` page", () => {
      //exercise: click the element to delete
      browser.submitForm(".delete-form");
      // verify
      assert.notInclude(browser.getText("#items-container"), title);
    });
  });
});
