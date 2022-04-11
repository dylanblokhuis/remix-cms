import { ActionFunction, json, LoaderFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react";
import Editor from "~/cms/editor";
import { EditorProvider } from "~/cms/editor/state";
import postService, { PostModel } from "~/cms/services/post.server";

export type LoaderType = PostModel | null
export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const query = new URLSearchParams(url.search);

  const id = query.get("edit");
  if (typeof id !== "string") return null;
  const post = await postService.get(id);
  if (!post) throw new Error("No post found with this id");

  return json<LoaderType>(post);
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const title = formData.get("title");
  const data = formData.get("data");

  if (typeof title !== "string") return json("No title found");
  if (typeof data !== "string") return json("No data found");

  const url = new URL(request.url);
  const query = new URLSearchParams(url.search);
  const id = query.get("edit");
  if (typeof id !== "string") return await postService.create({
    title,
    data: data,
    pathname: "/"
  });
  return await postService.update(id, {
    title,
    data: data,
    pathname: "/"
  });
}


export default function Create() {
  const post = useLoaderData<LoaderType>();

  return (
    <EditorProvider title={post?.title} data={post?.data || []}>
      <Editor />
    </EditorProvider>
  )
}
