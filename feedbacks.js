export function getFeedbackDefinitions(self) {
	return {
		muted: {
			type: 'boolean',
			name: 'Muted',
			description: 'Check if the audio is currently muted',
			options: [],
			callback: (feedback) => {
				return self.muted
			},
		},
	}
}
