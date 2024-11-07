import { useEffect, useState } from 'react'
import { css } from '@emotion/react'
import { Header } from '../common/Header'
import main_image from '../assets/main_image.svg'
import history_background from '../assets/history_background.png'
import { Color } from '../palette'
import AnimatedNumber from '../components/AnimatedNumber'
import { motion } from 'framer-motion'

const Home = () => {
  const animations = {
    initial: {
      opacity: 0,
      y: 50,
    },
    whileInView: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.6,
      },
    },
    viewport: { amount: 0.5 },
  }

  return (
    <>
      <Header num={0} />
      <div css={Wrapper}>
        <motion.div css={Section} {...animations}>
          <div css={MainContainer}>
            <img
              src={main_image}
              alt='새로고침 부탁드립니다.'
              css={MainImage}
            />
            <span css={MainIntro}>
              Since 1992 Lorem ipsum dolor sit amet consectetur. Vestibulum urna
              et quis netus mauris.
            </span>
          </div>
        </motion.div>

        <div css={Section}>
          <div css={HistorySection}>
            <motion.div css={HistoryContainer} {...animations}>
              <span css={HistoryTitle}>WHO WE ARE</span>

              <div css={HistorySubtitle}>
                The
                <span css={Bold}>Greatest</span>
                Wave-ing
              </div>

              <div css={HistoryContentContainer}>
                <div css={Line} />
                <div css={HistoryContents}>
                  <div css={HistoryContent}>
                    <span css={[Bold, HistoryBold]}>최대의</span>
                    <div css={[LineHeight, HistoryCenter]}>
                      회원 수 1234명 <br />
                      컴퓨터공학과 최대규모의 학술 동아리
                    </div>
                    <div css={DashedLine} />
                    <div css={HistoryNumber}>
                      회원수
                      <div css={Size28}>
                        <AnimatedNumber targetNumber={250} duration={2} />
                      </div>
                      명
                    </div>
                  </div>
                  <div css={HistoryContent}>
                    <span css={[Bold, HistoryBold]}>최고의</span>
                    <div css={[LineHeight, HistoryCenter]}>
                      프로젝트 진행 횟수 누적 1234회 <br />
                      최대 크기 이만큼만 해주세용 글씨 박스 여기까지입니
                    </div>
                    <div css={DashedLine} />
                    <div css={HistoryNumber}>
                      프로젝트
                      <div css={Size28}>
                        <AnimatedNumber targetNumber={155} duration={2} />
                      </div>
                      회
                    </div>
                  </div>
                  <div css={HistoryContent}>
                    <span css={[Bold, HistoryBold]}>최선의</span>
                    <div css={[LineHeight, HistoryCenter]}>
                      스터디 진행횟수 1234회 <br />이 글 박스랑 점선 사이 간격
                      최소 28이용
                    </div>
                    <div css={DashedLine} />
                    <div css={HistoryNumber}>
                      스터디
                      <div css={Size28}>
                        <AnimatedNumber targetNumber={28} duration={2} />
                      </div>
                      개
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div css={Section}>hi</div>
      </div>
    </>
  )
}

const Wrapper = css`
  width: 100%;
`

const Section = css`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const MainContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const MainImage = css`
  /* scale: 1.5; */
`

const MainIntro = css`
  margin-top: -20px;
  font-weight: 500;
  font-size: 16px;
  line-height: 19.2px;
`
const HistorySection = css`
  width: 100%;
  height: 100%;
  background-image: url(${history_background});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative; /* 자식 요소의 절대 위치를 위한 설정 */
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`

const HistoryContainer = css`
  display: flex;
  flex-direction: column;
  z-index: 999;
`

const HistoryTitle = css`
  font-size: 32px;
  line-height: 38.4px;
  font-weight: 900;
  color: ${Color.Gray100};
  margin-bottom: 136px;
`

const HistorySubtitle = css`
  font-size: 30px;
  line-height: 36px;
  color: #fff;
  display: flex;
  gap: 16px;
  margin-bottom: 15px;
`
const Bold = css`
  font-size: 30px;
  line-height: 36px;
  font-weight: 700;
  color: ${Color.Main200};
`

const HistoryBold = css`
  margin-right: 100px;
  flex-shrink: 0;
`

const HistoryContentContainer = css`
  position: relative;
  padding-top: 167px;
  margin-left: 70px;
`

const Line = css`
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 1px;
    height: 949px;
    background: linear-gradient(to bottom, #e5e5e5, rgb(102, 102, 102));
  }
`

const HistoryContents = css`
  display: flex;
  flex-direction: column;
  margin-left: 30px;
  gap: 200px;
`

const HistoryContent = css`
  display: flex;
  align-items: center;
  color: #fff;
`
const LineHeight = css`
  line-height: 19.2px;
`

const HistoryCenter = css`
  width: 333px;
  margin-right: 20px;
`

const DashedLine = css`
  width: 158px;
  border-top: 1px dashed #c7cde8;
`

const HistoryNumber = css`
  min-width: 150px;
  display: flex;
  align-items: center;
  margin-left: 20px;
  font-size: 15px;
  line-height: 18px;
`

const Size28 = css`
  margin: 0 15px;
  text-align: center;
  font-size: 28px;
  font-weight: 600;
  line-height: 24px;
`

export default Home
