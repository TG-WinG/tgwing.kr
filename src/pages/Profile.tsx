import { css } from '@emotion/react'
import React from 'react'
import { Color } from '../platte'

import Profiles from '../assets/blog_background.png'

const Style = {
  wrapper: css`
    width: 944px;
    margin: 0 auto;
    padding-top: 60px;
  `,

  title: css`
    font-size: 32px;
    font-weight: 600;
    margin-bottom: 60px;
  `,

  subTitle: css`
    font-size: 24px;
    font-weight: 500;
    color: ${Color.Gray700};
    margin-bottom: 30px;
  `,

  profile: css`
    display: flex;
    position: relative;
    padding: 60px 140px;
    border: 1px solid ${Color.Gray200};
    border-radius: 8px;
    margin-bottom: 60px;

    img {
      border-radius: 9999px;
      width: 200px;
      height: 200px;
      object-fit: cover;
      margin-right: 85px;
    }
  `,

  name: css`
    font-size: 32px;
    font-weight: 500;
    color: ${Color.Gray900};
    margin-bottom: 30px;
  `,

  info: css`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: 500;

    p {
      width: 90px;
      font-size: 16px;
      color: ${Color.Gray500};
    }

    :nth-of-type(4) {
      margin-bottom: 0;
    }
  `,

  button: css`
    background: 0;
    border: 0;
    font-size: 18px;
    font-weight: 500;
    color: ${Color.PrimaryBorder};
    position: absolute;
    top: 30px;
    right: 30px;
  `,

  posts: css``,
  control: css`
    padding-top: 10px;
    margin-bottom: 40px;
    display: flex;
  `,

  label: css`
    width: 85px;
    height: 38px;
    display: flex;
    justify-content: center;
    border: 1px solid ${Color.Primary};
    color: ${Color.Primary};
    align-items: center;
    border-radius: 32px;
  `,

  input: css`
    width: 340px;
    height: 38px;
    background-color: #fff;
    display: flex;
    align-items: center;
    border-radius: 32px;
    border: 1px solid ${Color.Primary};
    padding: 10px 15px;
    margin-right: 20px;
  `,
}

const Profile: React.FC = () => {
  return (
    <div css={Style.wrapper}>
      <div css={Style.title}>프로필</div>
      <div css={Style.subTitle}>내 정보</div>

      <div css={Style.profile}>
        <img src={Profiles} />
        <div>
          <p css={Style.name}>이수민</p>
          <div css={Style.info}>
            <p>학번</p> 2023104559
          </div>
          <div css={Style.info}>
            <p>이메일</p> tgwing@khu.ac.kr
          </div>
          <div css={Style.info}>
            <p>생년월일</p> 2000-03-16
          </div>
          <div css={Style.info}>
            <p>전화번호</p> 010-5321-1111
          </div>
        </div>
        <button css={Style.button}>수정</button>
      </div>

      <div css={Style.posts}>
        <p css={Style.subTitle}>내 포스트</p>
        <div css={Style.control}>
          <input css={Style.input} placeholder='검색' />
          <label css={Style.label}>+ 글쓰기</label>
        </div>
      </div>
    </div>
  )
}

export default Profile
