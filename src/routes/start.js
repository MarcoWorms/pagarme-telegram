const keyboards = require('../keyboards.js')
const messages = require('../messages')

function start (bot, msg) {
  const chatId = msg.chat.id
  bot.sendMessage(chatId, messages.start, keyboards.menu)
}

module.exports = {
  message: /\/start/,
  handler: start
}

