const mongoose = require('mongoose');

const animalsSchema = new mongoose.Schema({
  name: {
    type: String,
  }
})

const Animals = mongoose.model("Animals", animalsSchema);

module.exports = Animals;