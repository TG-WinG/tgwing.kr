import { css } from '@emotion/react'
import { useState } from 'react'
import UserCard from '../components/UserCard'

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
    margin-bottom: 30px;
  `,
}

const joinRequestUsers = [
  {
    studentNumber: '20210001',
    email: 'kim.jiwon@example.com',
    name: '김지원',
    birth: '1999-03-15',
    phoneNumber: '010-1234-5678',
    profilePicture: 'null',
  },
  {
    studentNumber: '20210002',
    email: 'lee.haein@example.com',
    name: '이해인',
    birth: '2000-07-22',
    phoneNumber: '010-2345-6789',
    profilePicture: 'null',
  },
  {
    studentNumber: '20210003',
    email: 'choi.minho@example.com',
    name: '최민호',
    birth: '1998-11-05',
    phoneNumber: '010-3456-7890',
    profilePicture: 'null',
  },
  {
    studentNumber: '20210004',
    email: 'park.sumin@example.com',
    name: '박수민',
    birth: '2001-01-30',
    phoneNumber: '010-4567-8901',
    profilePicture: 'null',
  },
  {
    studentNumber: '20210005',
    email: 'jung.jisoo@example.com',
    name: '정지수',
    birth: '1997-05-20',
    phoneNumber: '010-5678-9012',
    profilePicture: 'null',
  },
]

const allUsers = [
  {
    studentNumber: '20210001',
    email: 'kim.jiwon@example.com',
    name: '김지원',
    birth: '1999-03-15',
    phoneNumber: '010-1234-5678',
    profilePicture: 'null',
  },
  {
    studentNumber: '20210002',
    email: 'lee.haein@example.com',
    name: '이해인',
    birth: '2000-07-22',
    phoneNumber: '010-2345-6789',
    profilePicture: 'null',
  },
  {
    studentNumber: '20210003',
    email: 'choi.minho@example.com',
    name: '최민호',
    birth: '1998-11-05',
    phoneNumber: '010-3456-7890',
    profilePicture: 'null',
  },
  {
    studentNumber: '20210004',
    email: 'park.sumin@example.com',
    name: '박수민1',
    birth: '2001-01-30',
    phoneNumber: '010-4567-8901',
    profilePicture: 'null',
  },
  {
    studentNumber: '20210005',
    email: 'jung.jisoo@example.com',
    name: '정지수',
    birth: '1997-05-20',
    phoneNumber: '010-5678-9012',
    profilePicture: 'null',
  },
]

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'joinRequest' | 'userInfo'>(
    'joinRequest'
  )

  const renderUsers = () => {
    const users = activeTab === 'joinRequest' ? joinRequestUsers : allUsers
    const showActions = activeTab === 'joinRequest'

    return users.map((user) => (
      <UserCard
        key={user.studentNumber}
        user={user}
        showActions={showActions}
      />
    ))
  }

  return (
    <div css={Style.wrapper}>
      <h2 css={Style.header}>TGWING</h2>
      <div css={Style.tabContainer}>
        <div
          css={[Style.tab, activeTab === 'joinRequest' && Style.activeTab]}
          onClick={() => setActiveTab('joinRequest')}
        >
          가입 신청 관리
        </div>
        <div
          css={[Style.tab, activeTab === 'userInfo' && Style.activeTab]}
          onClick={() => setActiveTab('userInfo')}
        >
          유저 정보 조회
        </div>
      </div>
      {activeTab === 'userInfo' && (
        <div css={Style.inputBox}>
          <input type='text' />
        </div>
      )}
      <div css={Style.userList}>{renderUsers()}</div>
    </div>
  )
}

export default Admin
