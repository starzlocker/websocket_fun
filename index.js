import http from 'http';
import {readFile} from 'node:fs/promises';
import mqtt from 'mqtt';
import { WebSocket } from 'ws';


const client = mqtt.connect(
	{
		port: 1883, 
		host: 's1.apontafacil.com',
		username: 'xZuJRXQ4Zqhe9C6PefcDRZXuLBeYmZ22FwKpQeww',
		password: 'xZuJRXQ4Zqhe9C6PefcDRZXuLBeYmZ22FwKpQeww'
	}
)
class Timer {
	constructor() {
		this.startTime = null;
		this.endTime = null;
		this.isRunning = false;
		this.intervalId = null;
	}

	startTimer() {
		this.isRunning = true;
		this.startTime = 0;

		const socket = new WebSocket('ws://192.168.101.91:9000')

		console.log(this.startTime);

		this.intervalId = setInterval(() => {
			this.startTime += 1
			console.log(this.startTime)
			socket.send(`${this.startTime}`)
		}, 1000);
	}

	stopTimer() {
		this.isRunning = false;
		clearInterval(this.intervalId)
	}
}

const timer = new Timer();


client.on("connect", () => {
	console.log('Conectado')
	client.subscribe('/NX/NXS/+/julio-test/DATA')
})

client.on('subscribe', () => {
	console.log('Inscrito com sucesso!')
})

client.on('message', (message) => {
	console.log('oi', message)
	if (!timer.isRunning) {
		console.log('iniciando o timer')
		timer.startTimer()
	} else {
		console.log('parando o timer')
		timer.stopTimer()
	}
})

const server = async () => {
	const data = await readFile('./index.html','utf-8')

	const server = http.createServer((req, res) => {
		console.log('Conectado')
		res.writeHead(200, {
			'Content-Type': 'text/html'
		})
		res.end(data)
	})
	
	server.listen(3000, '192.168.101.91', () => {
		console.log('Escutando em 192.168.101.91')
	})
}

server()
