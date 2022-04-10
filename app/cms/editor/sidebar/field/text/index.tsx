import React from 'react';
import { useEditorStore } from '~/cms/editor/state'
import { FieldProps } from '..'

export default function Text({ slug, data }: FieldProps) {
  const edit = useEditorStore(store => store.edit);
  const focus = useEditorStore(store => store.focus);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    edit(focus!, slug, event.target.value);
  }

  return (
    <input onChange={handleChange} name={slug} value={data || ""} className="border p-1" type="text" />
  )
}
