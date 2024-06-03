import React from 'react'

import { css } from '@emotion/react'
import Background from '../assets/blog_background.png'

const Banner = () => {
  return (
    <div
      css={css`
        width: 100%;
        height: 270px;
        display: flex;
        flex-direction: column;
        justify-content: end;
        padding-bottom: 60px;
        background-image: url(${Background});
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
            font-weight: 700;
          `}
        >
          Tech-Blog
        </p>
        <p
          css={css`
            font-size: 20px;
          `}
        >
          짧은 설명 한 줄 짜리 어쩌고 효과적인 의사소통을 위한 비언어적 신호
        </p>
      </div>
    </div>
  )
}

export default Banner
