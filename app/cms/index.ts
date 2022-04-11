import React, { LazyExoticComponent } from "react"

type FieldType = "text" | "textarea"

export interface Field {
  name: string
  slug: string
  type: FieldType
  data?: any
}

export interface Schema {
  fields: Field[]
}

export interface LibraryComponent {
  name: string
  schema: Schema,
  component: LazyExoticComponent<any>
}

export interface DataComponent {
  name: string
  schema: Schema,
  props: any
}

export interface Component {
  name: string
  schema: Schema,
  component: LazyExoticComponent<any>
  props: any
}

export type Library = {
  name: string
  module: () => Promise<{ default: React.ComponentType<any>, schema: Schema }>
}[]

export { useComponents, ComponentsContext } from "./context"