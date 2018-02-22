const { assert } = require("chai");
const { buildItemObject } = require("../test-utils");
/*
 * Test Item Constants 
 */

// const imageUrl =
//   "https://upload.wikimedia.org/wikipedia/commons/d/df/Laelaps-cope.jpg";
// const title = "Dryptosaurus";
// const description =
//   "Dryptosaurus was a large, bipedal, ground-dwelling carnivore, that could grow up to 7.5 m (24.6 ft) long.";

/*
 * Tests 
 */

describe("when user submits a new item", () => {
  const { title, description, imageUrl } = buildItemObject();
  beforeEach(() => {
    //setup
    browser.url("/items/create");
    browser.setValue("#title-input", title);
    browser.setValue("#description-input", description);
    browser.setValue("#imageUrl-input", imageUrl);

    // exercise
    browser.click("#submit-button");
  });

  it("displays the new item on the `root` page", () => {
    //verify
    assert.include(browser.getText("#items-container"), title);
  });
  describe("and clicks on the new item", () => {
    // exercise
    browser.click(".item-card a");

    // verify
    assert.include(browser.getText("#item-description"), description);
  });
});
