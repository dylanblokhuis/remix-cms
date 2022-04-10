import { ActionFunction, json, LoaderFunction } from "@remix-run/node"
import { useFetcher } from "@remix-run/react";
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

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const title = formData.get("title");
  const components = formData.get("components");

  console.log(title, components);

  return json({
    hello: "wordl"
  })
}


export default function Create() {
  const components = useComponents();

  return (
    <EditorProvider title="" library={components}>
      <Editor />
    </EditorProvider>
  )
}
