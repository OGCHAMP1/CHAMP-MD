const settings = require('../settings');
const fs = require('fs');
const path = require('path');

async function helpCommand(sock, chatId, message) {
    const helpMessage = `
*╭────(* *༒𝙲𝙷𝙰𝙼𝙿-𝙼𝙳༒* *)──╮*
*│* 友 ɴᴀᴍᴇ ʙᴏᴛ : 𝙲𝙷𝙰𝙼𝙿-𝙼𝙳
*│* 友 ᴠᴇʀsɪᴏɴ : 2.0 ᴍᴇᴛᴀ
*│* 友 ᴛᴇʟᴇɢʀᴀᴍ ᴅᴇᴠᴇʟᴏᴘᴇʀ  : t.me/OGCHAMP2
*│* 友 ɪɴғᴏʀᴍᴀᴛɪᴏɴ : t.me/weareunlimitedtech
*╰────────────────────╯*

*𝗦𝗖𝗥𝗢𝗟𝗟 𝗗𝗢𝗪𝗡 𝗙𝗢𝗥 𝗖𝗠𝗗:*

╭─「📁*GENERAL»*
*│* ✧ .help or .menu
*│* ✧ .ping
*│* ✧ .alive
*│* ✧ .tts <text>
*│* ✧ .owner
*│* ✧ .joke
*│* ✧ .quote
*│* ✧ .fact
*│* ✧ .weather <city>
*│* ✧ .news
*│* ✧ .attp <text>
*│* ✧ .lyrics <song_title>
*│* ✧ .8ball <question>
*│* ✧ .groupinfo
*│* ✧ .staff or .admins 
*│* ✧ .vv
*│* ✧ .trt <text> <lang>
*│* ✧ .ss <link>
*│* ✧ .jid
*│* ✧ .url
╰━━━━━━━━━━━━━━━━━━⭓ 

╭─«📁 *ADMIN»*
*│* ✯ .ban @user
*│* ✯ .promote @user
*│* ✯ .demote @user
*│* ✯ .mute <minutes>
*│* ✯ .unmute
*│* ✯ .delete or .del
*│* ✯ .kick @user
*│* ✯ .warnings @user
*│* ✯ .warn @user
*│* ✯ .antilink
*│* ✯ .antibadword
*│* ✯ .clear
*│* ✯ .tag <message>
*│* ✯ .tagall
*│* ✯ .tagnotadmin
*│* ✯ .hidetag <message>
*│* ✯ .chatbot
*│* ✯ .resetlink
*│* ✯ .antitag <on/off>
*│* ✯ .welcome <on/off>
*│* ✯ .goodbye <on/off>
*│* ✯ .setgdesc <description>
*│* ✯ .setgname <new name>
*│* ✯ .setgpp (reply to image)
╰━━━━━━━━━━━━━━━━━━⭓

╭─«📁 *OWNER»*
*│* ☠︎︎ .mode <public/private>
*│* ☠︎ .clearsession
*│* ☠︎ .antidelete
*│* ☠︎ .cleartmp
*│* ☠︎ .update
*│* ☠︎ .settings
*│* ☠︎ .setpp <reply to image>
*│* ☠︎ .autoreact <on/off>
*│* ☠︎ .autostatus <on/off>
*│* ☠︎ .autostatus react <on/off>
*│* ☠︎ .autotyping <on/off>
*│* ☠︎ .autoread <on/off>
*│* ☠︎ .anticall <on/off>
*│* ☠︎ .pmblocker <on/off/status>
*│* ☠︎ .pmblocker setmsg <text>
*│* ☠︎ .setmention <reply to msg/media>
*│* ☠︎ .mention <on/off>
╰━━━━━━━━━━━━━━━━━━⭓

╭─「«📁 *IMAGE/STICKER»*
*│* ⏣ .blur <image>
*│* ⏣ .simage <reply to sticker>
*│* ⏣ .sticker <reply to image>
*│* ⏣ .removebg
*│* ⏣ .remini
*│* ⏣ .crop <reply to image>
*│* ⏣ .tgsticker <Link>
*│* ⏣ .meme
*│* ⏣ .take <packname> 
*│* ⏣ .emojimix <emj1>+<emj2>
*│* ⏣ .igs <insta link>
*│* ⏣ .igsc <insta link>
╰━━━━━━━━━━━━━━━━━━⭓  

╭─「«📁 *PIES»*
*│* ⏣ .pies <country>
*│* ⏣ .china 
*│* ⏣ .indonesia 
*│* ⏣ .japan 
*│* ⏣ .korea 
*│* ⏣ .hijab
╰━━━━━━━━━━━━━━━━━━⭓

╭─「«📁 *GAMES»*
*│* ⏣ .tictactoe @user
*│* ⏣ .hangman
*│* ⏣ .guess <letter>
*│* ⏣ .trivia
*│* ⏣ .answer <answer>
*│* ⏣ .truth
*│* ⏣ .dare
╰━━━━━━━━━━━━━━━━━━⭓

╭─「«📁 *AI»*
*│* ⏣ .gpt <question>
*│* ⏣ .gemini <question>
*│* ⏣ .imagine <prompt>
*│* ⏣ .flux <prompt>
*│* ⏣ .sora <prompt>
╰━━━━━━━━━━━━━━━━━━⭓

╭─「«📁 *FUN»*
*│* ⏣ .compliment @user
*│* ⏣ .insult @user
*│* ⏣ .flirt 
*│* ⏣ .shayari
*│* ⏣ .goodnight
*│* ⏣ .roseday
*│* ⏣ .character @user
*│* ⏣ .wasted @user
*│* ⏣ .ship @user
*│* ⏣ .simp @user
*│* ⏣ .stupid @user [text]
╰━━━━━━━━━━━━━━━━━━⭓

╭─「«📁 *TEXT MAKER»*
*│* ⏣ .metallic <text>
*│* ⏣ .ice <text>
*│* ⏣ .snow <text>
*│* ⏣ .impressive <text>
*│* ⏣ .matrix <text>
*│* ⏣ .light <text>
*│* ⏣ .neon <text>
*│* ⏣ .devil <text>
*│* ⏣ .purple <text>
*│* ⏣ .thunder <text>
*│* ⏣ .leaves <text>
*│* ⏣ .1917 <text>
*│* ⏣ .arena <text>
*│* ⏣ .hacker <text>
*│* ⏣ .sand <text>
*│* ⏣ .blackpink <text>
*│* ⏣ .glitch <text>
*│* ⏣ .fire <text>
╰━━━━━━━━━━━━━━━━━━⭓

╭─「«📁 *DOWNLOADER»*
*│* ⏣ .play <song_name>
*│* ⏣ .song <song_name>
*│* ⏣ .spotify <query>
*│* ⏣ .instagram <link>
*│* ⏣ .facebook <link>
*│* ⏣ .tiktok <link>
*│* ⏣ .video <song name>
*│* ⏣ .ytmp4 <Link>
╰━━━━━━━━━━━━━━━━━━⭓

╭─「«📁 *MISC»*
*│* ⏣ .heart
*│* ⏣ .horny
*│* ⏣ .circle
*│* ⏣ .lgbt
*│* ⏣ .lolice
*│* ⏣ .its-so-stupid
*│* ⏣ .namecard 
*│* ⏣ .oogway
*│* ⏣ .tweet
*│* ⏣ .ytcomment 
*│* ⏣ .comrade 
*│* ⏣ .gay 
*│* ⏣ .glass 
*│* ⏣ .jail 
*│* ⏣ .passed 
*│* ⏣ .triggered
╰━━━━━━━━━━━━━━━━━━⭓

╭─「«📁 *ANIME»*
*│* ⏣ .neko
*│* ⏣ .waifu
*│* ⏣ .loli
*│* ⏣ .nom 
*│* ⏣ .poke 
*│* ⏣ .cry 
*│* ⏣ .kiss 
*│* ⏣ .pat 
*│* ⏣ .hug 
*│* ⏣ .wink 
*│* ⏣ .facepalm 
╰━━━━━━━━━━━━━━━━━━⭓

╭─「«📁 *GITHUB»*
*│* ⏣ .git
*│* ⏣ .github
*│* ⏣ .sc
*│* ⏣ .script
*│* ⏣ .repo
╰━━━━━━━━━━━━━━━━━━⭓

𝗝𝗢𝗜𝗡 𝗢𝗨𝗥 𝗖𝗛𝗔𝗡𝗡𝗘𝗟 𝗙𝗢𝗥 𝗠𝗢𝗥𝗘 𝗨𝗣𝗗𝗔𝗧𝗘𝗦
https://whatsapp.com/channel/0029VaN2eQQ59PwNixDnvD16 :`;

    try {
        const imagePath = path.join(__dirname, '../assets/bot_image.jpg');
        
        if (fs.existsSync(imagePath)) {
            const imageBuffer = fs.readFileSync(imagePath);
            
            await sock.sendMessage(chatId, {
                image: imageBuffer,
                caption: helpMessage,
                contextInfo: {
                    forwardingScore: 1,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363230090465542@newsletter',
                        newsletterName: '𝙲𝙷𝙰𝙼𝙿-𝙼𝙳 𝗨𝗣𝗗𝗔𝗧𝗘',
                        serverMessageId: -1
                    }
                }
            },{ quoted: message });
        } else {
            console.error('Bot image not found at:', imagePath);
            await sock.sendMessage(chatId, { 
                text: helpMessage,
                contextInfo: {
                    forwardingScore: 1,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363230090465542@newsletter',
                        newsletterName: '𝙲𝙷𝙰𝙼𝙿-𝙼𝙳 UPDATE',
                        serverMessageId: -1
                    } 
                }
            });
        }
    } catch (error) {
        console.error('Error in help command:', error);
        await sock.sendMessage(chatId, { text: helpMessage });
    }
}

module.exports = helpCommand;
