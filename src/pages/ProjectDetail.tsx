import { css } from '@emotion/react'
import React from 'react'
import { Color } from '../palette'

import Preview from '../assets/blog_background.png'

const Style = {
  wrapper: css`
    padding-top: 80px;
    width: 944px;
    margin: 0 auto;
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
    display: flex;
    gap: 28px;
    margin-bottom: 40px;
  `,

  summary: css`
    display: flex;
    flex-direction: column;
    padding: 30px;
    border: 1px solid ${Color.Gray200};
    border-radius: 10px;
    gap: 20px;

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

  roleBox: css`
    display: flex;
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

  image: css`
    max-width: 559px;
    height: 361px;

    img {
      width: 100%;
      height: 100%;
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
    }
  `,
}

const ProjectDetail: React.FC = () => {
  return (
    <div css={Style.wrapper}>
      <div css={Style.title}>TG Project No.1 제목 영역</div>
      <div css={Style.subTitle}>
        프로젝트 한줄설명 짧게 이전페이지 컴포넌트에서 보이는 내용 그대로
        넣어줘용
      </div>
      <div css={Style.flex}>
        <div css={Style.summary}>
          <p>프로젝트 요약</p>
          <div>
            <p>프로젝트 기간</p>
            <span>2000.00.00 ~ 2000.00.00</span>
          </div>
          <div>
            <p>프로젝트 형태</p>
            <span>APP</span>
          </div>
          <div>
            <p>프로젝트 상태</p>
            <span>배포완료</span>
          </div>
          <div>
            <p>링크</p>
            <span>Github Notion</span>
          </div>
          <div>
            <p>참여자</p>
            <div>
              <div css={Style.roleBox}>
                <p>PM</p>
                <div css={Style.roleName}>
                  <div>이하윤</div>
                  <div>이하윤</div>
                  <div>이하윤</div>
                </div>
              </div>
              <div css={Style.roleBox}>
                <p>Front-end</p>
                <div css={Style.roleName}>
                  <div>이하윤</div>
                  <div>이하윤</div>
                  <div>이하윤</div>
                </div>
              </div>
              <div css={Style.roleBox}>
                <p>Back-end</p>
                <div css={Style.roleName}>
                  <div>이하윤</div>
                  <div>이하윤</div>
                  <div>이하윤</div>
                  {/* <div>이하윤</div> */}
                </div>
              </div>
              <div css={Style.roleBox}>
                <p>Designer</p>
                <div css={Style.roleName}>
                  <div>이하윤</div>
                  <div>이하윤</div>
                  <div>이하윤</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div css={Style.image}>
          <img src={Preview} />
        </div>
      </div>

      <div css={Style.textBox}>
        <p>프로젝트 설명</p>
        <div>
          자기 개발은 목표를 설정하고 달성하기 위한 여정입니다. 이 블로그
          포스트에서는 일상 생활에 쉽게 통합할 수 있는 5가지 핵심 습관을
          소개합니다. 첫 번째는 목표 설정과 시간 관리입니다. 이는 개인적 성취와
          전문적 성장을 위한 기초를 마련합니다. 두 번째 습관은 긍정적 사고를
          통한 자기 격려입니다. 이는 도전을 극복하고 성공으로 나아가는 데
          중요합니다. 세 번째는 건강 유지를 위한 일상적인 운동과 균형 잡힌
          식단입니다. 건강한 몸은 능률적인 마음의 기초입니다. 네 번째는 지속적인
          학습과 자기 계발입니다. 새로운 기술과 지식은 경쟁력을 높이고 삶의 질을
          향상시킵니다. 마지막으로 다섯 번째 습관은 일상 속에서의 작은 목표
          달성을 통해 성취감을 느끼는 것입니다. 이러한 습관들은 개인의 성장과
          발전에 필수적이며, 이 글을 통해 자기 계발의 길을 찾는 데 도움을 줄
          것입니다.
        </div>
      </div>

      <div css={Style.buttonBox}>
        <button>목록으로</button>
      </div>
    </div>
  )
}

export default ProjectDetail
