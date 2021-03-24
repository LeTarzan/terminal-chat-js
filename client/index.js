/* 
  node index.js --username letarzan --room salinha --hostUri localhost
*/

import Events from 'events';
import CliConfig from './src/cliConfig.js';
import TerminalController from "./src/terminalController.js";

const componentEmitter = new Events()
const [nodePath, filePath, ...args] = process.argv
const config = CliConfig.parseArguments(args)

console.log(config)

const controller = new TerminalController()
await controller.initializeTable(componentEmitter)


