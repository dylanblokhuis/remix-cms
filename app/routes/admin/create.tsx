import { LoaderFunction } from "@remix-run/node"
import { useMatches } from "@remix-run/react";

export const loader: LoaderFunction = () => {
  // @ts-expect-error
  const components = global.cms;

  return true;
}

export default function create() {
  return (
    <div>create</div>
  )
}
