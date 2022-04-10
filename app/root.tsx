import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useMatches,
} from "@remix-run/react";
import styles from "./styles/app.css"

import * as banner from "./components/banner"

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export function links() {
  return [{ rel: "stylesheet", href: styles }]
}

export const library = [
  {
    schema: banner.schema,
    component: banner.default
  }
];

// export const loader: LoaderFunction = async () => {
//   const data = await registerComponents(components);
//   return data;
// }

export default function App() {
  // const data = useLoaderData();
  const matches = useMatches();
  const bodyClasses = matches.filter(it => it.handle?.className).map(it => it.handle.className).join(" ");

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className={bodyClasses}>
        {/* <ComponentsContext.Provider
          value={{
            components: components,
            data: data
          }}
        > */}
        <Outlet />
        {/* </ComponentsContext.Provider> */}

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export const LiveReload =
  process.env.NODE_ENV !== "development"
    ? () => null
    : function LiveReload({
      port = Number(process.env.REMIX_DEV_SERVER_WS_PORT || 8002),
    }: {
      port?: number;
    }) {
      let setupLiveReload = ((port: number) => {
        let protocol = location.protocol === "https:" ? "wss:" : "ws:";
        let host = location.hostname;
        let socketPath = `${protocol}//${host}:${port}/socket`;

        let ws = new WebSocket(socketPath);
        ws.onmessage = (message) => {
          let event = JSON.parse(message.data);
          if (event.type === "LOG") {
            console.log(event.message);
          }
          if (event.type === "RELOAD") {
            console.log("💿 Reloading window ...");
            window.location.reload();
          }
        };
        ws.onerror = (error) => {
          console.log("Remix dev asset server web socket error:");
          console.error(error);
        };
      }).toString();

      return (
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `(${setupLiveReload})(${JSON.stringify(port)})`,
          }}
        />
      );
    };