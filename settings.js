const toBool = (x) => x == 'true'

const settings = {
  packname: '𝙲𝙷𝙰𝙼𝙿-𝙼𝙳',
  author: '〔𝗢𝗚 𝗖𝗛𝗔𝗠𝗣〕√',
  botName: "𝙲𝙷𝙰𝙼𝙿-𝙼𝙳",
  botOwner: '𝗢𝗧𝗙 𝗙𝗔𝗠𝗜𝗟𝗬', // Your name
  ownerNumber: '22896231860', //Set your number here without + symbol, just add country code & number without any space
  giphyApiKey: 'qnl7ssQChTdPjsKta2Ax2LMaGXz303tq',
  commandMode: "public",
  maxStoreMessages: 20, 
  storeWriteInterval: 10000,
  description: "This is a bot for managing group commands and automating tasks.",
  version: "2.2.0",
  updateZipUrl: "",
  sessionID: process.env.SESSION_ID || " ",
};

module.exports = settings;
