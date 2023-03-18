HFS.onEvent('afterEntryName', ({ entry }, { h }) =>
	/\.(mp4|mov|wmv|mkv|webm)$/i.test(entry.n) &&
		h('button',{ className: 'play-button', onClick: () => videoplay(entry.n) }))

HFS.onEvent('afterEntryName', ({ entry }, { h }) =>
	/\.(mp3|wav|aac|ogg|flac|opus)$/i.test(entry.n) &&
		h('button',{ className: 'play-button', onClick: () => audioplay(entry.n) }))

HFS.onEvent('afterEntryName', ({ entry }, { h }) =>
	/\.(jpg|jpeg|png|webp|avif)$/i.test(entry.n) &&
		h('button',{ className: 'play-button', onClick: () => viewimage(entry.n) }))

HFS.onEvent('beforeHeader', () => `
	<div id='video-player' class='media-player'>
		<div id="video-div">
			<video controls loop controlslist='nodownload' autopictureinpicture=true>
			</video>
		</div>
		<div>
			<button id="video-player-close" class='media-close' onclick="videoplay()">x</button>
			<span id='media-title' class='media-title'></span>
		</div>
	</div>
	<div id='audio-player' class='media-player'>
		<audio controls controlslist='nodownload'>
		</audio>
		<div>
			<span id='media-title' class='media-title'></span>
			<button id="audio-player-close" class='media-close' onclick="audioplay()">x</button>
		</div>
	</div>
	<div id='image-viewer' class='media-player'>
		<div id="image-div">
			<img>
			</img>
		</div>
		<div>
			<button id="image-viewer-close" class='media-close' onclick="viewimage()">x</button>
			<span id='media-title' class='media-title'></span>
		</div>
	</div>
`)

function videoplay(name = '') {
	const root = document.getElementById('video-player')
	root.style.display = name ? 'flex' : ''
	const video = root.querySelector('video')
	video.src = name
	if (name) video.play()
	else video.pause()
	root.querySelector('#media-title').innerText = name
}

function audioplay(name = '') {
	const root = document.getElementById('audio-player')
	root.style.display = name ? 'flex' : ''
	const audio = root.querySelector('audio')
	audio.src = name
	if (name) audio.play()
	else audio.pause()
	root.querySelector('#media-title').innerText = name
}

function viewimage(name = '') {
	const root = document.getElementById('image-viewer')
	root.style.display = name ? 'flex' : ''
	const img = root.querySelector('img')
	img.src = name
	root.querySelector('#media-title').innerText = name
}
