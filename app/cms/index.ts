import React from "react"

type FieldType = "text" | "textarea"

export interface Field {
  name: string
  slug: string
  type: FieldType
  data?: any
}

export interface Schema {
  name: string
  fields: Field[]
}

export interface Component {
  schema: Schema,
  component: React.FunctionComponent
  props?: any
}

export async function registerComponents(components: Component[]): Promise<Component[]> {
  global.cms = {
    components
  }

  const componentsWithData = components.map(component => {

    component.props = {
      "title": "fgdgdfg",
      "subtitle": "yooooooo"
    };

    return component;
  });

  return componentsWithData;
}

export { useComponents, ComponentsContext } from "./context"