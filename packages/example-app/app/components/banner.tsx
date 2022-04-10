import { type Schema } from '@cms/lib'

export const schema: Schema = {
  name: "banner",
  fields: [
    {
      name: "Title",
      slug: "title",
      type: "text"
    },
    {
      name: "Subtitle",
      slug: "subtitle",
      type: "text"
    },
  ]
}

export default function Banner(props: any) {
  return (
    <div>

      banner: {JSON.stringify(props)}

      <h1>{props.title}</h1>
    </div>
  )
}
