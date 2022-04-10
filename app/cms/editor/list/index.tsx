import Block from "../block";
import { useEditorStore } from "../state";
import Toolbar from "../toolbar";

export default function List() {
  const components = useEditorStore(state => state.components);
  const { title, setTitle } = useEditorStore(state => ({ title: state.title, setTitle: state.setTitle }));

  return (
    <div className="list w-9/12">
      <Toolbar />

      <div className="p-4">
        <input type="text" value={title || ""} onChange={(event) => setTitle(event.target.value)} name="title" placeholder="Title" className="mb-4 border-2 p-3 rounded text-xl w-full" />

        {components.map((component, index) => (
          <Block id={index} key={index}>
            <component.component {...component.props} />
          </Block>
        ))}
      </div>
    </div>
  )
}
