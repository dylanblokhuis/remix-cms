import { createContext, useContext } from "react";
import { library } from "~/root";
import { Component } from "./index";

interface ContextProps {
  components: Component[],
}
export const ComponentsContext = createContext<ContextProps>({
  components: [],
});

export function useComponents(data?: string): Required<Component[]> {
  const context = useContext(ComponentsContext);
  if (!context) throw new Error("useComponents hook used outside CompontentsContext");
  if (!data) return [];

  const dataComponents = JSON.parse(data) as Component[];
  const components = dataComponents.map(dataComponent => {
    const component = library.find(it => it.schema.name === dataComponent.schema.name);
    if (!component) throw new Error("Tried to load in component from data that doesn't exist in the library");
    dataComponent.component = component.component;
    return dataComponent;
  })

  return components
}
