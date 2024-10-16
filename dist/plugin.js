exports.description = "Minimalistic media player"
exports.version = 1.192
exports.apiRequired = 8.5
exports.repo = "SanokKule/min-media-player"
exports.frontend_css = "style.css"
exports.frontend_js = "main.js"
exports.config = {
	use_file_menu: {
		frontend: true,
		label: "Show play button under the file menu",
		type: 'boolean',
		defaultValue: false
	},
	use_file_list: {
		frontend: true,
		label: "Show play button in the file list",
		type: 'boolean',
		defaultValue: true
	},
	enable_video: {
		frontend: true,
		label: "Enable video player",
		type: 'boolean',
		defaultValue: true
	},
	start_video_with: {
		frontend: true,
		label: "Start video player...",
		helperText: "can be muted and/or looped",
		type: 'multiselect',
		options: [
			'muted',
			{ value: 'loop', label: 'looped'}
		],
		defaultValue: []
	},
	video_vol: {
		frontend: true,
		label: "Video volume",
		helperText: "0.0 to 1.0",
		type: 'number',
		min: 0.0,
		max: 1.0,
		defaultValue: 0.75,
		placeholder: "default: 0.75"
	},
	enable_audio: {
		frontend: true,
		label: "Enable audio player",
		type: 'boolean',
		defaultValue: true
	},
	audio_vol: {
		frontend: true,
		label: "Audio volume",
		helperText: "0.0 to 1.0",
		type: 'number',
		min: 0.0,
		max: 1.0,
		defaultValue: 0.75,
		placeholder: "default: 0.75"
	},
	enable_image: {
		frontend: true,
		label: "Enable image viewer",
		type: 'boolean',
		defaultValue: true
	}
}
exports.configDialog = {
	sx: { maxWidth: '26em' }
}
