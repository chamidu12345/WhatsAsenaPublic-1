const Asena = require('../events');
const conf = require('../config');
const {MessageType, MessageOptions, Mimetype} = require('@adiwajshing/baileys');
const fs = require('fs');
const axios = require('axios');

const Language = require('../language');
const Lang = Language.getString('wallpaper');

let td = conf.WORKTYPE == 'public' ? false : true

Asena.addCommand({ pattern: 'nekoanime', fromMe: td, desc: Lang.NA_DESC}, async (message, match) => {

    await axios
      .get(`https://videfikri.com/api/anime/neko`)
      .then(async (response) => {
        const {
          url_gbr,
        } = response.data.result

        const imageBuffer = await axios.get(url_gbr, {
          responseType: 'arraybuffer',
        })

        await message.sendMessage(Buffer.from(imageBuffer.data), MessageType.image, {
          caption: "*Made By WhatsAsenaPublic*"
        })
      })
  },
)
