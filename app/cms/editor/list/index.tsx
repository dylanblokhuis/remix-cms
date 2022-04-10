import Block from "../block";
import { useEditorStore } from "../state";

export default function List() {
  const store = useEditorStore();

  return (
    <div className="list w-9/12 p-4">
      <input type="text" name="title" id="title" placeholder="Title" className="mb-4 border-2 p-4 text-2xl w-full" />

      {store.components.map((component, index) => (
        <Block id={index} key={index}>
          <component.component {...component.props} />
        </Block>
      ))}

      <button onClick={() => store.add("banner")} type="button">
        Add
      </button>
    </div>
  )
}
