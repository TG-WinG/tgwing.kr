import { FC } from 'react'
import PostList from './PostList'
import { css } from '@emotion/react'

const DUMMY = [
  {
    title: '제목 어쩌고 저쩌고 블라블라',
    tag: '프로젝트',
    date: '2024.05.01',
    intro: '내용어쩌구',
    profile: 'dd',
    name: '작성자 닉네임',
    heart: 2,
    comment: 4,
  },
  {
    title: '다른 제목',
    tag: '기술',
    date: '2024.04.28',
    intro: '다른 내용',
    profile: 'ee',
    name: '다른 작성자',
    heart: 5,
    comment: 7,
  },
  {
    title: '또 다른 제목',
    tag: '프로젝트',
    date: '2024.05.03',
    intro: '또 다른 내용',
    profile: 'ff',
    name: '또 다른 작성자',
    heart: 10,
    comment: 3,
  },
  {
    title: '이런 제목',
    tag: '기술',
    date: '2024.05.07',
    intro: '이런 내용',
    profile: 'gg',
    name: '이런 작성자',
    heart: 3,
    comment: 2,
  },
  {
    title: '더 다른 제목',
    tag: '프로젝트',
    date: '2024.05.10',
    intro: '더 다른 내용',
    profile: 'hh',
    name: '더 다른 작성자',
    heart: 8,
    comment: 6,
  },
]

const PostLists: FC = () => {
  return (
    <div
      css={css`
        width: 1280px;
        margin: 0 auto;
        margin-top: 150px;
      `}
    >
      {/* <PostList
        title='제목 어쩌고 저쩌고 블라블라'
        tag='프로젝트'
        date='2024.05.01'
        intro='내용어쩌구'
        profile='dd'
        name='작성자 닉네임'
        heart={2}
        comment={4}
      /> */}
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
