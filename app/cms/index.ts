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

export { useComponents, ComponentsContext } from "./context"