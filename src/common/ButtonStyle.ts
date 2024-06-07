import { css } from '@emotion/react'

import { Color } from '../platte.ts'

export const mainButton = css`
  color: ${Color.White};
  
  border: none;
  border-radius: 8px;
  
  background-color: ${Color.Primary};
  
  :hover {
    background-color: ${Color.Main700};
  }
  
  :active {
    background-color: ${Color.Main900};
  }
  
  :disabled {
    background-color: ${Color.Secondary};
  }
`

export const subButton = css`
  color: ${Color.PrimaryBorder};
  background-color: ${Color.White};
  
  border-radius: 8px;
  border: 1px solid ${Color.PrimaryBorder};
  
  :hover {
    color: ${Color.Main700};
    border-color: ${Color.Main700};
    background-color: ${Color.Secondary};
  }
  
  :active {
    color: ${Color.Main800};
    border-color: ${Color.Main800};
    background-color: ${Color.Main300};
  }
  
  :disabled {
    color: ${Color.Gray400};
    border-color: ${Color.Gray400};
  }
`