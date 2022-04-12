import { json, LoaderFunction } from "@remix-run/node";
import {
  Link,
  useLoaderData,
  useLocation,
  useSearchParams,
} from "@remix-run/react";
import { Plus } from "react-feather";
import postTypeService, {
  PostTypeModelWithPosts,
} from "~/cms/services/postType.server";

type LoaderType = PostTypeModelWithPosts;
export const loader: LoaderFunction = async ({ params, request }) => {
  const { postType: id } = params;
  if (!id) throw new Error("No id provided");
  const postType = await postTypeService.getWithPosts(id);
  if (!postType) throw new Error("Post type not found");
  return json<LoaderType>(postType);
};

export default function PostType() {
  const postType = useLoaderData<LoaderType>();
  const location = useLocation();

  return (
    <div className="px-4 py-3">
      <div className="flex items-center mb-4">
        <h1 className="text-2xl font-bold mr-4">{postType.plural}</h1>

        <Link
          to={`${location.pathname}/editor`}
          className="w-7 h-7 flex items-center justify-center bg-slate-900 text-white rounded"
        >
          <Plus />
        </Link>
      </div>

      <table>
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Author</th>
            <th scope="col">Status</th>
            <th scope="col">Date</th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {postType.posts.map((post) => (
            <tr key={post.id}>
              <td>
                <div className="text-sm font-medium text-gray-900">
                  {post.title}
                </div>

                <div className="text-sm font-medium text-gray-600">
                  {post.pathname}
                </div>
              </td>
              <td>
                <div className="text-sm text-gray-900">{post.author.name}</div>
                <div className="text-sm text-gray-500">Admin</div>
              </td>
              <td>
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  {post.status === "PUBLISHED" && "Published"}
                  {post.status === "DRAFT" && "Draft"}
                  {post.status === "TRASHED" && "Trashed"}
                </span>
              </td>
              <td className="text-sm text-gray-500">
                {post.createdAt.toString()}
              </td>
              <td className="text-right text-sm font-medium">
                <a
                  href={post.pathname}
                  target="_blank"
                  className="mr-4"
                  rel="noreferrer"
                >
                  View
                </a>
                <Link
                  to={`${location.pathname}/editor?edit=${post.id}`}
                  className="link"
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
