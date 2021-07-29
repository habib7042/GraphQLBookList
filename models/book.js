const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  name: String,
  genres: String,
  authorid: String,
});

module.exports= mongoose.model('Book', bookSchema)