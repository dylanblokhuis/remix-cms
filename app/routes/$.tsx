import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
import { useComponents } from "~/cms";
import postService, { PostModel } from "~/cms/services/post.server";

type LoaderData = PostModel | null
export const loader: LoaderFunction = async ({ request }) => {
  const pathname = new URL(request.url).pathname;

  const post = await postService.getByPathname(pathname);
  return json<LoaderData>(post);
}

export default function Index() {
  const post = useLoaderData<LoaderData>();
  const components = useComponents(post?.data);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>{post?.title}</h1>

      {components.map((component, key) => (
        <Suspense key={key}>
          <component.component {...component.props} />
        </Suspense>
      ))}
    </div>
  );
}
