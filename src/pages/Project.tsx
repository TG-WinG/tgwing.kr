import { FC } from 'react'
import { css } from '@emotion/react'
import Banner from '../components/Banner'

import Background from '../assets/project_background.png'
import { getData } from '../api'
import useSWR from 'swr'
import { useLocation } from 'wouter'

import { CustomPlusButton } from '../components/CustomPlusButton'

const containerStyle = css`
  display: flex;
  flex-wrap: wrap;
  gap: 22px;
  width: 944px;
  margin: 20px auto 0 auto;
`

const itemStyle = css`
  width: 300px;
  height: 280px;
  border-radius: 4px;
`

const imageStyle = css`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 4px;
`

const titleStyle = css`
  margin-top: 14px;
  margin-left: 10px;
  font-weight: 500;
  font-weight: bold;
`

const descriptionStyle = css`
  margin-top: 6px;
  margin-left: 10px;
  font-size: 14px;
  color: #666;
`

const spanStyle = css`
  font-size: 14px;
  font-weight: 400;
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

export type TProject = {
  title: string
  desc?: string
  devStatus: string
  devType: string
  thumbnail: string
}

export type TProjects = {
  projectList: TProject[]
}

const Project: FC = () => {
  const [, navigate] = useLocation()

  const { data, error } = useSWR('/api/project', getData)

  if (error) return <div>Failed to load profile</div>
  if (!data) return <div>hi</div>

  const projectList: TProject[] = data.data

  console.log(data.data)

  return (
    <>
      <Banner
        background={Background}
        title='Project'
        subTitle='혁신적인 스타트업 아이디오: 성공을 위한 핵심 전략'
      />

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
        <CustomPlusButton
          onClick={() => navigate('/newproject')}
          text='새 프로젝트'
        />
      </div>

      <div css={containerStyle}>
        {projectList &&
          projectList.map((item: TProject, idx: number) => (
            <div key={idx} css={itemStyle}>
              <img src={item.thumbnail} css={imageStyle} />
              <div css={titleStyle}>
                {item.title}
                {item.devType && (
                  <span css={spanStyle}>{item.devType.toUpperCase()}</span>
                )}
              </div>
              <div css={descriptionStyle}>{item.desc}</div>
            </div>
          ))}
      </div>
    </>
  )
}

export default Project
