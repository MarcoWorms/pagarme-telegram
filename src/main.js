const TelegramBot = require('node-telegram-bot-api')
const controller = require('./controller')
const keys = require('./keys')

function startBot(config = { polling: true }) {
  return new TelegramBot(keys.BOT, config)
}

const bot = startBot()

controller.init(bot, keys.PAGARME)

