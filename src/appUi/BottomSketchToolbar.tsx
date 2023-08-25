import { Component, createMemo, createEffect, onMount, For } from "solid-js";
import * as Store from "../store";
import { eTool } from "../types";
import * as Icons from "../icons";

const ColourPickerButton: Component<{ colour: string }> = (props) => {
  return (
    <button
      onClick={() => {
        Store.setPenColour(props.colour);
      }}
      style={{ "background-color": props.colour }}
      class="h-3 w-3 rounded-full bg-slate-400 p-3 text-white hover:bg-slate-500"
      classList={{
        "outline outline-blue-400 outline-dashed":
          Store.penColour() === props.colour,
      }}
    >
      {/* <Icons.DropletFilled /> */}
    </button>
  );
};

const colours = [
  "#1abc9c",
  "#2ecc71",
  "#3498db",
  "#9b59b6",
  "#34495e",
  "#f1c40f",
  "#e67e22",
  "#e74c3c",
  "#ecf0f1",
  "#95a5a6",
];

export const BottomSketchToolbar: Component = (props) => {
  return (
    <div class="fixed bottom-[5rem] left-[50%] z-50 flex translate-x-[-50%] flex-row items-center justify-center space-x-2 rounded-2xl border border-solid border-slate-400 bg-slate-300 p-2 text-white shadow-lg">
      {/* buttons to change pen colour */}
      <div class="colours grid grid-cols-5 gap-2">
        <For each={colours}>
          {(colour) => <ColourPickerButton colour={colour} />}
        </For>
      </div>

      <input
        class="accent-slate-600"
        type="range"
        value={Store.penSize()}
        onInput={(e) => {
          Store.setPenSize(parseInt(e.currentTarget.value));
        }}
        min={10}
        step={5}
        max={50}
      />

      <div class="flex min-w-[50px] justify-around">
        <div
          style={`
          width: ${Store.penSize()}px;
          height: ${Store.penSize()}px;
          background-color: ${Store.penColour()};
      `}
          class="rounded-full"
        ></div>
      </div>
    </div>
  );
};