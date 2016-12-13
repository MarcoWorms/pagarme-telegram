const keyboards = require('../keyboards.js')
const messages = require('../messages')

function menu (bot, msg) {
  const chatId = msg.chat.id
  bot.sendMessage(chatId, 'Menu aberto', keyboards.menu)
}

module.exports = {
  message: /\/menu/,
  handler: menu
}

