/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

const items = Array(9).fill({
  title: 'TG Project No.1',
  description: '한줄짜리 설명 들어가면됩니다. 첫줄짧아지고 올...',
  tag: 'App',
})

const containerStyle = css`
  display: flex;
  flex-wrap: wrap;
  gap: 22px;
  width: 944px;
  margin: 20px auto 0 auto;
`

const itemStyle = css`
  width: 300px;
  border: 1px solid black;
  border-radius: 4px;
`

const imageStyle = css`
  width: 100%;
  height: auto;
  border-radius: 8px;
`

const titleStyle = css`
  margin-top: 8px;
  font-size: 18px;
  font-weight: bold;
`

const descriptionStyle = css`
  margin-top: 4px;
  font-size: 14px;
  color: #666;
`

const spanStyle = css`
  font-size: 14px;
  color: rgba(140, 162, 255, 1);
`

const topContainerStyle = css`
  display: flex;
  width: 944px;
  margin: 20px auto;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
`

const categoriesStyle = css`
  display: flex;
  gap: 24px;
`

const categoryStyle = css`
  font-size: 16px;
  color: #888;
  cursor: pointer;
  width: 54px;
  height: 38px;
  text-align: center;

  &.active {
    color: #007bff;
    border-bottom: 2px solid #007bff;
  }
`

const buttonStyle = css`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  border: 1px solid rgba(161, 163, 173, 1);
  border-radius: 20px;
  background-color: white;
  font-size: 16px;
  color: rgba(161, 163, 173, 1);
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f0f0f0;
  }
`

const Project = () => {
  return (
    <>
      <div
        css={css`
          width: 100%;
          height: 168px;
          box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1);
          padding-top: 60px;
        `}
      >
        <div
          css={css`
            width: 944px;
            margin: 0 auto;
          `}
        >
          <p
            css={css`
              font-size: 32px;
            `}
          >
            Project
          </p>
          <p
            css={css`
              font-size: 20px;
            `}
          >
            혁신적인 스타트업 아이디어: 성공을 위한 핵심 전략
          </p>
        </div>
      </div>

      <div css={topContainerStyle}>
        <div css={categoriesStyle}>
          <div
            css={[
              categoryStyle,
              css`
                color: #007bff;
                border-bottom: 2px solid #007bff;
              `,
            ]}
          >
            ALL
          </div>
          <div css={categoryStyle}>WEB</div>
          <div css={categoryStyle}>APP</div>
        </div>
        <button css={buttonStyle}>+ 새 프로젝트</button>
      </div>

      <div css={containerStyle}>
        {items.map((item, index) => (
          <div key={index} css={itemStyle}>
            <div css={imageStyle}></div>
            <div css={titleStyle}>
              {item.title} <span css={spanStyle}>{item.tag}</span>
            </div>
            <div css={descriptionStyle}>{item.description}</div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Project
