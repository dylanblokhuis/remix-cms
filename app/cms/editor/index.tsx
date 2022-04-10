import { Form } from "@remix-run/react";
import List from "./list";
import Sidebar from "./sidebar";

export default function Editor() {
  return (
    <Form method="post" className="mx-auto flex h-full">
      <List />
      <Sidebar />
    </Form>
  )
}
