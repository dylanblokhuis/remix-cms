import { Field } from '~/cms'
import Text from './text'

export interface FieldProps extends Field {
}
export default function Field(props: FieldProps) {
  switch (props.type) {
    case 'text':
      return <Text {...props} />
  }

  return <div>No field found...</div>
}
