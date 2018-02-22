const { assert } = require("chai");
const request = require("supertest");

const app = require("../../app");

const {
  parseTextFromHTML,
  parseAttributeFromHTML,
  seedItemToDatabase
} = require("../test-utils");
const {
  connectDatabaseAndDropData,
  diconnectDatabase
} = require("../setup-teardown-utils");

describe("Server path: /items/:id", () => {
  beforeEach(connectDatabaseAndDropData);

  afterEach(diconnectDatabase);

  // Write your test blocks below:
  describe("GET", () => {
    it("renders the item title, description, and image", async () => {
      //setup
      const { _id, title, description, imageUrl } = await seedItemToDatabase();
      const response = await request(app).get("/items/" + _id);

      assert.equal(parseTextFromHTML(response.text, "#item-title"), title);
      assert.equal(
        parseTextFromHTML(response.text, "#item-description"),
        description
      );
      assert.equal(
        parseAttributeFromHTML(response.text, ".single-item-img img", "src"),
        imageUrl
      );
    });
  });
});
