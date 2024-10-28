import { combineRgb } from '@companion-module/base'

export function getPresetDefinitions(self) {
	const presets = []

	for (let output = 1; output <= 4; output++) {
		for (let input = 1; input <= 4; input++) {
			presets.push({
				category: 'Video Routing',
				name: `Route ${output + input} `,
				type: 'button',
				style: {
					text: `Out ${output}: IN ${input}`,
					size: '18',
					bgcolor: combineRgb(36, 36, 36),
					color: combineRgb(255, 255, 255),
				},
				steps: [
					{
						down: [
							{
								actionId: 'route_input_to_output',
								options: {
									input: input.toString(),
									output: output.toString(),
								},
							},
						],
					},
				],
				feedbacks: [
					{
						feedbackId: 'output_at_input',
						options: { output: output.toString(), input: input.toString() },
						style: {
							bgcolor: combineRgb(0, 255, 0),
						},
					},
				],
			})
		}
	}

	for (let output = 1; output <= 4; output++) {
		for (let input = 1; input <= 4; input++) {
			presets.push({
				category: 'External Audio Routing',
				name: `Route ${output + input} `,
				type: 'button',
				style: {
					text: `Out ${output}: IN ${input}`,
					size: '18',
					bgcolor: combineRgb(36, 36, 36),
					color: combineRgb(255, 255, 255),
				},
				steps: [
					{
						down: [
							{
								actionId: 'route_input_audio_to_output_ext_audio',
								options: {
									input: input.toString(),
									output: output.toString(),
								},
							},
						],
					},
				],
				feedbacks: [
					{
						feedbackId: 'output_at_audio_input',
						options: { output: output.toString(), input: input.toString() },
						style: {
							bgcolor: combineRgb(0, 255, 0),
						},
					},
				],
			})
		}
	}

	presets.push({
		category: 'Device Controls',
		name: 'Toggle Panel Lock',
		type: 'button',
		style: {
			text: 'Panel unlocked',
			size: '14',
			bgcolor: combineRgb(0, 255, 0),
			color: combineRgb(0, 0, 0),
		},
		steps: [
			{
				down: [
					{
						actionId: 'lock',
						options: { command: 'toggle' },
					},
				],
			},
		],
		feedbacks: [
			{
				feedbackId: 'panel_lock',
				options: {},
				style: {
					text: 'Panel locked',
					bgcolor: combineRgb(255, 0, 0),
					color: combineRgb(255, 255, 255),
				},
			},
		],
	})
	presets.push({
		category: 'Device Controls',
		name: 'Toggle Power',
		type: 'button',
		style: {
			text: 'Device OFF',
			size: '18',
			bgcolor: combineRgb(255, 0, 0),
			color: combineRgb(255, 255, 255),
		},
		steps: [
			{
				down: [
					{
						actionId: 'device_power',
						options: { power: '2' },
					},
				],
			},
		],
		feedbacks: [
			{
				feedbackId: 'device_power',
				options: {},
				style: {
					text: 'Device ON',
					bgcolor: combineRgb(0, 255, 0),
					color: combineRgb(0, 0, 0),
				},
			},
		],
	})
	presets.push({
		category: 'Device Controls',
		name: 'Toggle Beep',
		type: 'button',
		style: {
			text: 'Beep OFF',
			size: '18',
			bgcolor: combineRgb(255, 0, 0),
			color: combineRgb(255, 255, 255),
		},
		steps: [
			{
				down: [
					{
						actionId: 'device_beep',
						options: { beep: '2' },
					},
				],
			},
		],
		feedbacks: [
			{
				feedbackId: 'device_beep',
				options: {},
				style: {
					text: 'Beep ON',
					bgcolor: combineRgb(0, 255, 0),
					color: combineRgb(0, 0, 0),
				},
			},
		],
	})

	return presets
}
