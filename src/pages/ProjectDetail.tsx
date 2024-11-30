import { css } from '@emotion/react'
import React, { useRef, useState } from 'react'
import { Color } from '../palette'

import { useLocation, useParams } from 'wouter'
import useSWR from 'swr'
import { fetcher } from '../api'
import { TProject } from '../types'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/effect-fade'
import { SwiperBullets } from '../components/SwiperBullets'
import { Swiper as SwiperClass } from 'swiper/types' // Swiper 인스턴스 타입
import { Header } from '../common/Header'
import { ServerError } from './error/ServerError'

const Style = {
  wrapper: css`
    padding-top: 80px;
    padding-bottom: 100px;
    width: 944px;
    margin: 0 auto;

    a {
      text-decoration: none;
      color: #000;
    }
  `,

  title: css`
    font-size: 32px;
    font-weight: 700;
  `,

  subTitle: css`
    font-size: 20px;
    font-weight: 500;
    color: ${Color.Gray600};
    margin-bottom: 60px;
  `,
  flex: css`
    display: grid;
    grid-template-columns: max-content 1fr;
    grid-gap: 28px;
    margin-bottom: 40px;
    align-items: start;
  `,

  summary: css`
    display: flex;
    flex-direction: column;
    padding: 30px;
    border: 1px solid ${Color.Gray200};
    border-radius: 10px;
    gap: 20px;
    max-width: 600px;

    > p {
      font-size: 20px;
      color: ${Color.Gray900};
      font-weight: 500;
      margin-bottom: 9px;
    }

    > div {
      display: flex;
      font-size: 13px;

      > p {
        padding-top: 1px;
        color: ${Color.Gray700};
        width: 91px;
      }

      span {
        font-size: 15px;
        font-weight: 500;
      }
    }
  `,

  image: css`
    display: flex;
    flex-direction: column;
    gap: 3px;
    overflow: hidden;

    height: 100%;
  `,

  // swiperContainer 스타일 수정
  swiperContainer: css`
    width: 100%;
    height: 100%;

    .swiper-slide {
      height: 400px;
    }
  `,

  imageSwiper: css`
    width: 100%;
    height: 100%;
    object-fit: cover;
    overflow: hidden;
    border-radius: 4px;
  `,

  roleBox: css`
    display: flex;
    flex-shrink: 0;
    margin-bottom: 8px;

    p {
      padding-top: 1px;
      font-weight: 400;
      width: 75px;
      color: ${Color.Gray900};
    }

    :nth-of-type(4) {
      margin-bottom: 0;
    }
  `,

  roleName: css`
    width: 133px;
    display: flex;
    gap: 0 8px;
    flex-wrap: wrap;

    div {
      font-size: 15px;
      font-weight: 500;
    }
  `,

  textBox: css`
    width: 100%;
    padding: 30px;
    border: 1px solid ${Color.Gray200};
    border-radius: 10px;
    margin-bottom: 30px;

    > p {
      font-size: 20px;
      color: ${Color.Gray900};
      font-weight: 500;
      margin-bottom: 20px;
    }

    div {
      color: ${Color.Gray600};
    }
  `,

  buttonBox: css`
    display: flex;
    justify-content: flex-end;

    button {
      border: 1px solid #4564eb;
      color: #4564eb;
      line-height: 19.2px;
      padding: 14px 26px;
      border-radius: 8px;
      background: none;
      transition: 0.2s ease-in-out;

      :hover {
        color: #fff;
        background-color: ${Color.Primary};
      }

      :active {
        background-color: #2c4bd1;
      }
    }
  `,
  linkBox: css`
    width: 200px;
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    white-space: pre-wrap;

    span {
      border-bottom: 1px solid #000;
    }
  `,
}

