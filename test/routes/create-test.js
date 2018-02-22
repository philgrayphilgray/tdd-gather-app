const { assert } = require("chai");
const request = require("supertest");
const { jsdom } = require("jsdom");

const app = require("../../app");
const Item = require("../../models/item");

const { parseTextFromHTML, buildItemObject } = require("../test-utils");
const {
  connectDatabaseAndDropData,
  diconnectDatabase
} = require("../setup-teardown-utils");

const findImageElementBySource = (htmlAsString, src) => {
  const image = jsdom(htmlAsString).querySelector(`img[src="${src}"]`);
  if (image !== null) {
    return image;
  } else {
    throw new Error(`Image with src "${src}" not found in HTML string`);
  }
};

describe("Server path: /items/create", () => {
  const itemToCreate = buildItemObject();

  beforeEach(connectDatabaseAndDropData);

  afterEach(diconnectDatabase);

  // Write your describe blocks below:
  describe("GET", () => {
    it("renders empty input fields", async () => {
      const response = await request(app).get("/items/create");

      assert.equal(parseTextFromHTML(response.text, "input#title-input"), "");
      assert.equal(
        parseTextFromHTML(response.text, "input#imageUrl-input"),
        ""
      );
      assert.equal(
        parseTextFromHTML(response.text, "textarea#description-input"),
        ""
      );
    });
  });

  describe("POST", () => {
    it("creates a new item in the database", async () => {
      const itemToCreate = buildItemObject();
      const response = await request(app)
        .post("/items/create")
        .type("form")
        .send(itemToCreate);

      const createdItem = await Item.findOne(itemToCreate);
      assert.isOk(
        createdItem,
        "Item was not created successfully in the database"
      );
    });

    it("redirects to `/` after creating item in db", async () => {
      const itemToCreate = buildItemObject();
      const response = await request(app)
        .post("/items/create")
        .type("form")
        .send(itemToCreate);

      assert.equal(response.status, 302);
      assert.equal(response.headers.location, "/");
    });

    describe("when a request is made with an invalid item", () => {
      it("displays an error message and the item is not saved to the db", async () => {
        const itemToCreate = {
          description: "dinosaur",
          imageUrl:
            "http://images.dinosaurpictures.org/guanlong_wucaii_by_durbed-d4we433_bf67.jpg"
        };
        const response = await request(app)
          .post("/items/create")
          .type("form")
          .send(itemToCreate);

        const items = await Item.find({});
        assert.equal(items.length, 0);
        assert.equal(response.status, 400);
        assert.include(parseTextFromHTML(response.text, "form"), "required");
      });

      it("displays an error message for no description and item is not saved", async () => {
        const itemToCreate = {
          title: "dino",
          imageUrl:
            "http://images.dinosaurpictures.org/guanlong_wucaii_by_durbed-d4we433_bf67.jpg"
        };
        const response = await request(app)
          .post("/items/create")
          .type("form")
          .send(itemToCreate);

        const items = await Item.find({});
        assert.equal(items.length, 0);
        assert.equal(response.status, 400);
        assert.include(parseTextFromHTML(response.text, "form"), "required");
      });

      it("displays an error message for invalid imageUrl and item is not saved", async () => {
        const itemToCreate = {
          title: "dino",
          description: "dine dino",
          imageUrl: "not a url"
        };

        const response = await request(app)
          .post("/items/create")
          .type("form")
          .send(itemToCreate);

        const items = await Item.find({});
        assert.equal(items.length, 0);
        assert.equal(response.status, 400);
        assert.include(parseTextFromHTML(response.text, "form"), "valid");
      });
    });
  });
});
