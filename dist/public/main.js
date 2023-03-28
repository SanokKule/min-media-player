HFS.onEvent('afterEntryName', ({ entry }, { h }) =>
	/\.(mp4|mov|wmv|mkv|webm)$/i.test(entry.n) &&
		h('button',{ className: 'mmp-play fa-play', onClick: () => mmp_video(entry.n) }))

HFS.onEvent('afterEntryName', ({ entry }, { h }) =>
	/\.(mp3|wav|aac|ogg|flac|opus)$/i.test(entry.n) &&
		h('button',{ className: 'mmp-play fa-play', onClick: () => mmp_audio(entry.n) }))

HFS.onEvent('afterEntryName', ({ entry }, { h }) =>
	/\.(gif|jpg|jpeg|png|apng|webp|avif)$/i.test(entry.n) &&
		h('button',{ className: 'mmp-play fa-play', onClick: () => mmp_image(entry.n) }))

HFS.onEvent('beforeHeader', () => `
	<div id='mmp-audio' class='mmp'>
		<audio id='mmp-audio-element' controls controlslist='nodownload'>
		</audio>
		<div>
			<span class='mmp-title'></span>
			<button id='audio-player-close' class='mmp-close fa-cancel' onclick='mmp_audio()'></button>
		</div>
	</div>
	<div id='mmp-video' class='mmp'>
		<video id='mmp-video-element' controls loop controlslist='nodownload' autopictureinpicture=true>
		</video>
		<div>
			<span class='mmp-title'></span>
			<button id='video-player-close' class='mmp-close fa-cancel' onclick='mmp_video()'></button>
		</div>
	</div>
	<div id='mmp-image' class='mmp'>
		<img id='mmp-image-element'>
		</img>
		<div>
			<span class='mmp-title'></span>
			<button id='image-viewer-close' class='mmp-close fa-cancel' onclick='mmp_image()'></button>
		</div>
	</div>
`)

function mmp_video(name = '') {
	const root = document.getElementById('mmp-video')
	root.style.display = name ? 'flex' : ''
	const video = root.querySelector('video')
	video.src = name
	if (name) video.play()
	else video.pause()
	root.querySelector('.mmp-title').innerText = name
}

function mmp_audio(name = '') {
	const root = document.getElementById('mmp-audio')
	root.style.display = name ? 'flex' : ''
	const audio = root.querySelector('audio')
	audio.src = name
	if (name) audio.play()
	else audio.pause()
	root.querySelector('.mmp-title').innerText = name
}

function mmp_image(name = '') {
	const root = document.getElementById('mmp-image')
	root.style.display = name ? 'flex' : ''
	const img = root.querySelector('img')
	img.src = name
	root.querySelector('.mmp-title').innerText = name
}
