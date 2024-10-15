console.log("HFS plugin: min-media-player v1.2 by SanokKule")

const MMP = {
	cfg: HFS.getPluginConfig(),
	audio_formats: /\.(aac|flac|mka|mp3|ogg|opus|wav)$/i, // audio formats RegEx
	video_formats: /\.(f4v|mkv|mov|mp4|ogv|webm)$/i, // video formats RegEx
	image_formats: /\.(avif|apng|bmp|gif|jfif|jpeg|jpg|png|webp|svg)$/i, // image formats RegEx
	audio: function (entry) {
		const root = document.getElementById('mmp-audio')
		root.style.display = entry ? 'flex' : ''
		const audio = root.querySelector('audio')
		if (!entry) {
			audio.pause()
			audio.src = ''
			root.querySelector('.mmp-title').innerText = ''
			return
		}
		audio.src = entry.uri
		audio.play()
		audio.volume = MMP.cfg.audio_vol
		root.querySelector('.mmp-title').innerText = entry.name
		if (video = document.getElementById('mmp-video')) {
			video.querySelector('video').pause()
		}
	},
	video: function (entry) {
		const root = document.getElementById('mmp-video')
		root.style.display = entry ? 'flex' : ''
		const video = root.querySelector('video')
		if (!entry) {
			video.pause()
			video.src = ''
			root.querySelector('.mmp-title').innerText = ''
			return
		}
		video.src = entry.uri
		video.play()
		video.volume = MMP.cfg.video_vol
		root.querySelector('.mmp-title').innerText = entry.name
		if (audio = document.getElementById('mmp-audio')) {
			audio.querySelector('audio').pause()
		}
		document.getElementById('mmp-image') && MMP.image()
	},
	image: function (entry) {
		const root = document.getElementById('mmp-image')
		root.style.display = entry ? 'flex' : ''
		const img = root.querySelector('img')
		if (!entry) {
			img.src = ''
			root.querySelector('.mmp-title').innerText = ''
			return
		}
		img.src = entry.uri
		root.querySelector('.mmp-title').innerText = entry.name
		document.getElementById('mmp-video') && MMP.video()
	}
}

{
const { h, t } = HFS
const cfg = HFS.getPluginConfig()
audioHtml = `
<div id='mmp-audio' class='mmp'>
	<audio class='mmp-media' controls controlslist='nodownload'>
	</audio>
	<div class='mmp-controls'>
		<span class='mmp-title'>
		</span>
		<button type="button" class='mmp-close fa-cancel' onclick='MMP.audio()'>
		</button>
	</div>
</div>`

videoHtml = `
<div id='mmp-video' class='mmp'>
	<video class='mmp-media' ${cfg.start_video_with.toString().replace(',', ' ')} controls controlslist='nodownload'>
	</video>
	<div class='mmp-controls'>
		<span class='mmp-title'>
		</span>
		<button type="button" class='mmp-close fa-cancel' onclick='MMP.video()'>
		</button>
	</div>
	<div class='mmp-close-div' onclick='MMP.video()'>
	</div>
</div>`

imageHtml = `
<div id='mmp-image' class='mmp'>
	<img title='MMP image viewer' class='mmp-media'>
	</img>
	<div class='mmp-controls'>
		<span class='mmp-title'>
		</span>
		<button type="button" class='mmp-close fa-cancel' onclick='MMP.image()'>
		</button>
	</div>
	<div class='mmp-close-div' onclick='MMP.image()'>
	</div>
</div>`

if (MMP.cfg.enable_audio) {
	HFS.onEvent('afterHeader', () => audioHtml)
	if (cfg.use_file_menu) {
		HFS.onEvent('fileMenu', ({ entry }) =>
			MMP.audio_formats.test(entry.uri)
			&& { label: t`Play audio`, icon: 'play' , onClick: () => MMP.audio(entry) }
		)
	}
	if (cfg.use_file_list) {
		HFS.onEvent('afterEntryName', ({ entry }, { setOrder }) => {
			setOrder(-1)
			if (MMP.audio_formats.test(entry.uri)) {
				return h( 'button', { className: 'mmp-play fa-play', onClick: () => MMP.audio(entry) })
			}
		})
	}
}

if (MMP.cfg.enable_video) {
	HFS.onEvent('afterHeader', () => videoHtml)
	if (cfg.use_file_menu) {
		HFS.onEvent('fileMenu', ({ entry }) =>
			MMP.video_formats.test(entry.uri)
			&& { label: t`Play video`, icon: 'play' , onClick: () => MMP.video(entry) }
		)
	}
	if (cfg.use_file_list) {
		HFS.onEvent('afterEntryName', ({ entry }, { setOrder }) => {
			setOrder(-1)
			if (MMP.video_formats.test(entry.uri)) {
				return h( 'button', { className: 'mmp-play fa-play', onClick: () => MMP.video(entry) })
			}
		})
	}
}

if (MMP.cfg.enable_image) {
	HFS.onEvent('afterHeader', () => imageHtml)
	if (cfg.use_file_menu) {
		HFS.onEvent('fileMenu', ({ entry }) =>
			MMP.image_formats.test(entry.uri)
			&& { label: t`View image`, icon: 'image fa-picture' , onClick: () => MMP.image(entry) }
		)
	}
	if (cfg.use_file_list) {
		HFS.onEvent('afterEntryName', ({ entry }, { setOrder }) => {
			setOrder(-1)
			if (MMP.image_formats.test(entry.uri)) {
				return h( 'button', { className: 'mmp-play fa-play', onClick: () => MMP.image(entry) })
			}
		})
	}
}
}

document.addEventListener('keydown', (event) => {
	if (event.key === 'Escape') {
		document.getElementById('mmp-video') && MMP.video()
		document.getElementById('mmp-image') && MMP.image()
	}
})
