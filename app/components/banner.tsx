import { type Schema } from '~/cms'

export const schema: Schema = {
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
    <div className='p-4 bg-gray-500 text-white'>
      <h1 className='text-xl'>{props.title}</h1>
    </div>
  )
}
