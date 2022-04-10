import { LoaderFunction } from "@remix-run/node"
import { useMatches } from "@remix-run/react";

export const loader: LoaderFunction = () => {
  const components = global.cms;

  console.log(components);
  return true;
}

export default function create() {
  const matches = useMatches();

  console.log(matches);

  return (
    <div>create</div>
  )
}
