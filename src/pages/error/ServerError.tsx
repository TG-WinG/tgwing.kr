import { css } from '@emotion/react'
import main_image from '../../assets/icons/main_image.svg'
import { Link } from 'wouter'
import { Color } from '../../palette'

export const ServerError = () => {
  return (
    <div css={Wrapper}>
      <img src={main_image} alt='404' />
      <div css={TextContainer}>
        <h1>500</h1>
        <p>에러가 발생했습니다.</p>
        <Link to='/'>홈으로 돌아가기</Link>
      </div>
    </div>
  )
}

const Wrapper = css`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const TextContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.5rem;

  a {
    font-weight: 600;
    color: ${Color.Primary};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`
