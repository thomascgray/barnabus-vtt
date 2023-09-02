import {
  type Component,
  onMount,
  For,
  Show,
  onCleanup,
  createMemo,
} from "solid-js";
import * as Store from "../../store";
import { eMeasuringTools, eTool } from "../../types";
import * as Utils from "../../utils/general-utils";

// TODO all these components need to take into account
// the camera zoom level for the label and stuff

export const Wrapper: Component = (props) => {
  return (
    <>
      <Show when={Store.selectedMeasuringTool() === eMeasuringTools.LINE}>
        <StraightRule />
      </Show>
      <Show when={Store.selectedMeasuringTool() === eMeasuringTools.CIRCLE}>
        <Circle />
      </Show>
      <Show when={Store.selectedMeasuringTool() === eMeasuringTools.SQUARE}>
        <Square />
      </Show>
    </>
  );
};
export const StraightRule: Component = (props) => {
  const length = createMemo(() => {
    const originalLength = Math.max(
      Math.abs(
        Store.tabKeyMouseDownPosCanvas().x -
          Store.mousePosMeasuringDistance().x,
      ),
      Math.abs(
        Store.tabKeyMouseDownPosCanvas().y -
          Store.mousePosMeasuringDistance().y,
      ),
    );
    console.log("originalLength", originalLength);
    return Math.round(originalLength / Store.measuringScale());
  });
  return (
    <>
      <svg
        class="absolute left-0 top-0 z-[9999999999] overflow-visible"
        height={window.innerHeight}
        width={window.innerWidth}
      >
        <line
          x1={Store.tabKeyMouseDownPosCanvas().x}
          y1={Store.tabKeyMouseDownPosCanvas().y}
          x2={Store.mousePosMeasuringDistance().x}
          y2={Store.mousePosMeasuringDistance().y}
          style={`
            stroke: var(--app-measuring-tool-colour);
            stroke-width: calc(2px / var(--app-camera-zoom));
          `}
        />
      </svg>
      <p
        style={`
      transform: translate(calc(${
        Store.tabKeyMouseDownPosCanvas().x
      }px - 50%), calc(${Store.tabKeyMouseDownPosCanvas().y}px - 50%));
      `}
        class="absolute left-0 top-0 z-[9999999999] rounded-full bg-red-500 px-4 py-2 text-center text-sm font-bold text-white"
      >
        {length()} Squares
      </p>
    </>
  );
};

export const Circle: Component = (props) => {
  const length = createMemo(() => {
    const originalLength =
      Math.abs(
        Store.tabKeyMouseDownPosCanvas().x -
          Store.mousePosMeasuringDistance().x,
      ) * 2;

    return Math.round(originalLength / Store.measuringScale());
  });
  return (
    <>
      <svg
        class="absolute left-0 top-0 z-[9999999999] overflow-visible"
        height={window.innerHeight}
        width={window.innerWidth}
      >
        <circle
          cx={Store.tabKeyMouseDownPosCanvas().x}
          cy={Store.tabKeyMouseDownPosCanvas().y}
          r={Math.abs(
            Store.mousePosMeasuringDistance().x -
              Store.tabKeyMouseDownPosCanvas().x,
          )}
          fill-opacity="20%"
          style={`
            stroke: var(--app-measuring-tool-colour);
            fill: var(--app-measuring-tool-colour);
            stroke-width: calc(2px / var(--app-camera-zoom));
          `}
        />
      </svg>
      <p
        style={`
      transform: translate(calc(${
        Store.tabKeyMouseDownPosCanvas().x
      }px - 50%), calc(${Store.tabKeyMouseDownPosCanvas().y}px - 50%));
      `}
        class="absolute left-0 top-0 z-[9999999999] rounded-full bg-red-500 px-4 py-2 text-center text-sm font-bold text-white"
      >
        {length()} Squares
      </p>
    </>
  );
};

export const Square: Component = (props) => {
  const length = createMemo(() => {
    const originalLength =
      Math.abs(
        Store.tabKeyMouseDownPosCanvas().x -
          Store.mousePosMeasuringDistance().x,
      ) * 2;

    return Math.round(originalLength / Store.measuringScale());
  });
  const width = createMemo(() => {
    return Math.abs(
      Store.mousePosMeasuringDistance().x - Store.tabKeyMouseDownPosCanvas().x,
    );
  });
  const height = createMemo(() => {
    return Math.abs(
      Store.mousePosMeasuringDistance().y - Store.tabKeyMouseDownPosCanvas().y,
    );
  });
  const ratio = () => Math.max(width(), height());
  return (
    <>
      <svg
        class="absolute left-0 top-0 z-[9999999999] overflow-visible"
        height={window.innerHeight}
        width={window.innerWidth}
      >
        <rect
          x={Store.tabKeyMouseDownPosCanvas().x - (ratio() * 2) / 2}
          y={Store.tabKeyMouseDownPosCanvas().y - (ratio() * 2) / 2}
          width={ratio() * 2}
          height={ratio() * 2}
          fill-opacity="20%"
          class="origin-center"
          style={`
            transform-box: fill-box;
            stroke: var(--app-measuring-tool-colour);
            fill: var(--app-measuring-tool-colour);
            stroke-width: calc(3px / var(--app-camera-zoom));
            transform: rotate(${Utils.calculateRotationAngle(
              Store.tabKeyMouseDownPosCanvas(),
              Store.mousePosMeasuringDistance(),
            )}deg);
          `}
        />
      </svg>
      <p
        style={`
      transform: translate(calc(${
        Store.tabKeyMouseDownPosCanvas().x
      }px - 50%), calc(${Store.tabKeyMouseDownPosCanvas().y}px - 50%));
      `}
        class="absolute left-0 top-0 z-[9999999999] rounded-full bg-red-500 px-4 py-2 text-center text-sm font-bold text-white"
      >
        {length()} Squares
      </p>
    </>
  );
};
