import { Suspense } from "react";
import { useComponents } from "~/cms/context";
import Block from "../block";
import { useEditorStore } from "../state";
import Toolbar from "../toolbar";

export default function List() {
  const data = useEditorStore(state => state.data);
  const { title, setTitle } = useEditorStore(state => ({ title: state.title, setTitle: state.setTitle }));
  const components = useComponents(data);

  return (
    <div className="list w-9/12">
      <Toolbar />

      <div className="p-4">
        <input type="text" value={title || ""} onChange={(event) => setTitle(event.target.value)} name="title" placeholder="Title" className="mb-4 border-2 p-3 rounded text-xl w-full" />

        {components.map((component, index) => {
          if (!component.component) return null;

          return (
            <Block id={index} key={index}>
              <Suspense>
                <component.component {...component.props} />
              </Suspense>
            </Block>
          )
        })}
      </div>
    </div>
  )
}
