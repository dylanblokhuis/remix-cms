import type { MetaFunction } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useMatches,
} from "@remix-run/react";
import { Library } from "./cms";
import styles from "./styles/app.css"

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "CMS",
  viewport: "width=device-width,initial-scale=1",
});

export function links() {
  return [{ rel: "stylesheet", href: styles }]
}

export const library: Library = [
  {
    name: "banner",
    module: () => import("~/components/banner")
  }
];

export default function App() {
  const matches = useMatches();
  const bodyClasses = matches.filter(it => it.handle?.className).map(it => it.handle.className).join(" ");

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className={bodyClasses}>
        <Outlet />

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