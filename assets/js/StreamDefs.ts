import xs, { Stream } from 'xstream'
import Entity from './types/entity/BaseEntity'
import Unit from './game/entity/Unit'

export enum Screen {
  // InitSplash,
  MainMenu,
  // CharacterCreation,
  // StoryMap,
  // Cutscene,
  // BattleMap,
  FightScreen
}

export type Event = {}

export enum Renderable {
  UI,
  Backdrop,
  Scene
}

export enum RenderActionType {
  Add,
  Remove,
  Move,
  Animate
  // Re-sprite?
}

export interface RenderAction {
  renderType: Renderable
  renderID: any
  actionType: RenderActionType
}

export interface GameState {
  screen$: Stream<Screen>
  unit$: Stream<Unit>[]
  userEvent$: Stream<Event>
}

/**
 *  For minimal; battle implementation, we need to be able to give it
 * -setting stuff (Background, floor)
 * -entities which include Sprite & Position capabilities
 */
export interface RenderingSources {
  state$: Stream<RenderAction>
}

/**
 * **. Sources -> GameState -> THREE or other renderer: Rendering shouldn't have actionable sinks, it should be mutating the WebGL/canvas.**
 */
