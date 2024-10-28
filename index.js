import { InstanceBase, InstanceStatus, runEntrypoint } from '@companion-module/base'
import { ConfigFields } from './config.js'
import { getActionDefinitions } from './actions.js'
import { variables } from './variables.js'
import { getFeedbackDefinitions } from './feedbacks.js'
import WebSocket from 'ws'

class HDMIVideoWallProcessor extends InstanceBase {
	isInitialized = false
	reconnectInterval = 5000
	reconnectTimer = null

	async init(config) {
		this.config = config
		this.muted = null

		this.setVariableDefinitions(variables)

		this.initWebSocket()
		this.isInitialized = true

		this.setActionDefinitions(getActionDefinitions(this))
		this.setFeedbackDefinitions(getFeedbackDefinitions(this))
	}

	async destroy() {
		this.isInitialized = false
		if (this.reconnectTimer) {
			clearInterval(this.reconnectTimer)
			this.reconnectTimer = null
		}
		if (this.ws) {
			this.ws.close(1000)
			delete this.ws
		}
	}

	async configUpdated(config) {
		this.config = config
		this.initWebSocket()
	}

	maybeReconnect() {
		if (this.isInitialized && this.config.reconnect) {
			// Clear the reconnect timer if it exists
			if (this.reconnectTimer) {
				clearInterval(this.reconnectTimer)
			}

			// Set up a new reconnect interval
			this.reconnectTimer = setInterval(() => {
				this.initWebSocket()
			}, this.reconnectInterval)
		}
	}

	initWebSocket() {
		// Clear the reconnect timer
		if (this.reconnectTimer) {
			clearInterval(this.reconnectTimer)
			this.reconnectTimer = null
		}

		const url = 'ws://' + this.config.targetIp + ':' + this.config.targetPort
		if (!url || !this.config.targetIp) {
			this.updateStatus(InstanceStatus.BadConfig, `Target IP is missing`)
			return
		}

		this.updateStatus(InstanceStatus.Connecting)

		if (this.ws) {
			this.ws.close(1000)
			delete this.ws
		}
		this.ws = new WebSocket(url)
		if (!this.ws) {
			throw new Error('WebSocket initialization failed')
		}

		this.ws.addEventListener('open', () => {
			this.updateStatus(InstanceStatus.Ok)
			// Clear the reconnect timer upon successful connection
			if (this.reconnectTimer) {
				clearInterval(this.reconnectTimer)
				this.reconnectTimer = null
			}
		})

		this.ws.addEventListener('close', (code) => {
			this.updateStatus(InstanceStatus.Disconnected, `Connection closed with code ${code}`)
			this.maybeReconnect()
		})

		this.ws.addEventListener('message', this.messageReceivedFromWebSocket.bind(this))

		this.ws.addEventListener('error', (data) => {
			this.log('error', data.message)
		})
	}

	setVolume(vol) {
		this.ws.send(
			JSON.stringify({
				action: 'setVolume',
				value: vol,
			})
		)
	}

	increaseVolume(vol) {
		this.ws.send(
			JSON.stringify({
				action: 'increaseVolume',
				value: vol,
			})
		)
	}

	decreaseVolume(vol) {
		this.ws.send(
			JSON.stringify({
				action: 'decreaseVolume',
				value: vol,
			})
		)
	}

	mute() {
		this.ws.send(
			JSON.stringify({
				action: 'mute',
			})
		)
	}

	unmute() {
		this.ws.send(
			JSON.stringify({
				action: 'unmute',
			})
		)
	}

	toggleMute() {
		this.ws.send(
			JSON.stringify({
				action: 'toggleMute',
			})
		)
	}

	parsePowerPointStatus(data) {
		if ('muted' in data) {
			this.muted = data.muted
			this.setVariableValues({
				muted: this.muted,
			})
		}
		if ('volume' in data) {
			this.log('debug', 'Got volume!')
			this.volume = data.volume
			this.setVariableValues({
				volume: this.volume,
			})
		}

		this.checkFeedbacks('muted')
	}

	async messageReceivedFromWebSocket(event) {
		if (event && event.data) {
			let msgValue = null
			let textData = '' // Initialize textData to hold the string representation

			try {
				// Check if event.data is a Blob and read it as text
				if (event.data instanceof Blob) {
					textData = await event.data.text() // Read the Blob as text
				} else {
					textData = event.data // Otherwise, use it directly
				}

				// Log the raw text data for debugging
				console.log('Raw message data:', textData)

				// Parse JSON if it is a valid JSON string
				if (textData.trim()) {
					// Ensure it's not just empty
					msgValue = JSON.parse(textData)
					console.log('Parsed message data:', msgValue)

					// Pass parsed data to parsePowerPointStatus
					this.parsePowerPointStatus(msgValue)
				} else {
					console.error('Received empty or invalid JSON string.')
				}
			} catch (e) {
				console.error('Error parsing JSON:', e)
				console.error('Raw text data:', textData) // Log the raw text data for further inspection
			}
		} else {
			console.error('Received event with no data:', event)
		}
	}

	getConfigFields() {
		return ConfigFields
	}
}

runEntrypoint(HDMIVideoWallProcessor, [])
