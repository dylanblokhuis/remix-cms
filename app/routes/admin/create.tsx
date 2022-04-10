import { ActionFunction, json, LoaderFunction } from "@remix-run/node"
import { useFetcher, useLoaderData } from "@remix-run/react";
import { useComponents } from "~/cms";
import Editor from "~/cms/editor";
import { EditorProvider } from "~/cms/editor/state";
import postService, { PostModel } from "~/cms/services/post.server";
import { library } from "~/root";

export const handle = {
  className: "admin"
}

export type LoaderType = PostModel | null
export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const query = new URLSearchParams(url.search);

  const id = query.get("edit");
  if (typeof id !== "string") return null;
  const post = await postService.get(id);
  if (!post) throw new Error("No post found with this id");

  // const data = JSON.parse(post.data?.toString()!);

  return json<LoaderType>(post);
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const title = formData.get("title");
  const components = formData.get("components");

  if (typeof title !== "string") return json("No title found");
  if (typeof components !== "string") return json("No components found");

  const url = new URL(request.url);
  const query = new URLSearchParams(url.search);
  const id = query.get("edit");
  if (typeof id !== "string") return await postService.create(title, components);
  return await postService.update(id, title, components);
}


export default function Create() {
  const post = useLoaderData<LoaderType>();
  const components = useComponents(post?.data?.toString());

  return (
    <EditorProvider title={post?.title} components={components} library={library}>
      <Editor />
    </EditorProvider>
  )
}
