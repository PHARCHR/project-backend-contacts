const mongoose = require("mongoose");
const contactSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 50,
    minlength: 2,
  },
  number: {
    type: Number,
    required: true,
    maxlength: 10,
    minlength: 10,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
});
module.exports = mongoose.model("Contact", contactSchema);
