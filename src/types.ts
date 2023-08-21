declare global {
  interface Window {
    __app_selectedObjects?: HTMLCollectionOf<Element>;
    __cameraDom?: HTMLElement;
    __backgroundAppDom?: HTMLElement;
    __setScrollingTimeout?: any;

    __canvasContext?: CanvasRenderingContext2D;
  }
}

export enum eTool {
  DEFAULT = "DEFAULT",
  SKETCH = "SKETCH",
}
export enum eKey {
  SPACE = " ",
  NUMBER_1 = "1",
  NUMBER_2 = "2",
  NUMBER_3 = "3",
  ESCAPE = "Escape",
  SHIFT = "Shift",
  CONTROL = "Control",
  V = "v",
  DELETE = "Delete",
  UP = "ArrowUp",
  DOWN = "ArrowDown",
  LEFT = "ArrowLeft",
  RIGHT = "ArrowRight",
}

export enum eMouseButton {
  LEFT = 0,
  MIDDLE = 1,
  RIGHT = 2,
}

export enum eObjectType {
  IMAGE = "IMAGE",
  TEXT = "TEXT",
}

export enum eResizingFrom {
  BOTTOM_RIGHT = "BOTTOM_RIGHT",
  BOTTOM_LEFT = "BOTTOM_LEFT",
}

export interface iObject {
  id: string;

  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  type: eObjectType;

  // used for text at the minute but maybe other stuff later on?
  isFocused: boolean;

  // for images
  url?: string;
  hasSelfResized?: boolean;

  // for text
  text?: string;
  fontSize?: number;
  lineHeight?: number;
}

export interface iPoint {
  x: number;
  y: number;
}
export interface iDimensions {
  _width: number;
  _height: number;
}

export interface iBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface iCamera {
  x: number;
  y: number;
  z: number;
}
