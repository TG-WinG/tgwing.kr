import React from 'react'

import { css } from '@emotion/react'

const Banner = () => {
  return (
    <div
      css={css`
        width: 100%;
        height: 460px;
        background-color: #d9d9d9;
        display: flex;
        flex-direction: column;
        justify-content: end;
        padding-bottom: 60px;
      `}
    >
      <div
        css={css`
          width: 1200px;
          margin: 0 auto;
        `}
      >
        <p
          css={css`
            font-size: 40px;
            font-weight: 700;
          `}
        >
          Tech-Blog
        </p>
        <p
          css={css`
            font-size: 32px;
          `}
        >
          짧은 설명 블라 블라 어쩌고 ㅁㅁㅁㅁㅁㅁㅁ
        </p>
      </div>
    </div>
  )
}

export default Banner
