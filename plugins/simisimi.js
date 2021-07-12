const Asena = require('../events');
const conf = require('../config');
const {MessageType} = require('@adiwajshing/baileys');
const got = require('got');

const Language = require('../language');
const Lang = Language.getString('ai');

let td = conf.WORKTYPE == 'public' ? false : true

Asena.addCommand({pattern: 'bot ?(.*)', fromMe: td, desc: Lang.BOT_DESC}, async (message, match) => {
	if (match[1] === 'xxx') return await message.reply(Lang.INVAILD_REQ);
	const url = `https://api.simsimi.net/v1/?text=${match[1]}&lang=en&cf=true`;
	try {
		const response = await got(url);
		const json = JSON.parse(response.body);
	  if (response.statusCode === 200) return await message.client.sendMessage(message.jid, '\n*💬 ' + Lang.BOT_SYM +'* ```' + json.messages[0].response + '```\n\n' , MessageType.text,{quoted: message.data});
	} catch {
		return await message.client.sendMessage(message.jid, Lang.INVAILD_REQ, MessageType.text);
	}
});
