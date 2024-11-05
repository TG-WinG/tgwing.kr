import { css } from '@emotion/react'
import { TUser } from '../types'

type UserCardProps = {
  user: TUser
  showActions?: boolean
}

const UserCard = ({ user, showActions = false }: UserCardProps) => (
  <div css={Style.userItem}>
    <div css={Style.userInfo}>
      <span css={Style.userName}>{user.name}</span>
      <span css={Style.userDetails}>학번: {user.studentNumber}</span>
      <span css={Style.userDetails}>이메일: {user.email}</span>
      <span css={Style.userDetails}>생년월일: {user.birth}</span>
      <span css={Style.userDetails}>전화번호: {user.phoneNumber}</span>
    </div>
    {showActions && (
      <div css={Style.actionButtons}>
        <button css={[Style.button, Style.acceptButton]}>수락</button>
        <button css={[Style.button, Style.rejectButton]}>거절</button>
      </div>
    )}
  </div>
)

const Style = {
  userItem: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
  `,
  userInfo: css`
    display: flex;
    flex-direction: column;
  `,
  userName: css`
    font-size: 18px;
    font-weight: bold;
  `,
  userDetails: css`
    font-size: 14px;
    color: #666;
  `,
  actionButtons: css`
    display: flex;
    gap: 10px;
  `,
  button: css`
    padding: 8px 12px;
    font-size: 14px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: 0.15s ease-in-out;
  `,
  acceptButton: css`
    background-color: #4caf50;
    color: white;

    :hover {
      background-color: #72c075;
    }

    :active {
      background-color: #3e9141;
    }
  `,
  rejectButton: css`
    background-color: #f44336;
    color: white;

    :hover {
      background-color: #f6766c;
    }

    :active {
      background-color: #d0362b;
    }
  `,
}

export default UserCard
