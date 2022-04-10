import create from "zustand";
import createContext from "zustand/context";
import { Component } from "..";

const { Provider, useStore } = createContext<Store>();
export const useEditorStore = useStore;

interface Init {
  library: Component[]
}

interface Store {
  library: Component[],
  components: Component[],
  focus: number | undefined,
  add: (name: string) => void
  setFocus: (index: number) => void
}

const store = (init: Init) => create<Store>((set) => ({
  library: init.library,
  components: [],
  focus: undefined,
  add: (name) => set((state) => {
    const component = state.library.find(it => it.schema.name === name);
    if (!component) throw new Error("Tried to add component that doesn't exist");
    state.components.push(component);
  }),
  setFocus: (index: number) => set((state) => {
    state.focus = index;
  }),
}));

interface EditorProviderProps extends Init {
  children: React.ReactNode
}
export function EditorProvider({ children, library }: EditorProviderProps) {
  return (
    <Provider createStore={() => store({ library })}>
      {children}
    </Provider>
  )
}