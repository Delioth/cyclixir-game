import { TimeSource } from '@cycle/time'
import xs, { Stream } from 'xstream'
import { RenderAction, Renderable, RenderActionType } from '@src/StreamDefs'
import { DOMSource } from '@cycle/dom'
import { ScreenType } from '../constants/ScreenType'

export interface GameSources {
  // The game should only be reacting to User Actions;
  DOM: DOMSource
  // or Time, provided there are uncompleted, time-based activities still pending
  time: TimeSource
}
export interface GameSinks {
  // The game may send messages to tell PIXI to render things
  renderActions: Stream<RenderAction>
  // Or to tell the Dom to have some content
  DOM: Stream<JSX.Element>
}

export function GameLoop(sources: GameSources): GameSinks {
  // This would let us control the game animation cycle but I don't think it's really worth it?
  // We can already pass our render events through main to keep the frames ticking,
  // it doesn't need to be here
  const animate$ = sources.time.animationFrames().map(f => {
    return {
      renderType: Renderable.UI,
      renderID: 1330,
      actionType: RenderActionType.Animate
    } as RenderAction
  })

  const screen$ = sources.DOM.select('#pixi')
    .events('click')
    .map(e => ScreenType.Menu)
    .startWith(ScreenType.Splash)

  return {
    // TODO: Create these real streams
    renderActions: xs.empty(),
    DOM: xs.empty()
  }
}
