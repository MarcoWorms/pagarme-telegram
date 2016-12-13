const fs = require('fs')
const path = require('path')

module.exports = {
  start: fs.readFileSync(path.join(__dirname, './start'))
}

