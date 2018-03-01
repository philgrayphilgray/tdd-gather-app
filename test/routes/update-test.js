const { assert } = require('chai');
const request = require('supertest');

const app = require('../../app');
const Item = require('../../models/item');

const {
  parseTextFromHTML,
  parseValueFromHTML,
  seedItemToDatabase
} = require('../test-utils');
const {
  connectDatabaseAndDropData,
  diconnectDatabase
} = require('../setup-teardown-utils');

describe('Server path: /items/:id/update', () => {
  beforeEach(connectDatabaseAndDropData);
  afterEach(diconnectDatabase);

  describe('GET', () => {
    it('renders the page', async () => {
      const { title, description, imageUrl, _id } = await seedItemToDatabase();
      const response = await request(app).get('/items/' + _id + '/update');
      assert.equal(response.status, 200);
    });
    it('renders the item `title`, `description`, and `imageUrl` as form field values', async () => {
      const { title, description, imageUrl, _id } = await seedItemToDatabase();
      const response = await request(app).get('/items/' + _id + '/update');
      assert.equal(parseValueFromHTML(response.text, '#title-input'), title);
      assert.equal(
        parseTextFromHTML(response.text, '#description-input'),
        description
      );
      assert.equal(
        parseValueFromHTML(response.text, '#imageUrl-input'),
        imageUrl
      );
    });
  });
  describe('POST', () => {
    describe('when a user changes the `title` field and clicks to update', () => {
      it('updates the record for the item in the database', async () => {
        let { title, description, imageUrl, _id } = await seedItemToDatabase();
        title = 'New Title';
        description = 'New description';
        const response = await request(app)
          .post('/items/' + _id + '/update')
          .type('form')
          .send({ title, description, imageUrl });
        const updatedItem = await Item.findOne({
          title,
          description,
          imageUrl
        });
        assert.ok(updatedItem, 'Item was not updated in the db');
      });
      it('redirects to `/` after updating the item in the db', async () => {
        let { title, description, imageUrl, _id } = await seedItemToDatabase();
        title = 'New Title';
        description = 'New description';
        const response = await request(app)
          .post('/items/' + _id + '/update')
          .type('form')
          .send({ title, description, imageUrl });

        assert.equal(response.status, 302);
        assert.equal(response.headers.location, '/');
      });
    });
    describe('when a user attempts to update an item with an invalid value', () => {
      it('displays an error message and the changes are not saved to the db', async () => {
        let { title, description, imageUrl, _id } = await seedItemToDatabase();
        title = '';
        const response = await request(app)
          .post('/items/' + _id + '/update')
          .type('form')
          .send({ title, description, imageUrl });
        const updatedItem = await Item.findOne({
          title,
          description,
          imageUrl
        });
        assert.notOk(updatedItem);
        assert.equal(response.status, 400);
        assert.include(
          parseTextFromHTML(response.text, '.input-form'),
          'required'
        );
      });
    });
  });
});
