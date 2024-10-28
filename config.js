import { Regex } from '@companion-module/base'

export const ConfigFields = [
	{
		type: 'static-text',
		id: 'info',
		width: 12,
		label: 'Information',
		value:
			'This module requires a small helper application running on the machine you want to control. Please read the module documentation.',
	},
	{
		type: 'textinput',
		id: 'targetIp',
		label: 'Target IP address',
		tooltip: 'For localhost use 127.0.0.1 (loopback IP)',
		default: '127.0.0.1',
		width: 12,
		regex: Regex.IP,
	},
	{
		type: 'number',
		id: 'targetPort',
		label: 'Port',
		default: '2501',
		width: 6,
		regex: Regex.PORT,
	},
	{
		type: 'checkbox',
		id: 'reconnect',
		label: 'Reconnect',
		tooltip: 'Reconnect on WebSocket error (after 5 secs)',
		width: 6,
		default: true,
	},
]
