import { lazy, useEffect, useState } from "react";
import { createContext, useContext } from "react";
import { library } from "~/root";
import { Component, DataComponent, LibraryComponent } from "./index";

interface ContextProps {
  components: Component[],
}
export const ComponentsContext = createContext<ContextProps>({
  components: [],
});

// export function useLibrary() {
//   const [loadedLibrary, setLoadedLibrary] = useState<LibraryComponent[]>([]);
//   useEffect(() => {
//     const promises = library.map(item => item());

//     Promise.all(promises).then(modules => {
//       const ready: LibraryComponent[] = modules.map(module => {
//         return {
//           schema: module.schema,
//           component: module.default,
//         }
//       })

//       setLoadedLibrary(ready)
//     });
//   }, [])
// }

export function useComponents(dataComponents?: DataComponent[]): Component[] {
  const context = useContext(ComponentsContext);
  if (!context) throw new Error("useComponents hook used outside CompontentsContext");
  if (!dataComponents) return [];

  return dataComponents.map(dataComponent => {
    const component = library.find(it => it.name === dataComponent.name);
    if (!component) throw new Error("Tried to load in component from data that doesn't exist in the library");
    const shallow = { ...dataComponent }

    // @ts-ignore
    shallow.component = lazy(component.module);
    return shallow as Component;
  })
}
