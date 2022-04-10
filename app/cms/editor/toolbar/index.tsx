import { Plus } from "react-feather"
import BlockLibrary from "../block-library"
import { useEditorStore } from "../state"

export default function Toolbar() {
  const save = useEditorStore(state => state.save)
  return (
    <div className="p-4 border-b flex justify-between items-center">
      <BlockLibrary className="w-8 h-8 flex items-center justify-center text-white rounded bg-indigo-600">
        <Plus size={22} />
      </BlockLibrary>

      <button onClick={save} className="h-8 bg-indigo-600 text-center text-white px-3 rounded">
        Save
      </button>
    </div>
  )
}
