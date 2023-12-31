import { Component, createEffect } from "solid-js";
import { eTool, iObject } from "../types";
import * as BattlemapUtils from "../utils/battlemap-utils";
import * as Store from "../store";

export const SquaresOverlay: Component<{ object: iObject }> = (props) => {
  let canvasRef: any;

  createEffect(() => {
    const context = canvasRef.getContext("2d");
    if (!context) {
      return;
    }
    const squareSize = BattlemapUtils.calculateFinalSquareSize(
      props.object.width,
      props.object.battlemap_squaresAcross || 20,
    );
    const numberOfSquaresX = Math.ceil(props.object.width / squareSize);
    const numberOfSquaresY = Math.ceil(props.object.height / squareSize);
    // // clear the canvas
    context.clearRect(0, 0, props.object.width, props.object.height);
    context.beginPath();

    // todo wait - why am i not just drawing the lines? why am i drawing individual rectangles? what the fuck am i doing?
    for (let x = 0; x < numberOfSquaresX; x++) {
      for (let y = 0; y < numberOfSquaresY; y++) {
        context.rect(
          x * squareSize + (props.object.battlemap_xOffset || 0),
          y * squareSize + (props.object.battlemap_yOffset || 0),
          squareSize,
          squareSize,
        );
      }
    }

    context.strokeStyle = props.object.battlemap_gridColour || "#FFF";
    context.lineWidth = props.object.battlemap_gridLineThickness || 1;
    context.globalAlpha = props.object.battlemap_gridOpacity || 0.2;
    context.stroke();
  });

  return (
    <canvas
      // we need to update the measuring scale of whatever battlemap
      // we're on top of, whether it has its grid turned on or not
      // onMouseDown={(e) => {
      //   // this cant happen here, it needs to happen
      //   // on some kind of generic
      //   const squareSize = BattlemapUtils.calculateFinalSquareSize(
      //     props.object.width,
      //     props.object.battlemap_squaresAcross || 20,
      //   );
      //   Store.setMeasuringScale(squareSize);
      // }}
      style={`
    width: ${props.object.width}px;
    height: ${props.object.height}px;
    z-index: ${props.object.zIndex + 1};
    transform:
      translate(
        ${props.object.x}px,
        ${props.object.y}px)
    `}
      ref={canvasRef}
      width={props.object.width}
      height={props.object.height}
      class="canvas-capture absolute left-0 top-0 w-full"
      classList={{
        "pointer-events-none": Store.selectedTool() !== eTool.MEASURING,
      }}
    ></canvas>
  );
};

export const HexesFlatTopOverlay: Component<{ object: iObject }> = (props) => {
  let canvasRef: any;

  createEffect(() => {
    const context = canvasRef.getContext("2d");
    if (!context) {
      return;
    }
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.beginPath();
    context.strokeStyle = props.object.battlemap_gridColour || "#FFF";
    context.lineWidth = props.object.battlemap_gridLineThickness || 1;
    context.globalAlpha = props.object.battlemap_gridOpacity || 0.2;

    BattlemapUtils.drawGrid_FlatTop(
      context,
      props.object.width,
      props.object.height,
      props.object.battlemap_squaresAcross || 20,
      props.object.battlemap_squaresAcross || 20,
    );
    context.closePath();
  });

  return (
    <canvas
      style={`
    width: ${props.object.width}px;
    height: ${props.object.height}px;
    z-index: ${props.object.zIndex + 1};
    transform:
      translate(
        ${props.object.x}px,
        ${props.object.y}px)
    `}
      ref={canvasRef}
      width={props.object.width}
      height={props.object.height}
      class="canvas-capture pointer-events-none absolute left-0 top-0 w-full"
    ></canvas>
  );
};

export const HexesPointyTopOverlay: Component<{ object: iObject }> = (
  props,
) => {
  let canvasRef: any;

  createEffect(() => {
    const context = canvasRef.getContext("2d");
    if (!context) {
      return;
    }
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.beginPath();
    context.strokeStyle = props.object.battlemap_gridColour || "#FFF";
    context.lineWidth = props.object.battlemap_gridLineThickness || 1;
    context.globalAlpha = props.object.battlemap_gridOpacity || 0.2;

    BattlemapUtils.drawGrid_PointyTop(
      context,
      props.object.width,
      props.object.height,
      props.object.battlemap_squaresAcross || 20,
      props.object.battlemap_squaresAcross || 20,
    );
    context.closePath();
  });

  return (
    <canvas
      style={`
    width: ${props.object.width}px;
    height: ${props.object.height}px;
    z-index: ${props.object.zIndex + 1};
    transform:
      translate(
        ${props.object.x}px,
        ${props.object.y}px)
    `}
      ref={canvasRef}
      width={props.object.width}
      height={props.object.height}
      class="canvas-capture pointer-events-none absolute left-0 top-0 w-full"
    ></canvas>
  );
};
