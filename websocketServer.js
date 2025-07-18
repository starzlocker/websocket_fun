import { WebSocketServer, WebSocket } from 'ws';

const host = '192.168.101.91';

const wss = new WebSocketServer({ host: host, port: 9000 })

console.log('Escutando por websockets...')

wss.on('connection', (ws) => {
	console.log('Cliente conectado')

	ws.on('message', (message) => {
		wss.clients.forEach(client => {
			if (client != ws && client.readyState === WebSocket.OPEN)
			client.send(message.toString())
		})
	})

	ws.on('close', () => {
		console.log('Cliente desconectado')
	})
})
