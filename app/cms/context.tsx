import { createContext, useContext } from "react";
import { Component } from "./index";

interface ContextProps {
  components: Component[],
  data: Component[]
}
export const ComponentsContext = createContext<ContextProps>({
  components: [],
  data: []
});

export const useComponents: () => Required<Component[]> = () => {
  const context = useContext(ComponentsContext);
  if (!context) throw new Error("useComponents hook used outside CompontentsContext");

  const componentsWithData = context.components.map((component, index) => {
    if (component.props) return component;
    const props = context.data[index].props;
    component.props = props;
    Object.entries(props).forEach(([key, value]) => {
      const index = component.schema.fields.findIndex(field => field.slug === key);
      component.schema.fields[index].data = value;
    });

    return component;
  });

  return componentsWithData
}
