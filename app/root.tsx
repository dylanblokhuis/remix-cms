import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

import * as banner from "./components/banner"
import { registerComponents, ComponentsContext } from "~/cms";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

const components = [
  {
    schema: banner.schema,
    component: banner.default
  }
];

export const loader: LoaderFunction = async () => {
  const data = await registerComponents(components);
  return data;
}

export default function App() {
  const data = useLoaderData();

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <ComponentsContext.Provider
          value={{
            components: components,
            data: data
          }}
        >
          <Outlet />
        </ComponentsContext.Provider>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
