import SocketServer from "./src/socket.js";
import Event from 'events'
import { constants } from "./src/constants.js";
import Controller from "./src/controller.js";

const eventEmitter = new Event()

// simulating a connection between client and server
// async function testServer() {
//   const options = {
//     port: 9898,
//     host: 'localhost',
//     headers: {
//       Connection: 'Upgrade',
//       Upgrade: 'WebSocket'
//     }
//   }

//   const http = await import('http')
//   const req = http.request(options)

//   req.end()
//   req.on('upgrade', (req, socket) => {
//     socket.on('data', data => {
//       console.log('client received data', data.toString())
//     })

//     setInterval(() => {
//       socket.write('opa')
//     }, 500)
//   })
// }

const port = process.env.PORT || 9898
const socketServer = new SocketServer({ port })
const server = await socketServer.initialize(eventEmitter)
console.log(`Server running at port: ${server.address().port}`)

const controller = new Controller({ socketServer })

eventEmitter.on(
  constants.event.NEW_USER_CONNECTED, 
  controller.onNewConnection.bind(controller)
)

// eventEmitter.on(constants.event.NEW_USER_CONNECTED, socket => {
//   console.log('new connection', socket.id)
//   socket.on('data', data => {
//     console.log('server received data', data.toString())
//     socket.write('aoba')
//   })
// })

// await testServer()
