import create, { GetState, SetState, State, StateCreator, StoreApi } from "zustand";
import createContext from "zustand/context";
import { Component } from "..";
import produce, { Draft } from 'immer'
import { useFetcher } from "@remix-run/react";
type FetcherWithComponents = ReturnType<typeof useFetcher>

const { Provider, useStore } = createContext<Store>();
export const useEditorStore = useStore;

interface Init {
  library: Component[]
  title?: string
  components: Component[]
}

interface InitStore extends Init {
  fetcher: FetcherWithComponents
}

interface Store {
  fetcher: FetcherWithComponents | undefined,

  library: Component[]
  components: Component[]
  focus: number | undefined
  add: (name: string, props: any) => void
  setFocus: (index: number) => void
  edit: (index: number, slug: string, value: any) => void
  title: string | undefined
  setTitle: (title: string) => void

  save: () => void
}

const immer =
  <T extends State, CustomSetState extends SetState<T>, CustomGetState extends GetState<T>, CustomStoreApi extends StoreApi<T>>(
    config: StateCreator<T, (partial: ((draft: Draft<T>) => void) | T, replace?: boolean) => void, CustomGetState, CustomStoreApi>
  ): StateCreator<T, CustomSetState, CustomGetState, CustomStoreApi> =>
    (set, get, api) =>
      config(
        (partial, replace) => {
          const nextState = typeof partial === 'function' ? produce(partial as (state: Draft<T>) => T) : (partial as T)
          return set(nextState, replace)
        },
        get,
        api
      )


const store = (init: InitStore) => create<Store>(immer((set, get) => ({
  fetcher: init.fetcher,

  library: init.library,
  components: init.components,
  focus: undefined,
  add: (name) => set(state => {
    const component = state.library.find(it => it.schema.name === name);
    if (!component) throw new Error("Tried to add component that doesn't exist");
    state.components.push(component)
  }),
  setFocus: (index: number) => set((state) => {
    state.focus = index;
  }),
  edit: (index: number, slug: string, value) => set((state) => {
    const component = state.components[index];
    if (!component.props) component.props = {};
    component.props[slug] = value;
    Object.entries(component.props).forEach(([key, value]) => {
      const index = component.schema.fields.findIndex(field => field.slug === key);
      component.schema.fields[index].data = value;
    });
  }),

  title: init.title,
  setTitle: (title: string) => set((state) => {
    state.title = title;
  }),
  save: async () => {
    const fetcher = get().fetcher;

    fetcher?.submit({
      title: get().title || "",
      components: JSON.stringify(get().components)
    }, {
      method: "post",
      action: window.location.pathname + window.location.search
    });
  }
})));

interface EditorProviderProps extends Init {
  children: React.ReactNode
}
export function EditorProvider({ children, library, title, components }: EditorProviderProps) {
  const fetcher = useFetcher();

  return (
    <Provider createStore={() => store({ library, title, fetcher, components })}>
      {children}
    </Provider>
  )
}