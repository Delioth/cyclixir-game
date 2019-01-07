import { Socket } from 'phoenix'
import { adapt } from '@cycle/run/lib/adapt'
import xs, { Stream } from 'xstream'

export interface SocketMessage {
  event_type: string
  payload: any
}

export interface SocketResponse {}

function makeSockDriver(mount, channel, peerId) {
  let socket = new Socket(mount, { params: { token: 5 } })
  socket.connect()

  let theChannel = socket.channel(channel, { token: 10 })
  theChannel.join()

  function sockDriver(outgoing$: Stream<SocketMessage>): Stream<any> {
    outgoing$.addListener({
      next: outgoing => {
        theChannel.push(outgoing.event_type, outgoing.payload, 500)
      }
    })

    const incoming$ = xs.create({
      start: listener => {
        theChannel.on('phx_reply', message => {
          listener.next(message)
        })
      },
      stop: () => {}
    })

    return adapt(incoming$)
  }

  return sockDriver
}

export default makeSockDriver
