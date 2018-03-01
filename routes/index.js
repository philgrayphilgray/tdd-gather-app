const router = require('express').Router();

const Item = require('../models/item');

router.get('/', async (req, res, next) => {
  const items = await Item.find({});
  res.render('index', { items });
});

// Add additional routes below:
router.get('/items/create', (req, res, next) => {
  res.render('create');
});

router.post('/items/create', async (req, res, next) => {
  const { title, description, imageUrl } = req.body;

  const newItem = new Item({ title, description, imageUrl });
  newItem.validateSync();
  if (newItem.errors) {
    res.status(400).render('create', { newItem });
  } else {
    await newItem.save();
    res.redirect('/');
    res.status = 302;
  }
});

router.get('/items/:itemId', async (req, res, next) => {
  const selectedItem = await Item.findById({ _id: req.params.itemId });
  res.render('single-item', { selectedItem });
});

router.post('/items/:itemId/delete', async (req, res, next) => {
  const selectedItem = await Item.findById({ _id: req.params.itemId });
  await selectedItem.remove();
  res.redirect('/');
  res.status = 302;
});

router.get('/items/:itemId/update', async (req, res, next) => {
  const selectedItem = await Item.findById({ _id: req.params.itemId });
  res.status(200).render('update', { selectedItem });
});

router.post('/items/:itemId/update', async (req, res, next) => {
  const selectedItem = await Item.findById(req.params.itemId);
  const { title, description, imageUrl } = req.body;
  const newItem = new Item({
    ...selectedItem,
    title,
    description,
    imageUrl,
    _id: req.params.itemId
  });
  newItem.validateSync();
  if (newItem.errors) {
    res.status(400).render('update', { selectedItem: newItem });
  } else {
    // To turn on update validators, set the runValidators option.
    const updateOptions = { runValidators: true };
    try {
      const updatedItem = await Item.findByIdAndUpdate(
        req.params.itemId,
        {
          title,
          description,
          imageUrl
        },
        updateOptions
      );

      updatedItem.validateSync();

      res.redirect('/');
      res.status = 302;
    } catch (error) {
      res.status(400).render('update', { selectedItem });
    }
  }
});

module.exports = router;
