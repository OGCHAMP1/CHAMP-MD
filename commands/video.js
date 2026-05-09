const axios = require('axios');
const yts = require('yt-search');

const AXIOS_DEFAULTS = {
    timeout: 60000,
    headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json, text/plain, */*'
    }
};

async function tryRequest(getter, attempts = 3) {
    let lastError;

    for (let attempt = 1; attempt <= attempts; attempt++) {
        try {
            return await getter();
        } catch (err) {
            lastError = err;

            if (attempt < attempts) {
                await new Promise(r => setTimeout(r, 1000 * attempt));
            }
        }
    }

    throw lastError;
}

async function getPrinceVideoByUrl(youtubeUrl) {
    const apiUrl = `https://api.princetechn.com/api/download/dlmp4?apikey=prince&url=${encodeURIComponent(youtubeUrl)}`;

    const res = await tryRequest(() =>
        axios.get(apiUrl, AXIOS_DEFAULTS)
    );

    if (res?.data?.success && res?.data?.result?.download_url) {
        return res.data.result;
    }

    throw new Error('PrinceTech API returned no download url');
}

async function videoCommand(sock, chatId, message) {
    try {
        const text =
            message.message?.conversation ||
            message.message?.extendedTextMessage?.text ||
            '';

        const searchQuery = text.split(' ').slice(1).join(' ').trim();

        if (!searchQuery) {
            await sock.sendMessage(chatId, {
                text: 'What video do you want to download?'
            }, { quoted: message });

            return;
        }

        let videoUrl = '';
        let videoTitle = '';
        let videoThumbnail = '';

        if (
            searchQuery.startsWith('http://') ||
            searchQuery.startsWith('https://')
        ) {
            videoUrl = searchQuery;
        } else {
            const { videos } = await yts(searchQuery);

            if (!videos || videos.length === 0) {
                await sock.sendMessage(chatId, {
                    text: 'No videos found!'
                }, { quoted: message });

                return;
            }

            videoUrl = videos[0].url;
            videoTitle = videos[0].title;
            videoThumbnail = videos[0].thumbnail;
        }

        const ytId = (
            videoUrl.match(/(?:youtu\.be\/|v=)([a-zA-Z0-9_-]{11})/) || []
        )[1];

        const thumb =
            videoThumbnail ||
            (ytId ? `https://i.ytimg.com/vi/${ytId}/sddefault.jpg` : undefined);

        if (thumb) {
            await sock.sendMessage(chatId, {
                image: {
                    url: thumb
                },
                caption: `*${videoTitle || searchQuery}*\nDownloading...`
            }, { quoted: message });
        }

        const urls = videoUrl.match(
            /(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch\?v=|v\/|embed\/|shorts\/)?)([a-zA-Z0-9_-]{11})/gi
        );

        if (!urls) {
            await sock.sendMessage(chatId, {
                text: 'This is not a valid YouTube link!'
            }, { quoted: message });

            return;
        }

        const videoData = await getPrinceVideoByUrl(videoUrl);

        const downloadUrl = videoData.download_url;

        if (!downloadUrl) {
            await sock.sendMessage(chatId, {
                text: 'Download URL not found!'
            }, { quoted: message });

            return;
        }

        await sock.sendMessage(chatId, {
            video: {
                url: downloadUrl
            },
            mimetype: 'video/mp4',
            fileName: `${videoData.title || videoTitle || 'video'}.mp4`,
            caption:
`*${videoData.title || videoTitle || 'Video'}*

📺 Quality: ${videoData.quality || '720p'}

> *_Downloaded by 𝗖𝗛𝗔𝗠𝗣-𝗠𝗗_*`
        }, { quoted: message });

    } catch (error) {
        console.error('[VIDEO] Command Error:', error?.message || error);

        await sock.sendMessage(chatId, {
            text: 'Download failed: ' + (error?.message || 'Unknown error')
        }, { quoted: message });
    }
}

module.exports = videoCommand;
