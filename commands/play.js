const yts = require('yt-search');
const axios = require('axios');

async function playCommand(sock, chatId, message) {
    try {
        const text =
            message.message?.conversation ||
            message.message?.extendedTextMessage?.text;

        const searchQuery = text.split(' ').slice(1).join(' ').trim();

        if (!searchQuery) {
            return await sock.sendMessage(chatId, {
                text: "What song do you want to download?"
            });
        }

        // Search YouTube
        const { videos } = await yts(searchQuery);

        if (!videos || videos.length === 0) {
            return await sock.sendMessage(chatId, {
                text: "No songs found!"
            });
        }

        // Loading message
        await sock.sendMessage(chatId, {
            text: "_Please wait, your download is in progress..._"
        });

        // Get first YouTube result
        const video = videos[0];
        const urlYt = video.url;

        // Fetch mp3 from PrinceTech API
        const apiUrl = `https://api.princetechn.com/api/download/ytmp3?apikey=prince&url=${encodeURIComponent(urlYt)}`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        if (!data || !data.url) {
            return await sock.sendMessage(chatId, {
                text: "Failed to fetch audio from the API. Please try again later."
            });
        }

        const audioUrl = data.url;
        const title = data.title || video.title || "audio";

        // Send audio
        await sock.sendMessage(
            chatId,
            {
                audio: { url: audioUrl },
                mimetype: "audio/mpeg",
                fileName: `${title}.mp3`
            },
            { quoted: message }
        );

    } catch (error) {
        console.error("Error in play command:", error);
        await sock.sendMessage(chatId, {
            text: "Download failed. Please try again later."
        });
    }
}

module.exports = playCommand;