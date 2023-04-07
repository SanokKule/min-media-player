exports.version = 0.96
exports.description = "minimalistic media player"
exports.apiRequired = 8
exports.repo = "SanokKule/min-media-player"
exports.frontend_css = 'style.css'
exports.frontend_js = 'main.js'
exports.config = {
    start_video_with: { label: 'Start video player:', frontend: true, type: 'multiselect', options: ['muted', 'loop'] },
	video_vol: { label: 'Video volume: ', frontend: true, type: 'number', min: 0.00, max: 1.00, defaultValue: 1.00 },
	audio_vol: { label: 'Audio volume: ', frontend: true, type: 'number', min: 0.00, max: 1.00, defaultValue: 0.75 }
}