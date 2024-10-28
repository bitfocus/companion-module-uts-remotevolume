import { combineRgb } from '@companion-module/base'

export function getPresetDefinitions(self) {
	const presets = []

	presets.push({
		category: 'Volume',
		name: '+10%',
		type: 'button',
		style: {
			text: '+10%',
			size: '18',
			bgcolor: combineRgb(0, 0, 0),
			color: combineRgb(255, 255, 255),
		},
		steps: [
			{
				down: [
					{
						actionId: 'increaseVolume',
						options: { volume: 10 },
					},
				],
			},
		],
		feedbacks: [],
	})
	presets.push({
		category: 'Volume',
		name: '-10%',
		type: 'button',
		style: {
			text: '-10%',
			size: '18',
			bgcolor: combineRgb(0, 0, 0),
			color: combineRgb(255, 255, 255),
		},
		steps: [
			{
				down: [
					{
						actionId: 'decreaseVolume',
						options: { volume: 10 },
					},
				],
			},
		],
		feedbacks: [],
	})
	presets.push({
		category: 'Mute',
		name: 'Toggle Mute',
		type: 'button',
		style: {
			text: 'Unmuted',
			size: '14',
			bgcolor: combineRgb(0, 255, 0),
			color: combineRgb(0, 0, 0),
		},
		steps: [
			{
				down: [
					{
						actionId: 'mute',
						options: { mute: 'toggle' },
					},
				],
			},
		],
		feedbacks: [
			{
				feedbackId: 'muted',
				options: {},
				style: {
					text: 'Muted',
					size: '18',
					bgcolor: combineRgb(255, 0, 0),
					color: combineRgb(255, 255, 255),
				},
			},
		],
	})

	return presets
}
