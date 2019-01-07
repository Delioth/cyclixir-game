// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from "config.paths.watched".
import 'phoenix_html'

// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

// import socket from "./socket"
import app from './cycle/main'
import { run, setup } from '@cycle/run'
import { makeDOMDriver } from '@cycle/dom'
import makeSockDriver from './cycle/driver/phoenix-socket-cycle-driver'
import { timeDriver } from '@cycle/time'
import makePixiDriver from './cycle/driver/pixijs-cycle-driver'
import { rerunner, restartable } from 'cycle-restart'

import path from 'path'

let socketDriver = makeSockDriver('/socket', 'numbers:numbers', '1')

let pixiDriver = makePixiDriver()

const makeDrivers = () => ({
  DOM: restartable(makeDOMDriver('#newApp'), false),
  sock: restartable(socketDriver),
  pixi: pixiDriver,
  time: restartable(timeDriver)
})

const rerun = rerunner(setup, makeDrivers)
rerun(app)

if (module.hot) {
  module.hot.decline()
}
