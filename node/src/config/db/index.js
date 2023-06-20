const mongoose = require('mongoose');

async function connect() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/20093191');
    console.log('Connect thành công !!!');
  } catch (error) {
    console.log('Connect không thành công');
  }
}
module.exports = { connect };
