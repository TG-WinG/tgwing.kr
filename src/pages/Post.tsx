import { css } from '@emotion/react'
import React from 'react'
import { Color } from '../palette'

import Profile from '../assets/blog_background.png'

import Heart from '../assets/heart.png'
import Comment from '../assets/comment.png'

const PostStyle = {
  wrapper: css`
    width: 944px;
    margin: 0 auto;
  `,

  title: css`
    font-size: 32px;
    font-weight: 500;
    margin-bottom: 30px;
  `,

  tagBox: css`
    display: flex;
    margin-bottom: 30px;
  `,

  tag: css`
    color: ${Color.PrimaryBorder};
    margin-right: 30px;
  `,

  info: css`
    display: flex;
    align-items: center;
    color: ${Color.Gray500};
    font-size: 18px;
    margin-bottom: 25px;
  `,

  profile: css`
    width: 24px;
    height: 24px;
    border-radius: 9999px;
    margin-right: 12px;
  `,

  border: css`
    height: 14px;
    border-right: 1px solid ${Color.Gray400};
    margin: 0 20px;
  `,

  buttonBox: css`
    display: flex;
    margin-left: auto;
    font-size: 14px;
    gap: 25px;
  `,

  line: css`
    border-bottom: 1px solid ${Color.Gray200};
  `,

  post: css`
    margin-top: 65px;
    margin-bottom: 100px;
  `,

  heart: css`
    display: flex;
    color: ${Color.Gray400};
    align-items: center;
    margin-bottom: 20px;

    img {
      width: 15px;
      height: 15px;
      margin-right: 8px;
      &:nth-of-type(2) {
        margin-left: 16px;
      }
    }
  `,

  button: css`
    display: flex;
    margin-top: 8px;
    height: 43px;
    align-items: center;
    color: ${Color.Gray500};
    justify-content: space-between;

    img {
      width: 16px;
      height: 16px;
      display: inline-block;
      margin-right: 10px;
    }
  `,

  imgBox: css`
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
  `,

  div: css`
    height: 43px;
    border-right: 1px solid ${Color.Gray400};
  `,
}

const DUMMY_TAGS = [
  '태그',
  '태그 긴거',
  'margin30',
  '태그많이긴거',
  '최대다섯개띄어쓰기없',
]

const Post: React.FC = () => {
  return (
    <div css={PostStyle.wrapper}>
      <div css={PostStyle.title}>
        제목영역, 길어지면 이렇게 무인 택배 드론 서비스, 시험 운영 중으로 곧
        상용화 예정, 인공지능 화상 회의 시스템 도입으로 비즈니스 커뮤니케이션
        혁신
      </div>

      <div css={PostStyle.tagBox}>
        {DUMMY_TAGS.map((item, idx) => (
          <div css={PostStyle.tag} key={idx}>
            #{item}
          </div>
        ))}
      </div>

      <div css={PostStyle.info}>
        <img src={Profile} css={PostStyle.profile} />
        <span>작성자</span>
        <div css={PostStyle.border} />
        <span>2024-05-10</span>
        <div css={PostStyle.buttonBox}>
          <span>수정</span>
          <span>삭제</span>
        </div>
      </div>

      <div css={PostStyle.line} />

      <div css={PostStyle.post}>
        건강과 지속 가능성을 추구하는 이들을 위해, 맛과 영양이 가득한 채식 요리
        레시피를 소개합니다. 이 글에서는 간단하지만 맛있는 채식 요리 10가지를
        선보입니다. 첫 번째 레시피는 아보카도 토스트, 아침 식사로 완벽하며
        영양소가 풍부합니다. 두 번째는 콩과 야채를 사용한 푸짐한 채식 칠리,
        포만감을 주는 동시에 영양소를 공급합니다. 세 번째는 색다른 맛의 채식
        패드타이, 고소한 땅콩 소스로 풍미를 더합니다. 네 번째는 간단하고 건강한
        콥 샐러드, 신선한 야채와 단백질이 가득합니다. 다섯 번째로는 향긋한
        허브와 함께하는 채식 리조또, 크리미한 맛이 일품입니다. 여섯 번째는
        에너지를 주는 채식 스무디 볼, 과일과 견과류의 완벽한 조합입니다. 일곱
        번째는 건강한 채식 버거, 만족감 있는 식사를 제공합니다. 여덟 번째는 채식
        파스타 프리마베라, 신선한 야채와 토마토 소스의 조화가 뛰어납니다. 아홉
        번째는 채식 볶음밥, 풍부한 맛과 영양으로 가득 차 있습니다. 마지막으로,
        식사 후 달콤한 마무리를 위한 채식 초콜릿 케이크, 건강한 재료로 만들어
        죄책감 없는 달콤함을 선사합니다. 이 레시피들은 채식을 선호하는 이들에게
        새로운 요리 아이디어를 제공하며, 채식이 얼마나 다채롭고 맛있을 수 있는지
        보여줍니다. 건강한 라이프스타일을 추구하는 모든 이들에게 이 레시피들이
        영감을 줄 것입니다.
      </div>

      <div css={PostStyle.heart}>
        <img src={Heart} /> 15
        <img src={Comment} /> 3
      </div>

      <div css={PostStyle.line} />

      <div css={PostStyle.button}>
        <div css={PostStyle.imgBox}>
          <img src={Heart} /> 공감하기
        </div>
        <div css={PostStyle.div} />
        <div css={PostStyle.imgBox}>
          <img src={Comment} /> 댓글달기
        </div>
      </div>
    </div>
  )
}

export default Post
