const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Item",
  // Define your model schema below:
  mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    imageUrl: {
      type: String,
      required: true,
      validate: {
        validator: function(v) {
          return /(https?:\/\/.*\.(?:png|jpg))/i.test(v);
        },
        message: "Path `imageUrl` must be a valid image URL."
      }
    }
  })
);
