export default class CliConfig {
  constructor({ userName, hostUri, room }) {
    this.userName = userName
    this.room = room

    const {hostname, port, protocol} = new URL(hostUri)
    this.hostname = hostname
    this.port = port
    this.protocol = protocol.replace(/\W/, '') // anything that isn't letter 
  }

  static parseArguments(args) {
    const cmd = new Map()

    for (const key in args) {
      const COMMAND_PREFFIX = '--'
      const index = parseInt(key)
      const command = args[key]
 
      if (!command.includes(COMMAND_PREFFIX)) continue

      cmd.set(
        command.replace(COMMAND_PREFFIX, ''),
        args[index + 1]
      )
    }

    return new CliConfig(Object.fromEntries(cmd))
  }
}