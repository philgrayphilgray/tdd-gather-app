const { assert } = require("chai");
const request = require("supertest");
const { jsdom } = require("jsdom");

const app = require("../../app");
const Item = require("../../models/item");

const {
  parseTextFromHTML,
  buildItemObject,
  seedItemToDatabase
} = require("../test-utils");
const {
  connectDatabaseAndDropData,
  diconnectDatabase
} = require("../setup-teardown-utils");

describe("Server path: /items/:id/delete", () => {
  beforeEach(connectDatabaseAndDropData);
  afterEach(diconnectDatabase);

  describe("POST", () => {
    it("redirects to `/` after deleting item in db", async () => {
      const { _id, title, description } = await seedItemToDatabase();
      const response = await request(app).post("/items/" + _id + "/delete");
      assert.equal(response.status, 302);
      assert.equal(response.headers.location, "/");
    });

    it("does not render the deleted item", async () => {
      const { _id, title, description } = await seedItemToDatabase();
      const response = await request(app).post("/items/" + _id + "/delete");
      const deletedItem = await Item.findById({ _id });
      assert.notOk(deletedItem);
    });
  });
});
