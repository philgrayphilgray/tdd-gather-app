const { assert } = require('chai');
const { buildItemObject } = require('../test-utils');

describe('When a user navigates to the update page', () => {
  //setup: constants
  const { title, description, imageUrl, _id } = buildItemObject();

  beforeEach(() => {
    // setup: create new item
    browser.url('/items/create');
    browser.setValue('#title-input', title);
    browser.setValue('#description-input', description);
    browser.setValue('#imageUrl-input', imageUrl);
    browser.click('#submit-button');
    // exercise: click on item link
    browser.click('.item-card a');
    browser.click('.update-button');
  });

  describe('and changes the value of the `image` field', () => {
    it('displays the image of the updated `imageUrl`', () => {
      const newImageUrl =
        'http://images.dinosaurpictures.org/guanlong_wucaii_by_durbed-d4we433_bf67.jpg';
      browser.setValue('#imageUrl-input', newImageUrl);
      assert.equal(browser.getAttribute('#created-image', 'src'), newImageUrl);
    });
  });
  describe('and changes the `title` and clicks the `Update` button', () => {
    it('displays the updated `title` on the root page', () => {
      const newTitle = 'New Fake Title';
      browser.setValue('#title-input', newTitle);
      browser.click('.submit-button');
      assert.include(browser.getText('body'), newTitle);
    });
  });
});
