import { DotLoader } from 'react-spinners'
import { LoaderSizeMarginProps } from 'react-spinners/helpers/props'

export const Loading = (props: LoaderSizeMarginProps) => {
  return <DotLoader {...props} />
}
