const { jsdom } = require("jsdom");

const Item = require("../models/item");

// Create and return a sample Item object
const buildItemObject = (options = {}) => {
  const title = options.title || "My favorite item";
  const imageUrl = options.imageUrl || "http://placebear.com/g/200/300.jpg"; //forced image extension
  const description = options.description || "Just the best item";
  return { title, imageUrl, description };
};

// Add a sample Item object to mongodb
const seedItemToDatabase = async (options = {}) => {
  const item = await Item.create(buildItemObject(options));
  return item;
};

// extract text from an Element by selector.
const parseTextFromHTML = (htmlAsString, selector) => {
  const selectedElement = jsdom(htmlAsString).querySelector(selector);
  if (selectedElement !== null) {
    return selectedElement.textContent;
  } else {
    throw new Error(
      `No element with selector ${selector} found in HTML string`
    );
  }
};

const parseAttributeFromHTML = (htmlAsString, selector, attribute) => {
  const selectedElement = jsdom(htmlAsString).querySelector(selector);
  if (selectedElement === null) {
    throw new Error("No element with selector ${selector}.");
  } else if (attribute === null) {
    throw new Error("${attribute} is not a valid attribute.");
  } else {
    return selectedElement.getAttribute(`${attribute}`);
  }
};

module.exports = {
  buildItemObject,
  seedItemToDatabase,
  parseTextFromHTML,
  parseAttributeFromHTML
};
