import xs, { Stream } from 'xstream'
import { DOMSource } from '@cycle/dom'
import { ScreenType } from '../constants/ScreenType'
import { Renderable, RenderActionType, RenderAction } from '@src/StreamDefs'
import { TimeSource } from '@cycle/time'

export interface ScreenSources {
  DOM: DOMSource
  time: TimeSource
}
export type ScreenSinks = Stream<RenderAction>

export function Screen(sources: ScreenSources): ScreenSinks {
  const screenEvent$ = xs.create({
    start: function(listener) {},
    stop: function() {}
  })

  const removePrior$ = screenEvent$.map(n => ({
    renderID: undefined,
    renderType: Renderable.UI,
    actionType: RenderActionType.Remove
  }))

  const addNew$ = screenEvent$.map(n => ({
    renderID: n,
    renderType: Renderable.UI,
    actionType: RenderActionType.Add
  }))

  return xs.merge(removePrior$, addNew$)
}
