import React from 'react'
import PostList from './PostList'
import { css } from '@emotion/react'

import profile from '../assets/project_background.png'

const DUMMY = [
  {
    title: '제목 어쩌고 저쩌고 블라블라',
    tag: '프로젝트',
    date: '2024.05.01',
    intro:
      '여행은 새로운 경험과 추억을 선사하지만, 올바른 준비가 필수입니다. 이번 블로그 포스트에서는 여행자가 가져가야할 10가지 필수 아이템을 상세히 소개합니당',
    profile: profile,
    name: 'Sunny',
    heart: 2,
    comment: 4,
  },
  {
    title: '버튼 hover, 블로그 글 hover 추가 필요',
    tag: '기술',
    date: '2024.04.28',
    intro: '다른 내용',
    profile: profile,
    name: 'ㅁㄴㅇㄹ',
    heart: 5,
    comment: 7,
  },
  {
    title: '또 다른 제목',
    tag: '프로젝트',
    date: '2024.05.03',
    intro: '또 다른 내용',
    profile: profile,
    name: 'ㅋㅋ',
    heart: 10,
    comment: 3,
  },
  {
    title: '이런 제목',
    tag: '기술',
    date: '2024.05.07',
    intro: '이런 내용',
    profile: profile,
    name: '이런 ',
    heart: 3,
    comment: 2,
  },
  {
    title: '더 다른 제목',
    tag: '프로젝트',
    date: '2024.05.10',
    intro: '더 다른 내용',
    profile: profile,
    name: '더 다른 ',
    heart: 8,
    comment: 6,
  },
]

const PostLists: React.FC = () => {
  return (
    <div
      css={css`
        width: 945px;
        margin: 0 auto;
        margin-top: 70px;
      `}
    >
      {DUMMY.map((item, idx) => (
        <PostList
          key={idx}
          title={item.title}
          tag={item.tag}
          date={item.date}
          intro={item.intro}
          profile={item.profile}
          name={item.name}
          heart={item.heart}
          comment={item.comment}
        />
      ))}
    </div>
  )
}

export default PostLists
