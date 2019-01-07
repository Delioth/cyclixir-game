# Game Engine

This project is a brand new game I'm building using as much pure functional programming as possible. It's built with an Elixir/Phoenix server, a PostgreSQL database, a socket connector from the frontend to the backend, and a Typescript Cycle.js powered frontend which can talk to a Pixi.js rendering application.

This project exposes a new driver for Cycle.js, the `pixi-cycle-driver`. Still in progress, it's a way for a cycle project to talk to the pixi canvas or webgl renderer to be able to render "things", and also pulls the interactions from the pixi in a stream.

There's an in-progress Entity-Component-System frame set up, where systems become part of the Source-Sink flow to take in actions from outside the application (user actions, socket information) to create actions which drivers should be able to turn into side-effects.

In short, the current game is less than complete - it's completely unplayable, the engine isn't even close to done.

# Running the project

To start your Phoenix server:

- Install dependencies with `mix deps.get`
- Create and migrate your database with `mix ecto.create && mix ecto.migrate`
- Install Node.js and Cycle dependencies with `cd assets && npm install`
- Start Phoenix endpoint with `mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

As of right now, this project requires a Postgresql instance running on the default port for `ecto.create` to run correctly. The instance is not used, and will be phased out.
