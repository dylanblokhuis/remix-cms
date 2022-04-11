import { createContext, useContext } from "react";
import { library } from "~/root";
import { Component, DataComponent } from "./index";

interface ContextProps {
  components: Component[],
}
export const ComponentsContext = createContext<ContextProps>({
  components: [],
});

export function useComponents(dataComponents?: DataComponent[]): Component[] {
  const context = useContext(ComponentsContext);
  if (!context) throw new Error("useComponents hook used outside CompontentsContext");
  if (!dataComponents) return [];

  return dataComponents.map(dataComponent => {
    const component = library.find(it => it.schema.name === dataComponent.schema.name);
    if (!component) throw new Error("Tried to load in component from data that doesn't exist in the library");
    const shallow = { ...dataComponent }
    // @ts-expect-error
    shallow.component = component.component;
    return shallow as Component;
  })
}
