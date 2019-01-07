import xs, { Stream, Observable } from 'xstream'
import { div, input, p, DOMSource } from '@cycle/dom'
import { TimeSource } from '@cycle/time'
import * as Snabbdom from 'snabbdom-pragma'
import { Frame } from '@cycle/time/lib/cjs/src/animation-frames'
import { RenderAction, RenderActionType, Renderable } from '@src/StreamDefs'
import { GameLoop } from '@src/game/system/Game'

var s = Snabbdom

function app(sources: {
  DOM: DOMSource
  sock: any
  time: TimeSource
  pixi: Stream<PIXI.interaction.InteractionEvent>
}) {
  const incoming$ = sources.sock

  // Use single socket stream like different streams by filtering on ops
  const incoming_squared$ = incoming$.filter(
    resp => resp.response.op == 'square'
  )
  const incoming_added$ = incoming$.filter(resp => resp.response.op == 'add')

  // And then we merge the two streams, for funsises
  const outgoing$ = xs.empty()

  const checkClick$ = sources.DOM.select('input')
    .events('change')
    .map(ev => (ev.target as HTMLInputElement).checked)
    .startWith(false)

  const checker$ = checkClick$.map(toggled => (
    <div>
      <input type="checkbox" /> Toggle something else jsx!
      <p>{toggled ? 'HELLO' : 'OFF'}</p>
    </div>
  ))

  const pixiCanvas$ = sources.DOM.select('#pixi')
    .elements()
    .startWith(null)
    .map(e => (
      <div>
        <canvas id="pixi" />
      </div>
    ))

  const { renderActions: gameRenderable$, DOM: dom$ } = GameLoop({
    time: sources.time,
    DOM: sources.DOM
  })

  const vnode$ = xs
    .combine(checker$, pixiCanvas$)
    .map(([checker, pixiCanvas]) => (
      <div>
        {checker}
        {pixiCanvas}
      </div>
    ))

  const checkToggle$ = checkClick$.map(
    (toggled: boolean): RenderAction => ({
      renderID: null,
      renderType: Renderable.Backdrop,
      actionType: RenderActionType.Move
    })
  )

  // Apparently we can Add listeners to the pixi stream, but can't map?
  sources.pixi.map(e => console.log("doesn't work", e))
  // sources.pixi
  //   .addListener({ next: e => console.log('works', e) })

  const sinks = {
    DOM: vnode$,
    sock: outgoing$,
    time: xs.empty(),
    pixi: xs.merge(
      sources.time.animationFrames(),
      checkToggle$,
      gameRenderable$
    )
  }

  console.log('APP initialized')

  return sinks
}

export default app
