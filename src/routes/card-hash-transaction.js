const keyboards = require('../keyboards.js')
const message = require('../messages')
const keys = require('../keys.js')
const axios = require('axios')

function criarTransacao (bot, msg) {
  const chatId = msg.chat.id
  bot.sendMessage(chatId, 'Responda essa mensagem com a foto do QRCode do card_hash', keyboards.transactions)
    .then((msgSent) => {
      bot.onReplyToMessage(chatId, msgSent.message_id, readQR.bind(null, bot))
    })
}

function readQR (bot, reply) {
  if (!reply.photo) { return }
  bot.getFile(reply.photo[reply.photo.length-1].file_id)
    .then((file) => {
      photoURL = 'https://api.telegram.org/file/bot'+keys.BOT+'/'+file.file_path
      return axios
        .get('http://api.qrserver.com/v1/read-qr-code/?fileurl=' + encodeURIComponent(photoURL))
    })
    .then(res => {
      const card_hash = res.data[0].symbol[0].data
      axios
        .post('https://api.pagar.me/1/transactions',{
          api_key: keys.PAGARME,
          amount: '1000',
          card_hash
        })
        .then(response => {
          bot.sendMessage(reply.chat.id, 'Compra efetuada!', keyboards.menu)
        })
        .catch(error => console.log(error.response.data))
    })
}

module.exports = {
  message: /Criar Transação/,
  handler: criarTransacao
}

