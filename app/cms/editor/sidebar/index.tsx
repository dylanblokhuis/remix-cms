import { useEditorStore } from "../state"
import Field from "./field"

export default function Sidebar() {
  const focus = useEditorStore(store => store.focus);
  const data = useEditorStore(store => store.data);

  if (focus === undefined) return null;

  const component = data[focus];
  const fields = component.schema.fields

  return (
    <aside className="w-3/12 border-l p-4">
      <strong className="mb-4 block">{component.name}</strong>

      {fields.map((field) => (
        <div className="flex flex-col mb-4" key={`${focus}_${field.slug}`}>
          <label className="uppercase tracking-wide font-medium text-sm text-gray-400">{field.name}</label>

          <Field key={`${focus}_${field.slug}`} {...field} />
        </div>
      ))}
    </aside>
  )
}
