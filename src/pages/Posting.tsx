import React from 'react'
import Editor from '../posting/Editor'
import { css } from '@emotion/react'

const Posting: React.FC = () => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
      `}
    >
      <Editor />
    </div>
  )
}

export default Posting
