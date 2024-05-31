import { css } from '@emotion/react'

const NewProject = () => {
  return (
    <div
      css={css`
        width: 1100px;
        margin: 0 auto;
      `}
    >
      <div>
        <input
          css={css`
            width: 724px;
            height: 45px;
            margin-bottom: 30px;
          `}
          placeholder='제목 입력'
        />
      </div>
      <div>
        <input
          css={css`
            width: 986px;
            height: 30px;
          `}
          placeholder='부제목 입력'
        />
      </div>
    </div>
  )
}

export default NewProject
