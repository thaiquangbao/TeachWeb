const mongoose = require('mongoose');

async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_DB);
    console.log('Connect thành công !!!');
  } catch (error) {
    console.log('Connect không thành công');
  }
}
module.exports = { connect };
