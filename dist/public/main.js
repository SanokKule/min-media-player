let temp_video_options = HFS.plugins['min-media-player'].start_video_with
let video_options = temp_video_options.toString().replace(' ', '').replace(',', ' ')

HFS.onEvent('afterEntryName', ({ entry }, { h }) =>
	/\.(mp4|mov|wmv|mkv|webm)$/i.test(entry.uri) &&
		h('button',{ className: 'mmp-play fa-play', onClick: () => mmp_video(entry) }))

HFS.onEvent('afterEntryName', ({ entry }, { h }) =>
	/\.(mp3|wav|aac|ogg|flac|opus)$/i.test(entry.uri) &&
		h('button',{ className: 'mmp-play fa-play', onClick: () => mmp_audio(entry) }))

HFS.onEvent('afterEntryName', ({ entry }, { h }) =>
	/\.(gif|jpg|jpeg|png|apng|webp|avif)$/i.test(entry.uri) &&
		h('button',{ className: 'mmp-play fa-play', onClick: () => mmp_image(entry) }))

HFS.onEvent('afterHeader', () => `
	<div id='mmp-audio' class='mmp'>
		<audio class='mmp-media' controls controlslist='nodownload'>
		</audio>
		<div>
			<span class='mmp-title'></span>
			<button id='audio-player-close' class='mmp-close fa-cancel' onclick='mmp_audio()'></button>
		</div>
	</div>
	<div id='mmp-video' class='mmp'>
		<video class='mmp-media' ${video_options} controls controlslist='nodownload'>
		</video>
		<div>
			<span class='mmp-title'></span>
			<button id='video-player-close' class='mmp-close fa-cancel' onclick='mmp_video()'></button>
		</div>
	</div>
	<div id='mmp-image' class='mmp'>
		<img class='mmp-media'>
		</img>
		<div>
			<span class='mmp-title'></span>
			<button id='image-viewer-close' class='mmp-close fa-cancel' onclick='mmp_image()'></button>
		</div>
	</div>
`)

document.addEventListener('keydown', function(event) {
	if (event.key === 'Escape') {
	  mmp_video();
	  mmp_image();
	}
})

function mmp_video(entry) {
	const root = document.getElementById('mmp-video')
	root.style.display = entry ? 'flex' : ''
	const video = root.querySelector('video')
	if (!entry)
		return video.pause()
	video.src = entry.uri
	video.play()
	video.volume = HFS.plugins['min-media-player'].video_vol
	const root_a = document.getElementById('mmp-audio')
	const audio = root_a.querySelector('audio')
	if (audio.paused == false) { audio.pause() }
	root.querySelector('.mmp-title').innerText = entry.name
}

function mmp_audio(entry) {
	const root = document.getElementById('mmp-audio')
	root.style.display = entry ? 'flex' : ''
	const audio = root.querySelector('audio')
	if (!entry)
		return audio.pause()
	audio.src = entry.uri
	audio.play()
	audio.volume = HFS.plugins['min-media-player'].audio_vol
	const root_v = document.getElementById('mmp-video')
	const video = root_v.querySelector('video')
	if (video.paused == false) { video.pause() }
	root.querySelector('.mmp-title').innerText = entry.name
}

function mmp_image(entry) {
	const root = document.getElementById('mmp-image')
	root.style.display = entry ? 'flex' : ''
	const img = root.querySelector('img')
	if (!entry)
		return
	img.src = entry.uri
	root.querySelector('.mmp-title').innerText = entry.name
}
