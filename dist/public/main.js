console.log('HFS plugin: min-media-player v1.15 by SanokKule');

const MMP = {
	cfg: HFS.getPluginConfig(),
	video_options: HFS.getPluginConfig().start_video_with.toString().replace(',', ' '),
	audio_formats: /\.(aac|flac|mka|mp3|ogg|opus|wav)$/i, // audio formats RegEx
	video_formats: /\.(f4v|mkv|mov|mp4|ogv|webm)$/i, // video formats RegEx
	image_formats: /\.(avif|apng|bmp|gif|jfif|jpeg|jpg|png|webp)$/i, // image formats RegEx
	audio: function (entry) {
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
		audio.volume = MMP.cfg.audio_vol;
		root.querySelector('.mmp-title').innerText = entry.name;
		if (document.getElementById('mmp-video')) {
			const root_v = document.getElementById('mmp-video');
			const video = root_v.querySelector('video');
			video.pause();
		};
	},
	video: function (entry) {
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
		video.volume = MMP.cfg.video_vol;
		root.querySelector('.mmp-title').innerText = entry.name;
		if (document.getElementById('mmp-audio')) {
			const root_a = document.getElementById('mmp-audio');
			const audio = root_a.querySelector('audio');
			audio.pause();
		};
		if (document.getElementById('mmp-image')) { MMP.image() };
	},
	image: function (entry) {
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
		if (document.getElementById('mmp-video')) { MMP.video() };
	}
};

if (MMP.cfg.enable_audio) {
	switch (MMP.cfg.use_file_menu) {
		case true: {
			HFS.onEvent('fileMenu', ({ entry }) =>
				MMP.audio_formats.test(entry.uri)
				&& { label: HFS.t`Play audio`, icon: 'play' , onClick: () => MMP.audio(entry) }
			);
		}
		case false: {
			HFS.onEvent('afterEntryName', ({ entry }, { h }) =>
				MMP.audio_formats.test(entry.uri)
				&& h( 'button', { className: 'mmp-play fa-play', onClick: () => MMP.audio(entry) })
			);
		};
	};
	HFS.onEvent('afterHeader', () => `
		<div id='mmp-audio'class='mmp'>
			<audio class='mmp-media' controls controlslist='nodownload'>
			</audio>
			<div class='mmp-controls'>
				<span class='mmp-title'>
				</span>
				<button class='mmp-close fa-cancel' onclick='MMP.audio()'>
				</button>
			</div>
		</div>
	`);
};

if (MMP.cfg.enable_video) {
	switch (MMP.cfg.use_file_menu) {
		case true: {
			HFS.onEvent('fileMenu', ({ entry }) =>
				MMP.video_formats.test(entry.uri)
				&& { label: HFS.t`Play video`, icon: 'play' , onClick: () => MMP.video(entry) }
			);
		};
		case false: {
			HFS.onEvent('afterEntryName', ({ entry }, { h }) =>
				MMP.video_formats.test(entry.uri)
				&& h( 'button', { className: 'mmp-play fa-play', onClick: () => MMP.video(entry) })
			);
		};
	};
	HFS.onEvent('afterHeader', () => `
		<div id='mmp-video' class='mmp'>
			<video class='mmp-media' ${MMP.video_options} controls controlslist='nodownload'>
			</video>
			<div class='mmp-controls'>
				<span class='mmp-title'>
				</span>
				<button class='mmp-close fa-cancel' onclick='MMP.video()'>
				</button>
			</div>
			<div class='mmp-close-div' onclick='MMP.video()'>
			</div>
		</div>
	`);
};

if (MMP.cfg.enable_image) {
	switch (MMP.cfg.use_file_menu) {
		case true: {
			HFS.onEvent('fileMenu', ({ entry }) =>
				MMP.image_formats.test(entry.uri)
				&& { label: HFS.t`View image`, icon: 'picture' , onClick: () => MMP.image(entry) }
			);
		};
		case false: {
			HFS.onEvent('afterEntryName', ({ entry }, { h }) =>
				MMP.image_formats.test(entry.uri)
				&& h( 'button', { className: 'mmp-play fa-play', onClick: () => MMP.image(entry) })
			);
		};
	};
	HFS.onEvent('afterHeader', () => `
		<div id='mmp-image' class='mmp'>
			<img class='mmp-media'>
			</img>
			<div class='mmp-controls'>
				<span class='mmp-title'>
				</span>
				<button class='mmp-close fa-cancel' onclick='MMP.image()'>
				</button>
			</div>
			<div class='mmp-close-div' onclick='MMP.image()'>
			</div>
		</div>
	`);
};

document.addEventListener('keydown', (event) => {
	if (event.key === 'Escape') {
		if (document.getElementById('mmp-video')) { MMP.video() };
		if (document.getElementById('mmp-image')) { MMP.image() };
	};
});
