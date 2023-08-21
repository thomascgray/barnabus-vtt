import { eKey, eResizingFrom, iCamera, iObject, type iState } from "./types";
import * as Utils from "./utils";
import * as DOMUtils from "./dom-utils";
import * as Store from "./store";
import * as ResizeUtils from "./resize-utils";
import * as _ from "lodash";

export const interactionPanCamera = (movementX: number, movementY: number) => {
  const deltaX = movementX;
  const deltaY = movementY;

  const [x, y, z] = DOMUtils.getCameraDomPosStyleValues();

  window.__cameraDom!.style.transform = `scale(${z}) translate(${
    x - deltaX / z
  }px, ${y - deltaY / z}px)`;

  // const objects = document.getElementsByClassName("__object");
  // const canvasRect = window.__canvasDom!.getBoundingClientRect();
  // for (let obj of objects) {
  //   const objRect = obj.getBoundingClientRect();

  //   const inCamera =
  //     objRect.right > canvasRect.left &&
  //     objRect.left < canvasRect.right &&
  //     objRect.bottom > canvasRect.top &&
  //     objRect.top < canvasRect.bottom;

  //   if (inCamera) {
  //     // if the object has the "invisible" class, remove it
  //     if (obj.classList.contains("invisible")) {
  //       obj.classList.remove("invisible");
  //     }
  //   } else {
  //     if (!obj.classList.contains("invisible")) {
  //       obj.classList.add("invisible");
  //     }
  //   }
  // }
};

export const interactionMoveObjects = (e: MouseEvent) => {
  if (!window.__app_selectedObjects) {
    return;
  }
  const camera = Store.camera();
  const mouseDownPosCanvas = Store.mouseDownPosCanvas();

  const mousePoint = Utils.screenToCanvas(
    e.clientX,
    e.clientY,
    camera.x,
    camera.y,
    camera.z
  );

  // move the elements themeslves, and work out the top-left most set of coords
  // const elements = document.getElementsByClassName("__selected-object");
  const xList: number[] = [];
  const yList: number[] = [];
  for (let el of window.__app_selectedObjects) {
    const element = el as HTMLElement;
    const x =
      Number(element.dataset.posX) + (mousePoint.x - mouseDownPosCanvas.x);
    const y =
      Number(element.dataset.posY) + (mousePoint.y - mouseDownPosCanvas.y);
    xList.push(x);
    yList.push(y);
    DOMUtils.setStylesOnElement(element, { x, y });
  }

  // using the top-left most set of coords, move the selection box
  const objectSelectionBoxElement = document.getElementById(
    "__object-selection-highlight-box"
  );
  const minX = _.min(xList) as number;
  const minY = _.min(yList) as number;
  DOMUtils.setStylesOnElement(objectSelectionBoxElement!, { x: minX, y: minY });

  // also move the resize handles by the amount the mouse has moved
  const resizeHandles = document.getElementsByClassName("__resize-handle");
  for (let el of resizeHandles) {
    const resizeHandleElement = el as HTMLElement;
    const x =
      Number(resizeHandleElement.dataset.posX) +
      (mousePoint.x - mouseDownPosCanvas.x);
    const y =
      Number(resizeHandleElement.dataset.posY) +
      (mousePoint.y - mouseDownPosCanvas.y);
    DOMUtils.setStylesOnElement(resizeHandleElement!, { x, y });
  }
};

export const interactionResizeObjects = (e: MouseEvent) => {
  const camera = Store.camera();
  const mouseDownPosCanvas = Store.mouseDownPosCanvas();

  const mousePoint = Utils.screenToCanvas(
    e.clientX,
    e.clientY,
    camera.x,
    camera.y,
    camera.z
  );
  const diff = {
    x: mousePoint.x - mouseDownPosCanvas.x,
    y: mousePoint.y - mouseDownPosCanvas.y,
  };

  if (Store.isResizingFrom() === eResizingFrom.BOTTOM_LEFT) {
    ResizeUtils.resizeBottomLeftToTopRight(diff.x, diff.y);
  }

  if (Store.isResizingFrom() === eResizingFrom.BOTTOM_RIGHT) {
    ResizeUtils.resizeBottomRightToTopLeft(diff.x, diff.y);
  }
};

export const interactionZoomCamera = (e: WheelEvent) => {
  let scrollValue = e.deltaY;
  if (Math.abs(e.deltaY) === 100) {
    scrollValue = scrollValue * 0.1;
  }
  if (scrollValue > 30) {
    scrollValue = 30;
  } else if (scrollValue < -30) {
    scrollValue = -30;
  }

  const [x, y, z] = DOMUtils.getCameraDomPosStyleValues();

  const newCamera = Utils.zoomCamera(
    x,
    y,
    z,
    { x: e.clientX, y: e.clientY },
    scrollValue / 100
  );
  // window.__cameraDom!.style.transform = `scale(${newCamera.z}) translate(${newCamera.x}px, ${newCamera.y}px)`;
  window.__cameraDom!.style.transform = `translate(${newCamera.x}px, ${newCamera.y}px)`;
  window.__cameraDom!.style.scale = String(newCamera.z);

  // window.__cameraDom!.style.translate = String(newCamera.x);

  // update the app zoom factor on the canvas
  window.__canvasDom!.style.setProperty(
    "--app-camera-zoom",
    String(newCamera.z)
  );

  Store.setCamera(newCamera);
  window.__cameraDom!.dataset.posX = String(newCamera.x);
  window.__cameraDom!.dataset.posY = String(newCamera.y);
  window.__cameraDom!.dataset.posZ = String(newCamera.z);

  // const objects = document.getElementsByClassName("__object");
  // const canvasRect = window.__canvasDom!.getBoundingClientRect();
  // for (let obj of objects) {
  //   const objRect = obj.getBoundingClientRect();

  //   const inCamera =
  //     objRect.right > canvasRect.left &&
  //     objRect.left < canvasRect.right &&
  //     objRect.bottom > canvasRect.top &&
  //     objRect.top < canvasRect.bottom;

  //   if (inCamera) {
  //     // if the object has the "invisible" class, remove it
  //     if (obj.classList.contains("hidden")) {
  //       obj.classList.remove("hidden");
  //     }
  //   } else {
  //     if (!obj.classList.contains("hidden")) {
  //       obj.classList.add("hidden");
  //     }
  //   }
  // }
  // we now need to find all the elements that are offscreen, and hide them
};
