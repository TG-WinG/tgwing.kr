import React from 'react'
import Editor from '../posting/Editor'
import { css } from '@emotion/react'
import TextBox from '../components/TextBox'
import Button from '../components/Button'

const Posting: React.FC = () => {
  return (
    <div
      css={css`
        width: 1296px;
        margin: 0 auto;
      `}
    >
      <TextBox
        margin='80px 0 61px 0'
        fontSize='30px'
        padding='20px 0 0 0'
        height='83px'
        placeholder='제목을 입력해주세요.'
      />
      <Editor />
      <Button color='#DADCE2' text='다음' margin='80px 0 0 auto' />
    </div>
  )
}

export default Posting
