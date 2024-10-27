import { css } from '@emotion/react'
import { TProject } from '../types'
import { Color } from '../palette'
import icon_proejct_detail from '../assets/icon_project_detail.svg'
import { useLocation } from 'wouter'

type ProjectCardProps = Omit<
  TProject,
  'participants' | 'links' | 'start' | 'end' | 'imageUrls'
>

export const ProjectCard = ({
  id,
  title,
  thumbnail,
  description,
  devStatus,
  devType,
}: ProjectCardProps) => {
  const [, navigate] = useLocation()
  return (
    <div css={itemStyle} onClick={() => navigate(`project/${id}`)}>
      <img src={thumbnail} css={imageStyle} />
      <div css={titleStyle}>
        <div css={titleStyleText}>{title}</div>
        {devType && <span css={spanStyle}>{devType.toUpperCase()}</span>}
      </div>
      <div css={descriptionStyle}>{description}</div>
      <div css={devStatusStyle} className='hovering'>
        <span>{devStatus}</span>
        <button css={buttonStyle}>
          <img src={icon_proejct_detail} alt='' />
        </button>
      </div>
    </div>
  )
}

const itemStyle = css`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 280px;
  border-radius: 4px;
  cursor: pointer;

  :hover {
    scale: 1.01;
    border: 1px solid ${Color.Primary};

    .hovering {
      opacity: 1;
    }
  }
`

const imageStyle = css`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 3px;
`

const titleStyle = css`
  display: flex;
  align-items: center;
  gap: 4px;
  margin: 14px 10px 0 10px;
  /* margin-left: 10px; */
  font-weight: 500;
  font-weight: bold;
  line-height: 19.2px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const titleStyleText = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const descriptionStyle = css`
  margin: 6px 10px 0 10px;
  font-size: 14px;
  color: #666;
  line-height: 18px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const spanStyle = css`
  font-size: 14px;
  font-weight: 400;
  color: rgba(140, 162, 255, 1);
`

const devStatusStyle = css`
  display: flex;
  align-items: center;
  opacity: 0;
  padding: 0px 5px 0 10px;
  margin-top: auto;
  margin-bottom: 10px;
  span {
    font-size: 12px;
    line-height: 14.4px;
    color: ${Color.Gray800};
  }
`

const buttonStyle = css`
  margin-left: auto;
`
