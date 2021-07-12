const Asena = require('../events');
const conf = require('../config');
const {MessageType} = require('@adiwajshing/baileys');
const got = require('got');

const Language = require('../language');
const Lang = Language.getString('wallpaper');

let td = conf.WORKTYPE == 'public' ? false : true

Asena.addCommand({pattern: 'quote ?(.*)', fromMe: td, desc: Lang.QUOTE_DESC}, async (message, match) => {
	if (match[1] === 'xxx') return await message.reply(Lang.INVAILD_REQ);
	const url = `https://api.quotable.io/random`;
	try {
		const response = await got(url);
		const json = JSON.parse(response.body);
		if (response.statusCode === 200) return await message.client.sendMessage(message.jid, '*📌 ' + Lang.QUOTE +'* ```' + json.content + '```\n\n' +
		'*✒️' + Lang.AUTHOR +'* ```' + json.author+ '```\n', MessageType.text);
	} catch {
		return await message.client.sendMessage(message.jid, Lang.NOT_FOUND, MessageType.text);
	}
});
