const keyboards = require('../keyboards.js')
const message = require('../messages')
const keys = require('../keys.js')
const axios = require('axios')

function criarBoleto (bot, msg) {
  const chatId = msg.chat.id
  bot.sendMessage(chatId, 'Responda essa mensagem com o valor do boleto a ser gerado.', keyboards.transactions)
    .then((msgSent) => {
      bot.onReplyToMessage(chatId, msgSent.message_id, reqBoleto.bind(null, bot))
    })
}

function reqBoleto (bot, reply) {
  axios
    .post('https://api.pagar.me/1/transactions',{
      api_key: keys.PAGARME,
      amount: reply.text,
      payment_method: 'boleto',
    })
    .then(response => bot.sendMessage(reply.chat.id, 'Boleto criado: '+response.data.boleto_url, keyboards.menu))
    .catch(error => console.log(error.response.data))
}

module.exports = {
  message: /Criar Boleto/,
  handler: criarBoleto
}

