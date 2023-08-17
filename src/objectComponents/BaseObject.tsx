import { Component, Show, createEffect, createMemo } from "solid-js";
import { eObjectType, iObject } from "../types";
import * as EventHandlers from "../event-handlers";
import { ImageObject } from "./Image";
import * as Store from "../store";

export interface BaseComponentProps {
  object: iObject;
  isSelected?: boolean;
}

export const BaseComponent: Component<BaseComponentProps> = (props) => {
  // const isHidden = Math.random() > 0.25;
  const derivedUrl = createMemo(() => props.object.url);
  const derivedId = createMemo(() => props.object.id);

  if (props.object.type === eObjectType.IMAGE) {
    createEffect((prev) => {
      const _url = derivedUrl();
      const _id = derivedId();
      if (prev === _url) {
        return;
      }
      if (_url) {
        let img = new Image();
        img.onload = function () {
          Store.setObjects(_id, {
            dimensions: {
              width: img.width,
              height: img.height,
            },
            preResizeDimensions: {
              width: img.width,
              height: img.height,
            },
          });

          // @ts-ignore - manual garbage collection baybee
          img = null;
        };
        img.src = _url;
      }
      return _url;
    });
  }

  return (
    <>
      <img
        data-pos-x={props.object.pos.x}
        data-pos-y={props.object.pos.y}
        data-width={props.object.dimensions.width}
        data-height={props.object.dimensions.height}
        id={props.object.id}
        class="bg-red-200 absolute select-none top-0 left-0 __inlens"
        classList={{
          "__selected-object hover:cursor-grab": props.isSelected,
        }}
        draggable="false"
        onMouseDown={(e) => {
          EventHandlers.onObjectMouseDown(e, props.object);
        }}
        src={props.object.url}
        style={`outline-width: var(--app-border-thickness);
      width: ${props.object.dimensions.width}px;
      height: ${props.object.dimensions.height}px;
      z-index: ${props.object.zIndex};
      transform:
        translate(${props.object.pos.x}px,
          ${props.object.pos.y}px)`}
      />
    </>
  );
};

export default BaseComponent;
