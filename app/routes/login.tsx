import { ActionFunction, json, LoaderFunction } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import authService from "~/cms/services/auth.server";
import { commitSession, getSession } from "~/cms/services/session.server";

export const action: ActionFunction = async ({ request }) => {
  await authService.authenticator.authenticate("user-pass", request, {
    successRedirect: "/admin",
    failureRedirect: "/login",
  });
};

type LoaderType = {
  error?: {
    message: string
  }
}
export const loader: LoaderFunction = async ({ request }) => {
  await authService.authenticator.isAuthenticated(request, {
    successRedirect: "/admin",
  });

  const session = await getSession(request.headers.get("cookie"));
  const error = session.get(authService.authenticator.sessionErrorKey);
  // only show error once
  session.unset(authService.authenticator.sessionErrorKey);
  return json<LoaderType>({ error }, {
    headers: {
      "Set-Cookie": await commitSession(session)
    }
  });
};

// First we create our UI with the form doing a POST and the inputs with the
// names we are going to use in the strategy
export default function Screen() {
  const { error } = useLoaderData<LoaderType>();
  return (
    <Form method="post" className="flex flex-col items-center max-w-xs my-5 mx-auto">
      <input className="mb-4 w-full" type="email" name="email" placeholder="E-mail" />
      <input className="mb-4 w-full" type="password" name="password" placeholder="Password" />

      <button className="button w-full" type="submit">
        Login
      </button>

      {error && <span className="text-red-600 font-semibold mt-3">{error.message}</span>}
    </Form>
  );
}