import { json, LoaderFunction } from '@remix-run/node'
import { Link, Outlet, useLoaderData } from '@remix-run/react'
import postTypeService, { PostTypeModel } from '~/cms/services/postType.server'

export const handle = {
  className: "admin"
}

type LoaderType = {
  postTypes: PostTypeModel[]
}
export const loader: LoaderFunction = async () => {
  const postTypes = await postTypeService.getAll();

  return json<LoaderType>({
    postTypes
  })
}

export default function AdminLayouts() {
  const { postTypes } = useLoaderData<LoaderType>();

  return (
    <div className='flex h-full'>
      <div className='w-44 flex-none bg-slate-900 p-4 text-white'>
        <div className="flex flex-col mb-6">
          <span className="text-sm font-semibold mb-2 uppercase text-gray-400">Post types</span>

          <ul>
            {postTypes.map(postType => (
              <li className="mb-1" key={postType.id}>
                <Link to={`/admin/post-types/${postType.id}`}>
                  {postType.plural}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className='w-full'>
        <Outlet />
      </div>
    </div>
  )
}
