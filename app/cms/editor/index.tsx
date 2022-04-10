import { Form } from "@remix-run/react";
import Block from "./block";
import { useEditorStore } from "./state";

export default function Editor() {
  const store = useEditorStore();

  console.log(store);

  return (
    <Form method="post" className="max-w-xl py-5 mx-auto">
      <input type="text" name="title" id="title" placeholder="Title" className="mb-4 border-2 p-4 text-2xl w-full" />


      {store.components.map((usedComponent, index) => (
        <Block id={index} key={index}>
          <usedComponent.component {...usedComponent.props} />
        </Block>
      ))}

      <button onClick={() => store.add("banner")} type="button">
        Add
      </button>
    </Form>
  )
}
