exports.description = "minimalistic media player"
exports.version = 1.01
exports.apiRequired = 8
exports.repo = "SanokKule/min-media-player"
exports.frontend_css = 'style.css'
exports.frontend_js = 'main.js'
exports.config = {
	use_file_menu: { frontend: true, label: 'Move play buttons into the file menu', type: 'boolean', defaultValue: false},
	enable_video: { frontend: true, label: 'Enable video player', type: 'boolean', defaultValue: true},
	start_video_with: { frontend: true, label: 'Start video player...', helperText: 'can be muted and/or looped', type: 'multiselect', options: ['muted', 'loop'] },
	video_vol: { frontend: true, label: 'Video volume', helperText: '0.00 to 1.00', type: 'number', min: 0.00, max: 1.00, defaultValue: 1.00 },
	enable_audio: { frontend: true, label: 'Enable audio player', type: 'boolean', defaultValue: true},
	audio_vol: { frontend: true, label: 'Audio volume', helperText: '0.00 to 1.00', type: 'number', min: 0.00, max: 1.00, defaultValue: 0.75 },
	enable_image: { frontend: true, label: 'Enable image viewer', type: 'boolean', defaultValue: true}
}
exports.configDialog = {
    sx: { maxWidth: '26em' }
}
