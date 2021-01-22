console.log(process.env.NODE_ENV)
console.log(process.env.APP_SECRET)

if (process.env.NODE_ENV === 'test') {
  module.exports = require('./database.test.json');
} else if (process.env.NODE_ENV === 'prod') {
  module.exports = require('./database.prod.json');
}
else {
  module.exports = require('./database.json');
}
