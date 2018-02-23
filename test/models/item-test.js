const Item = require("../../models/item");
const { assert } = require("chai");
const { mongoose, databaseUrl, options } = require("../../database");

describe("Model: Item", () => {
  beforeEach(async () => {
    await mongoose.connect(databaseUrl, options);
    await mongoose.connection.db.dropDatabase();
  });

  afterEach(async () => {
    await mongoose.disconnect();
  });

  // Write your tests below:
  describe("#title", () => {
    it("is a String", () => {
      const title = 3;
      const item = new Item({ title });
      assert.strictEqual(item.title, title.toString());
    });

    it("is required", () => {
      const title = "";
      const item = new Item({ title });
      item.validateSync();
      assert.equal(item.errors.title.message, "Path `title` is required.");
    });
  });

  describe("#description", () => {
    it("is a String", () => {
      const description = "The hairy dinosaur";
      const item = new Item({ description });
      assert.strictEqual(item.description, description.toString());
    });

    it("is required", () => {
      const description = "";
      const item = new Item({ description });
      item.validateSync();
      assert.equal(
        item.errors.description.message,
        "Path `description` is required."
      );
    });
  });
  describe("#imageUrl", () => {
    it("is required", () => {
      const imageUrl = "";
      const item = new Item({ imageUrl });
      item.validateSync();
      assert.include(
        item.errors.imageUrl.message,
        "Path `imageUrl` is required."
      );
    });
    it("is an image", () => {
      const imageUrl = "http://www.google.com";
      const item = new Item({ imageUrl });
      item.validateSync();
      assert.include(
        item.errors.imageUrl.message,
        "Please provide a valid image URL."
      );
    });
  });
});
