if (process.env.NODE_ENV === 'test') {
  module.exports = require('./database.test.json');
} else {
  module.exports = require('./database.json');
}
