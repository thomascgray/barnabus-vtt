## Usage

Those templates dependencies are maintained via [pnpm](https://pnpm.io) via `pnpm up -Lri`.

This is the reason you see a `pnpm-lock.yaml`. That being said, any package manager will work. This file can be safely be removed once you clone a template.

```bash
$ npm install # or pnpm install or yarn install
```

### Learn more on the [Solid Website](https://solidjs.com) and come chat with us on our [Discord](https://discord.com/invite/solidjs)

## Available Scripts

In the project directory, you can run:

### `npm run dev` or `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>

### `npm run build`

Builds the app for production to the `dist` folder.<br>
It correctly bundles Solid in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

## Deployment

You can deploy the `dist` folder to any static host provider (netlify, surge, now, etc.)

# dev notes

### dom manipulation for objects

- objects have their state assigned to them as data- attributes on the DOM

generally speaking, when we're interacting with objects

_sigh_ we need to replace all the "as your dragging state" with straight DOM style access

it cant be helped - state updating just simply isn't fast enough
so that means we need to direct inject into DOM for

- the drawing selection box
- the object selection box
- the resize handles
- resizing
- moving (already done)

and when you've finished the action, put it all back into state.

i still think solid is worth it just because its so much faster - but ye, a pain

**if we get rid of using state as the core, we dont need the pre stuff. the state IS the pre stuff, and we just change against the dom directly**

https://write.as/browserboard-blog/browserboard-update-everything-is-faster
