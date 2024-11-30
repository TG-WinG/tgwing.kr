import { css } from '@emotion/react'
import { useState, useEffect } from 'react'
import UserCard from '../components/UserCard'
import useSWR from 'swr'
import { fetcher } from '../api'
import { TUser } from '../types'
import { Color } from '../palette'
import icon_search from '../assets/icons/icon_search.svg'
import { Pagination } from '../components/Pagination'
import { ServerError } from './error/ServerError'

const Style = {
  wrapper: css`
    width: 100%;
    height: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  header: css`
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
  `,
  tabContainer: css`
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
    cursor: pointer;
  `,
  tab: css`
    padding: 10px 20px;
    font-size: 16px;
    border-bottom: 2px solid transparent;
    &:hover {
      color: #007acc;
    }
  `,
  activeTab: css`
    border-bottom: 2px solid #007acc;
    font-weight: bold;
  `,
  userList: css`
    width: 100%;
    max-width: 600px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  `,
  inputBox: css`
    position: relative;
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    border: 1px solid ${Color.Primary};
    border-radius: 999px;
    padding: 10px 15px;
    min-width: 300px;

    input {
      width: 100%;
      border: none;
      outline: none;
      font-size: 15px;
      font-weight: 400;
      line-height: 18px;
    }

    :focus-within .SearchIcon {
      filter: invert(47%) sepia(39%) saturate(1009%) hue-rotate(193deg)
        brightness(101%) contrast(96%);
    }
  `,
  noData: css`
    text-align: center;
    font-size: 16px;
    color: #888;
  `,
  paginationContainer: css`
    margin-top: 20px;
  `,
}

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'joinRequest' | 'userInfo'>(
    'joinRequest'
  )
  const [keyword, setKeyword] = useState('')
  const [debouncedKeyword, setDebouncedKeyword] = useState('')
  const [page, setPage] = useState(0)
  const [isAuthorized, setIsAuthorized] = useState(true) // 접근 허용 여부를 위한 상태

  const size = 5

  useEffect(() => {
    // sessionStorage에서 isAdmin 값을 가져와 Boolean으로 변환
    const isAdmin = sessionStorage.getItem('isAdmin') === 'true'

    if (!isAdmin) {
      setIsAuthorized(false) // 접근이 허용되지 않음을 설정
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedKeyword(keyword)
    }, 500)

    return () => clearTimeout(timer)
  }, [keyword])

  const { data: studentRequestList, error: studentRequestError } = useSWR(
    `admin?page=${page}&size=${size}`,
    fetcher
  )

  const { data: studentList, error: studentListError } = useSWR(
    activeTab === 'userInfo'
      ? `admin/student?page=${page}&size=${size}${`&keyword=${debouncedKeyword}`}`
      : null,
    fetcher
  )

  const renderUsers = () => {
    const data: TUser[] =
      activeTab === 'joinRequest'
        ? studentRequestList?.data?.content
        : studentList?.data?.content

    if (!data || data.length === 0) {
      return <div css={Style.noData}>데이터가 없습니다.</div>
    }

    const showActions = activeTab === 'joinRequest'

    return data.map((user) => (
      <UserCard
        key={user.studentNumber}
        user={user}
        showActions={showActions}
      />
    ))
  }

  if (studentRequestError || studentListError) return <ServerError />

  if (!isAuthorized) {
    return <div>관리자만 접근 가능한 페이지입니다.</div>
  }

  return (
    <div css={Style.wrapper}>
      <h2 css={Style.header}>TGWING</h2>
      <div css={Style.tabContainer}>
        <div
          css={[Style.tab, activeTab === 'joinRequest' && Style.activeTab]}
          onClick={() => {
            setActiveTab('joinRequest')
            setPage(0)
          }}
        >
          가입 신청 관리
        </div>
        <div
          css={[Style.tab, activeTab === 'userInfo' && Style.activeTab]}
          onClick={() => {
            setActiveTab('userInfo')
            setPage(0)
          }}
        >
          유저 정보 조회
        </div>
      </div>
      {activeTab === 'userInfo' && (
        <div css={Style.inputBox}>
          <input
            type='text'
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder='이름, 학번, 이메일로 검색'
          />
          <img className='SearchIcon' src={icon_search} alt='search' />
        </div>
      )}
      <div css={Style.userList}>{renderUsers()}</div>
      <div css={Style.paginationContainer}>
        <Pagination
          totalPages={
            activeTab === 'userInfo'
              ? studentList?.data?.totalPages
              : studentRequestList?.data?.totalPages
          }
          currentPage={page}
          setCurrentPage={setPage}
        />
      </div>
    </div>
  )
}

export default Admin
