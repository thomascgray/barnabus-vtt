# Barnabus VTT

Like Miro or Google Jaboard or Microsoft Whiteboard, but for tabletop RPGs.

## Technology Stack

- [SolidJS](https://www.solidjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)

# dev notes

- everything is controlled by SolidJS state, see `src\store.ts`
- when the user does something "real time", e.g dragging objects around, resizing objects, panning the camera we:

  - on mouse down, collect relevant state
  - on mouse move, directly modify CSS styles
  - on mouse up, grab the newly modified CSS styles and put them back into state

  this gives the effect of everything working smoothly. when you let go of the mouse, nothing changes, but under the hood everything takes a split second to re-render because we update the state; but because we were directly changing CSS on the mouse move, from the users POV nothing changes

General app architecture

- `src\App.tsx` loads everything in and sets up global event handlers
- all the objects get rendered with `src\objectComponents\BaseObject.tsx`
- various ephemeral UI components (the selection box, the resize handles, etc.) are in `src\uiComponents`
- various on clicks on objects and from App are handled in `src\event-handlers.ts` and determine what should happen based on what buttons a user is pressing, if they already have selected objects, etc.
- the actual specific interactions that should take place are then handled in `src/interaction-handlers.ts`; moving objects, resizing objects, etc.

there is then a bunch of utils to do maths, to interact with the DOM, etc.

### performance

**if we get rid of using state as the core, we dont need the pre stuff. the state IS the pre stuff, and we just change against the dom directly**

https://write.as/browserboard-blog/browserboard-update-everything-is-faster

https://stackoverflow.com/questions/25910500/1000-dom-elements-on-a-single-page

the browser is VERY sensitive to dom nodes - maybe its nested dom nodes?

when each object is like this:

```html
<div>
  <img />
</div>
```

it works MUCH faster than when each object is like this:

```html
<div>
  <img />
  <p>debug info</p>
  <p>debug info</p>
  <p>debug info</p>
  <p>debug info</p>
</div>
```

thats something we should take into account - hiding DOM nodes when
they're effectively too small

---

average BitD charactr is 60 to 100 objects - the main sheet, then a bunch of dots, etc.

by the end of the bitd campaign, the entire board was 1588 objects

---

https://github.com/wilsonpage/fastdom

---

maybe we should start doing mad shit like keeping all selected object dom nodes on the window so we don't have to recompute, etc.
