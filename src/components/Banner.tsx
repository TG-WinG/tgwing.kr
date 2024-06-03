import React, { FC } from 'react'

import { css } from '@emotion/react'

type TBanner = {
  background: string
  title: string
  subTitle: string
}

const Banner: FC<TBanner> = ({ background, title, subTitle }) => {
  return (
    <div
      css={css`
        width: 100%;
        height: 270px;
        display: flex;
        flex-direction: column;
        justify-content: end;
        padding-bottom: 60px;
        background-image: url(${background});
        background-size: cover;
        background-position: center;
        color: #fff;
      `}
    >
      <div
        css={css`
          width: 945px;
          margin: 0 auto;
        `}
      >
        <p
          css={css`
            font-size: 32px;
            font-weight: 600;
          `}
        >
          {title}
        </p>
        <p
          css={css`
            font-size: 20px;
          `}
        >
          {subTitle}
        </p>
      </div>
    </div>
  )
}

export default Banner
