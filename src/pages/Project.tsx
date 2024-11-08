import { FC, useEffect, useRef, useState } from 'react'
import { css } from '@emotion/react'
import Banner from '../components/Banner'

import Background from '../assets/project_background.png'
import { fetcher } from '../api'
import useSWR from 'swr'
import { useLocation } from 'wouter'

import { CustomPlusButton } from '../components/CustomPlusButton'
import { Header } from '../common/Header'
import { ProjectCard } from '../components/ProjectCard'
import { TProject } from '../types'
import userStore from '../store/User'
import { Pagination } from '../components/Pagination'

const containerStyle = css`
  display: flex;
  flex-wrap: wrap;
  gap: 22px;
  width: 944px;
  margin: 20px auto 0 auto;
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
  position: relative;
`

const categoryStyle = css`
  font-size: 16px;
  color: #888;
  display: flex;
  padding: 9.5px 13px;
  cursor: pointer;
  text-align: center;
  line-height: 38px;
  position: relative;

  span {
    line-height: 19.2px;
  }

  &:hover {
    color: #007bff;
  }
`

const underlineStyle = css`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 64px;
  height: 2px;
  background-color: #007bff;
  transition: transform 0.3s ease;
`

const paginationContainerStyle = css`
  margin: 20px auto;
`

const categories = ['ALL', 'WEB', 'APP']

const Project: FC = () => {
  const [, navigate] = useLocation()

  const [activeCategory, setActiveCategory] = useState('ALL')
  const [underlinePosition, setUnderlinePosition] = useState(0)
  const [underlineWidth, setUnderlineWidth] = useState(53)
  const categoryRefs = useRef<(HTMLDivElement | null)[]>([])

  const [currentPage, setCurrentPage] = useState<number>(0)
  const [totalPages, setTotalPages] = useState<number>(0)

  useEffect(() => {
    const activeIndex = categories.indexOf(activeCategory)
    if (categoryRefs.current[activeIndex]) {
      const activeElement = categoryRefs.current[activeIndex]
      setUnderlinePosition(activeElement?.offsetLeft || 0)
      setUnderlineWidth(activeElement?.offsetWidth || 0)
    }
  }, [activeCategory])

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category)
  }

  const { user } = userStore()

  const params = new URLSearchParams({
    page: String(currentPage),
    size: '7',
  }).toString()

  const { data, error } = useSWR(`project?${params}`, fetcher)

  useEffect(() => {
    if (data) {
      setTotalPages(Math.ceil(data.data.totalElements / 7))
    }
  }, [data])

  if (error) return <div>Failed to load profile</div>
  if (!data) return <div>Loading...</div>

  const projectList: TProject[] = data.data.content

  // Filter project list based on active category
  const filteredProjectList =
    activeCategory === 'ALL'
      ? projectList
      : projectList.filter((project) => project.devType === activeCategory)

  return (
    <>
      <Header num={2} />
      <Banner
        background={Background}
        title='Project'
        subTitle='혁신적인 스타트업 아이디어: 성공을 위한 핵심 전략'
      />

      <div css={topContainerStyle}>
        <div css={categoriesStyle}>
          {categories.map((category, index) => (
            <div
              key={category}
              css={[
                categoryStyle,
                activeCategory === category &&
                  css`
                    color: #007bff;
                  `,
              ]}
              onClick={() => handleCategoryClick(category)}
              ref={(el) => (categoryRefs.current[index] = el)}
            >
              <span>{category}</span>
            </div>
          ))}
          <span
            css={underlineStyle}
            style={{
              width: `${underlineWidth}px`,
              transform: `translateX(${underlinePosition}px)`,
            }}
          />
        </div>
        <CustomPlusButton
          onClick={() => navigate('/newproject')}
          text='새 프로젝트'
          disabled={Boolean(!user)}
        />
      </div>

      <div css={containerStyle}>
        {filteredProjectList.map((item) => (
          <ProjectCard
            id={item.id}
            key={item.id}
            title={item.title}
            thumbnail={item.thumbnail}
            description={item.description}
            devStatus={item.devStatus}
            devType={item.devType}
          />
        ))}
      </div>
      <div css={paginationContainerStyle}>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </>
  )
}

export default Project
