const axios = require('axios');
const yts = require('yt-search');

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

async function getPrinceDownload(youtubeUrl) {
	const apiUrl = `https://api.princetechn.com/api/download/ytmp3?apikey=prince&url=${encodeURIComponent(youtubeUrl)}`;
	const res = await tryRequest(() => axios.get(apiUrl));

	if (res?.data?.success && res?.data?.result?.download_url) {
		return {
			download: res.data.result.download_url,
			title: res.data.result.title,
			thumbnail: res.data.result.thumbnail,
			duration: res.data.result.duration,
			quality: res.data.result.quality
		};
	}

	throw new Error('Prince API returned no download_url');
}

async function songCommand(sock, chatId, message) {
	try {
		const text =
			message.message?.conversation ||
			message.message?.extendedTextMessage?.text ||
			'';

		const query = text.split(' ').slice(1).join(' ').trim();

		if (!query) {
			return await sock.sendMessage(
				chatId,
				{ text: 'Usage: .song <song name or YouTube link>' },
				{ quoted: message }
			);
		}

		let video;

		if (query.includes('youtube.com') || query.includes('youtu.be')) {
			video = {
				url: query,
				title: 'Downloading...',
				thumbnail: null,
				timestamp: null
			};
		} else {
			const search = await yts(query);

			if (!search || !search.videos.length) {
				return await sock.sendMessage(
					chatId,
					{ text: 'No results found.' },
					{ quoted: message }
				);
			}

			video = search.videos[0];
		}

		const audioData = await getPrinceDownload(video.url);

		await sock.sendMessage(
			chatId,
			{
				image: { url: audioData.thumbnail || video.thumbnail },
				caption: `🎵 Downloading: *${audioData.title || video.title}*\n⏱ Duration: ${audioData.duration || video.timestamp || 'Unknown'}\n🎧 Quality: ${audioData.quality || 'Unknown'}`
			},
			{ quoted: message }
		);

		await sock.sendMessage(
			chatId,
			{
				audio: { url: audioData.download },
				mimetype: 'audio/mpeg',
				fileName: `${audioData.title || video.title || 'song'}.mp3`,
				ptt: false
			},
			{ quoted: message }
		);

	} catch (err) {
		console.error('Song command error:', err);
		await sock.sendMessage(
			chatId,
			{ text: '❌ Failed to download song.' },
			{ quoted: message }
		);
	}
}

module.exports = songCommand;