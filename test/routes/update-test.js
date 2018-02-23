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

describe("Server path: /items/:id/update", () => {
  beforeEach(connectDatabaseAndDropData);
  afterEach(diconnectDatabase);

  describe("GET", () => {
    it("renders the page", async () => {
      const { _id, title, description, imageUrl } = seedItemToDatabase();
      const response = await request(app).get("/items/" + _id + "/update");
      assert.equal(response.status, 200);
    });
  });
});