const ProjectDetail: React.FC = () => {
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0)

  const swiperRef = useRef<SwiperClass | null>(null)

  const { project_id } = useParams()
  const [, navigate] = useLocation()

  const { data, isLoading, error } = useSWR(`project/${project_id!}`, fetcher)
  if (isLoading) return <div></div>
  if (error) return <ServerError />

  const projectInfo: TProject = data.data

  const goToSlide = (index: number) => {
    if (swiperRef.current && swiperRef.current) {
      swiperRef.current.slideTo(index) // Move to the specified index
    }
  }

  return (
    <>
      <Header num={2} />
      <div css={Style.wrapper}>
        <div css={Style.title}>{projectInfo.title}</div>
        <div css={Style.subTitle}></div>
        <div css={Style.flex}>
          <div css={Style.summary}>
            <p>프로젝트 요약</p>
            <div>
              <p>프로젝트 기간</p>
              <span>
                {projectInfo.start && projectInfo.start.replace(/-/g, '.')} ~{' '}
                {projectInfo.end && projectInfo.end.replace(/-/g, '.')}
              </span>
            </div>
            <div>
              <p>프로젝트 형태</p>
              <span>{projectInfo.devType}</span>
            </div>
            <div>
              <p>프로젝트 상태</p>
              <span>{projectInfo.devStatus}</span>
            </div>
            <div>
              <p>링크</p>
              <div css={Style.linkBox}>
                {projectInfo.links.map((item) => (
                  <a
                    key={`${item.description}-${item.url}`}
                    href={
                      item.url.startsWith('http')
                        ? item.url
                        : `https://${item.url}`
                    }
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <span>{item.description}</span>
                  </a>
                ))}
              </div>
            </div>
            <div>
              <p>참여자</p>
              <div>
                <div css={Style.roleBox}>
                  <p>PM</p>
                  <div css={Style.roleName}>
                    {projectInfo.participants
                      .filter((item) => item.part === 'PM')
                      .map((item) => (
                        <div key={`pm-${item.username}`}>{item.username}</div>
                      ))}
                  </div>
                </div>
                <div css={Style.roleBox}>
                  <p>Front-end</p>
                  <div css={Style.roleName}>
                    {projectInfo.participants
                      .filter((item) => item.part === 'FRONT')
                      .map((item) => (
                        <div key={`front-${item.username}`}>
                          {item.username}
                        </div>
                      ))}
                  </div>
                </div>
                <div css={Style.roleBox}>
                  <p>Back-end</p>
                  <div css={Style.roleName}>
                    {projectInfo.participants
                      .filter((item) => item.part === 'BACK')
                      .map((item) => (
                        <div key={`back-${item.username}`}>{item.username}</div>
                      ))}
                  </div>
                </div>
                <div css={Style.roleBox}>
                  <p>Designer</p>
                  <div css={Style.roleName}>
                    {projectInfo.participants
                      .filter((item) => item.part === 'DESIGNER')
                      .map((item) => (
                        <div key={`designer-${item.username}`}>
                          {item.username}
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div css={Style.image}>
            <Swiper
              onSwiper={(swiperInstance) =>
                (swiperRef.current = swiperInstance)
              } // Swiper 인스턴스 저장
              spaceBetween={50}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              loop={projectInfo.imageUrls.length > 1}
              css={Style.swiperContainer}
              onActiveIndexChange={(swiper) => {
                setActiveSlideIndex(swiper.activeIndex)
              }}
            >
              {projectInfo.imageUrls.map((imageUrl, index) => (
                <SwiperSlide key={index}>
                  <img
                    css={Style.imageSwiper}
                    src={imageUrl}
                    alt={`Project image ${index}`}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <SwiperBullets
              goToSlide={goToSlide}
              activeSlideIndex={activeSlideIndex}
              slideLength={projectInfo.imageUrls.length}
            />
          </div>
        </div>

        <div css={Style.textBox}>
          <p>프로젝트 설명</p>
          <div>{projectInfo.description}</div>
        </div>

        <div css={Style.buttonBox} onClick={() => navigate('/project')}>
          <button>목록으로</button>
        </div>
      </div>
    </>
  )
}

export default ProjectDetail
