import { css } from '@emotion/react'

export const imageButtonBase = (url: string) =>
  css`
    background-image: url(${url});
    background-repeat: no-repeat;
    background-size: contain;
    background-color: transparent;
    border: none;
  `