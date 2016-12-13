const keyboards = require('../keyboards.js')
const message = require('../messages')
const keys = require('../keys.js')
const axios = require('axios')

const statusEmoji = {
  waiting_payment: '\u{2B55}',
  authorized: '\u{2B55}',
  paid: '\u{2705}',
  refunded: '\u{274C}',
  refused: '\u{274C}',
  processing: '\u{2B55}',
  pending_refund: '\u{2757}',
}

const methodEmoji = {
  credit_card: '\u{1F4B3}',
  boleto: '\u{1F4D1}',
}

function transactions (bot, msg) {
  const chatId = msg.chat.id
  axios
    .get('https://api.pagar.me/1/transactions',{
      params: {
        api_key: keys.PAGARME,
        count: 10
      }
    })
    .then(parseTransactions)
    .then(sendText.bind(bot, chatId))
    .catch(console.log)
}

function parseTransactions (response) {
  return response.data
    .reduce((list, transaction) => {
      return list + '\n' +
        `${methodEmoji[transaction.payment_method]}${statusEmoji[transaction.status]} R$ ${Number(transaction.amount/100).toFixed(2).toLocaleString()}`
    }, 'Transações recentes:\n')
}

function sendText (chatId, message) {
  this.sendMessage(chatId, message + '\n\n Voltar para o menu: /menu', keyboards.menu)
}

module.exports = {
  message: /Transações/,
  handler: transactions
}

