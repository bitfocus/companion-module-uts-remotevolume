export function getActionDefinitions(self) {
	return {
		set_volume: {
			name: 'Set Volume [absolute]',
			description: 'Set the absolute volume level',
			options: [
				{
					type: 'number',
					id: 'volume',
					label: 'Volume',
					default: 50,
					min: 0,
					max: 100,
				},
			],
			callback: async (action) => {
				self.setVolume(action.options.volume)
			},
		},
		increaseVolume: {
			name: 'Increase Volume',
			description: 'Set the absolute volume level',
			options: [
				{
					type: 'number',
					id: 'volume',
					label: 'Increase by',
					default: 10,
					min: 1,
					max: 99,
				},
			],
			callback: async (action) => {
				self.increaseVolume(action.options.volume)
			},
		},
		decreaseVolume: {
			name: 'Decrease Volume',
			description: 'Set the absolute volume level',
			options: [
				{
					type: 'number',
					id: 'volume',
					label: 'Decrease by',
					default: 10,
					min: 1,
					max: 99,
				},
			],
			callback: async (action) => {
				self.decreaseVolume(action.options.volume)
			},
		},
		mute: {
			name: 'Set Mute',
			description: 'Set the mute state',
			options: [
				{
					type: 'dropdown',
					id: 'mute',
					label: 'Mute',
					default: 'mute',
					choices: [
						{ id: 'mute', label: 'Mute' },
						{ id: 'unmute', label: 'Unmute' },
						{ id: 'toggle', label: 'Toggle' },
					],
				},
			],
			callback: async (action) => {
				switch (action.options.mute) {
					case 'mute':
						self.mute()
						break
					case 'unmute':
						self.unmute()
						break
					case 'toggle':
						self.toggleMute()
				}
			},
		},
		getState: {
			name: 'Get latest Data',
			description: 'Retrieve the latest information manually if polling is disabled',
			options: [],
			callback: async (action) => {
				self.getState()
			},
		},
	}
}
