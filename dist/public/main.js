console.log('HFS plugin: min-media-player v1.04 by SanokKule');
const mmp_cfg = HFS.getPluginConfig();
const mmp_vid_opts = mmp_cfg.start_video_with.toString().replace(',', ' ');

if (mmp_cfg.enable_audio) {
	if (mmp_cfg.use_file_menu) {
		HFS.onEvent('fileMenu', ({ entry }) =>
			/\.(aac|flac|mka|mp3|ogg|opus|wav)$/i.test(entry.uri) &&
				{ label: 'Play audio', icon: 'play' , onClick: () => mmp_audio(entry) }
		);
	}
	else {
		HFS.onEvent('afterEntryName', ({ entry }, { h }) =>
			/\.(aac|flac|mka|mp3|ogg|opus|wav)$/i.test(entry.uri) &&
				h( 'button', { className: 'mmp-play fa-play', onClick: () => mmp_audio(entry) })
		);
	};
	HFS.onEvent('afterHeader', () => `
		<div id='mmp-audio'class='mmp'>
			<audio class='mmp-media' controls controlslist='nodownload'>
			</audio>
			<div>
				<span class='mmp-title'>
				</span>
				<button id='audio-player-close' class='mmp-close fa-cancel' onclick='mmp_audio()'>
				</button>
			</div>
		</div>
	`);
};

if (mmp_cfg.enable_video) {
	if (mmp_cfg.use_file_menu) {
		HFS.onEvent('fileMenu', ({ entry }) =>
			/\.(f4v|mkv|mov|mp4|ogv|webm)$/i.test(entry.uri) &&
				{ label: 'Play video', icon: 'play' , onClick: () => mmp_video(entry) }
		);
	}
	else {
		HFS.onEvent('afterEntryName', ({ entry }, { h }) =>
			/\.(f4v|mkv|mov|mp4|ogv|webm)$/i.test(entry.uri) &&
				h( 'button', { className: 'mmp-play fa-play', onClick: () => mmp_video(entry) })
		);
	};
	HFS.onEvent('afterHeader', () => `
		<div id='mmp-video' class='mmp'>
			<video class='mmp-media' ${mmp_vid_opts} controls controlslist='nodownload'>
			</video>
			<div>
				<span class='mmp-title'>
				</span>
				<button id='video-player-close' class='mmp-close fa-cancel' onclick='mmp_video()'>
				</button>
			</div>
		</div>
	`);
};

if (mmp_cfg.enable_image) {
	if (mmp_cfg.use_file_menu) {
		HFS.onEvent('fileMenu', ({ entry }, { h }) =>
			/\.(avif|apng|bmp|gif|jpeg|jpg|png|webp)$/i.test(entry.uri) &&
				{ label: 'View image', icon: 'picture' , onClick: () => mmp_image(entry) }
		);
	}
	else {
		HFS.onEvent('afterEntryName', ({ entry }, { h }) =>
			/\.(avif|apng|bmp|gif|jpeg|jpg|png|webp)$/i.test(entry.uri) &&
				h( 'button', { className: 'mmp-play fa-picture', onClick: () => mmp_image(entry) })
		);
	};
	HFS.onEvent('afterHeader', () => `
		<div id='mmp-image' class='mmp'>
			<img class='mmp-media'>
			</img>
			<div>
				<span class='mmp-title'>
				</span>
				<button id='image-viewer-close' class='mmp-close fa-cancel' onclick='mmp_image()'>
				</button>
			</div>
		</div>
	`);
};

document.addEventListener('keydown', (event) => {
	if (event.key === 'Escape') { mmp_closeAll() };
});

function mmp_closeAll() {
	if (document.getElementById('mmp-video')) { mmp_video() };
	if (document.getElementById('mmp-image')) { mmp_image() };
}

function mmp_audio(entry) {
	const root = document.getElementById('mmp-audio');
	root.style.display = entry ? 'flex' : '';
	const audio = root.querySelector('audio');
	if (!entry) {
		audio.pause();
		audio.src = '';
		root.querySelector('.mmp-title').innerText = '';
		return;
	};
	audio.src = entry.uri;
	audio.play();
	audio.volume = mmp_cfg.audio_vol;
	root.querySelector('.mmp-title').innerText = entry.name;
	if (document.getElementById('mmp-video')) {
		const root_v = document.getElementById('mmp-video');
		const video = root_v.querySelector('video');
		video.pause();
	};
};

function mmp_video(entry) {
	const root = document.getElementById('mmp-video')
	root.style.display = entry ? 'flex' : ''
	const video = root.querySelector('video')
	if (!entry) {
		video.pause();
		video.src = '';
		root.querySelector('.mmp-title').innerText = '';
		return;
	};
	video.src = entry.uri;
	video.play();
	video.volume = mmp_cfg.video_vol;
	root.querySelector('.mmp-title').innerText = entry.name;
	if (document.getElementById('mmp-audio')) {
		const root_a = document.getElementById('mmp-audio');
		const audio = root_a.querySelector('audio');
		audio.pause();
	};
	if (document.getElementById('mmp-image')) { mmp_image(); };
};

function mmp_image(entry) {
	const root = document.getElementById('mmp-image');
	root.style.display = entry ? 'flex' : '';
	const img = root.querySelector('img');
	if (!entry) {
		img.src = '';
		root.querySelector('.mmp-title').innerText = '';
		return;
	};
	img.src = entry.uri;
	root.querySelector('.mmp-title').innerText = entry.name;
	if (document.getElementById('mmp-video')) { mmp_video(); };
};
