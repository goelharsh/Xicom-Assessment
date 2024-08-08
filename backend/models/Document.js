const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true
  },
  typeOfFile: {
    type: String,
    required: true
  },
  document: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Document', DocumentSchema);
