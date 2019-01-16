import { adapt } from '@cycle/run/lib/adapt'
import xs, { Stream } from 'xstream'
import fromEvent from 'xstream/extra/fromEvent'
import { RenderAction, RenderActionType, Renderable } from '@src/StreamDefs'
import { Frame } from '@cycle/time/lib/cjs/src/animation-frames'
import * as PIXI from 'pixi.js'

// onElementReady.js
const onElementReady = ($element): Promise<HTMLCanvasElement> =>
  new Promise(resolve => {
    const waitForElement = () => {
      if ($element()) {
        resolve($element())
      } else {
        window.requestAnimationFrame(waitForElement)
      }
    }
    waitForElement()
  })
const canvas = () => document.querySelector('#pixi')

function makePixiDriver() {
  // We have to do this asynchronously so that we can actually hook things up to the virtual DOM (which lets the DOMDriver do things for us)
  let applicationPromise = onElementReady(canvas).then(
    c => new PIXI.Application({ view: c as HTMLCanvasElement })
  )

  let resourcesLoaded = false
  let idToSprite = {}

  function pixiDriver(sink$: Stream<RenderAction | Frame>) {
    // Hold onto our streams with a closure, and set up the listeners when we can
    const event$promise = applicationPromise.then(app => {
      // Initial renderer stuff
      app.renderer.backgroundColor = 0xff00ff
      app.renderer.resize(500, 500)
      app.ticker.stop()
      app.ticker.autoStart = false

      app.stage.interactive = true

      PIXI.loader
        .add('fenix', 'images/phoenix.png')
        .load(() => (resourcesLoaded = true))

      // Setup listenesrs for Render Actions - messages that tell us to do something
      sink$
        .filter(
          maybeRenderAction =>
            (maybeRenderAction as RenderAction).renderID !== undefined
        )
        .addListener({
          next: renderAction => {
            renderAction = renderAction as RenderAction
            console.log('Pixi receieved a message!', renderAction)
            // Do stuff with the RenderAction - add objects, render things, animate shit
            if (renderAction.actionType === RenderActionType.Add) {
              // TODO: real actions
              // Find the data for the thing we're adding
              switch (renderAction.renderType) {
                case Renderable.Backdrop:
                  let backdrop = new PIXI.Sprite(
                    PIXI.loader.resources[renderAction.assetName].texture
                  )
                  idToSprite[renderAction.renderID] = backdrop
                  app.stage.addChild(backdrop)
                  break
              }
              // Add the thing to the scene
            } else if (renderAction.actionType === RenderActionType.Remove) {
              switch (renderAction.renderType) {
                case Renderable.Backdrop:
                  if (idToSprite[renderAction.renderID]) {
                    app.stage.removeChild(idToSprite[renderAction.renderID])
                  }
                  break
              }
            }
          }
        })

      // Setup listener to manually control render cycle - we don't want to tick, we want to sync our renders
      sink$
        .filter(maybeFrame => (maybeFrame as Frame).delta !== undefined)
        .addListener({
          next: animationFrame => {
            animationFrame = animationFrame as Frame
            app.render()
            animationFrame.delta >= 17
              ? console.warn('PIXI: greater than 17 ms frame')
              : undefined
          }
        })

      console.log('initialized pixi')

      // monkey patch in any event
      const oldEmit = app.renderer.plugins.interaction.emit
      app.renderer.plugins.interaction.emit = function(e, f) {
        // Every time we emit an event... also emit an "any" event with the same data
        // Piss off, it works. If it starts being too slow I can fix it then.
        oldEmit.apply(app.renderer.plugins.interaction, ['any', f])
        oldEmit.apply(app.renderer.plugins.interaction, arguments)
      }

      const event$ = xs.create({
        start: listener => {
          // Catch any fukken message, just in case we want to use it later.
          app.renderer.plugins.interaction.on('any', message => {
            listener.next(message)
          })
        },
        stop: () => {}
      })
      const ref = event$.addListener({ next: () => {} })
      // Give back the stream of events
      return adapt(event$)
    })

    const interactionStream = xs.fromPromise(event$promise).flatten()
    // interactionStream.addListener({ next: e => console.log(interactionStream) })
    // console.log(interactionStream.debug())

    // Send interaction information so we can use that; flatten because fromPromise is a Stream<Stream<>>
    return interactionStream
  }

  return pixiDriver
}

export default makePixiDriver

// if (module.hot) {
//   module.hot.decline()
// }
