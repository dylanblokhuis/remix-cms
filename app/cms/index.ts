import { LazyExoticComponent } from "react"

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

export interface LibraryComponent {
  schema: Schema,
  component: LazyExoticComponent<any>
}

export interface DataComponent {
  schema: Schema,
  props: any
}

export interface Component {
  schema: Schema,
  component: LazyExoticComponent<any>
  props: any
}

export { useComponents, ComponentsContext } from "./context"