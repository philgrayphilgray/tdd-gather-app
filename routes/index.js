const router = require("express").Router();

const Item = require("../models/item");

router.get("/", async (req, res, next) => {
  const items = await Item.find({});
  res.render("index", { items });
});

// Add additional routes below:
router.get("/items/create", (req, res, next) => {
  res.render("create");
});

router.post("/items/create", async (req, res, next) => {
  const { title, description, imageUrl } = req.body;

  const newItem = new Item({ title, description, imageUrl });
  newItem.validateSync();
  if (newItem.errors) {
    res.status(400).render("create", { newItem: newItem });
  } else {
    await newItem.save();
    res.redirect("/");
    res.status = 302;
  }
});

router.get("/items/:itemId", async (req, res, next) => {
  const selectedItem = await Item.findById({ _id: req.params.itemId });
  res.render("single-item", { selectedItem });
});

module.exports = router;