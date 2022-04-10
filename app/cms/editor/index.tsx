import List from "./list";
import Sidebar from "./sidebar";
import { SSRProvider } from '@react-aria/ssr'

export default function Editor() {
  return (
    <SSRProvider>
      <div className="mx-auto flex h-full">
        <List />
        <Sidebar />
      </div>
    </SSRProvider>
  )
}
