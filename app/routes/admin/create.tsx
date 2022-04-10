import { LoaderFunction } from "@remix-run/node"
import { useComponents } from "~/cms";
import Editor from "~/cms/editor";
import { EditorProvider } from "~/cms/editor/state";

export const handle = {
  className: "admin"
}

export const loader: LoaderFunction = () => {
  // const components = global.cms;

  // console.log(components);


  return true;
}


export default function Create() {
  const components = useComponents();

  return (
    <EditorProvider library={components}>
      <Editor />
    </EditorProvider>
  )
}
