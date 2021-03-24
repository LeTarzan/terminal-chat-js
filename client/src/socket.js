export default class SocketClient {
  #serverConnection = {}

  constructor({ hostname, port, protocol }) {
    this.hostname = hostname
    this.port = port
    this.protocol = protocol
  }

  async createConnection() {
    const options = {
      port: this.port,
      host: this.hostname,
      headers: {
        Connection: 'Upgrade',
        Upgrade: 'WebSocket'
      }
    }

    const http = await import(this.protocol) // resolve to http or https
    const req = http.request(options)

    req.end()

    return new Promise(resolve => {
      req.once('upgrade', (res, socket) => resolve(socket))
    }) 
  }

  async initialize(){
    this.#serverConnection = await this.createConnection()
    console.log('I connected to the server!!')
  }
}