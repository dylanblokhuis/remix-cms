import { lazy, useEffect, useState } from "react";
import { useMemo } from "react";
import { createContext, useContext } from "react";
import { library } from "~/root";
import { Component, DataComponent, LibraryComponent } from "./index";

interface ContextProps {
  components: Component[],
}
export const ComponentsContext = createContext<ContextProps>({
  components: [],
});

const lazyCache = new Map()
export function useComponents(dataComponents?: DataComponent[]): Component[] {
  const context = useContext(ComponentsContext);
  if (!context) throw new Error("useComponents hook used outside CompontentsContext");
  if (!dataComponents) return [];

  return dataComponents.map((dataComponent) => {
    const component = library.find(it => it.name === dataComponent.name);
    if (!component) throw new Error("Tried to load in component from data that doesn't exist in the library");
    const shallow = { ...dataComponent }

    // prevents suspense from flickering
    if (!lazyCache.has(dataComponent.name)) {
      lazyCache.set(dataComponent.name, lazy(component.module));
    }

    return {
      ...shallow,
      component: lazyCache.get(dataComponent.name)
    } as Component;
  })
}
