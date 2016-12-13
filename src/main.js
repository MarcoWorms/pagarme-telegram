const TelegramBot = require('node-telegram-bot-api')
const routes = require('./routes')
const keys = require('./keys')

function startBot (key, config = { polling: true }) {
  return new TelegramBot(key, config)
}

const bot = startBot(keys.BOT)

routes.forEach((route) => {
  bot.onText(route.message, route.handler.bind(null, bot))
})

bot.on('message', (msg) => {
  console.log(msg)
})
