import { css } from '@emotion/react'
import { Header } from '../common/Header'
import main_image from '../assets/icons/main_image.svg'
import history_background from '../assets/images/history_background.png'
import main_intro_members from '../assets/images/main_intro_members1.png'
import { Color } from '../palette'
import AnimatedNumber from '../components/AnimatedNumber'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const Home = () => {
  const DIVIDER_HEIGHT = 0
  const outerRef = useRef<HTMLDivElement>(null)
  const [, setCurrentPage] = useState<number>(1)
  const scrollingRef = useRef(false)

  // useEffect(() => {
  //   const wheelHandler = (e: WheelEvent) => {
  //     const { scrollTop } = outerRef.current!
  //     const pageHeight = window.innerHeight
  //     const totalHeight = pageHeight * 2 + DIVIDER_HEIGHT * 2 // 첫 두 섹션의 총 높이

  //     // 세 번째 섹션에서는 일반 스크롤 허용
  //     if (scrollTop >= totalHeight && e.deltaY > 0) {
  //       scrollingRef.current = false
  //       return // 기본 스크롤 동작 허용
  //     }

  //     e.preventDefault()
  //     e.stopPropagation()

  //     if (scrollingRef.current) return
  //     scrollingRef.current = true

  //     const { deltaY } = e
  //     let targetScrollTop
  //     let nextPage

  //     if (deltaY > 0) {
  //       // 스크롤 내릴 때
  //       if (scrollTop < pageHeight) {
  //         targetScrollTop = pageHeight + DIVIDER_HEIGHT
  //         nextPage = 2
  //       } else {
  //         targetScrollTop = pageHeight * 2 + DIVIDER_HEIGHT * 2
  //         nextPage = 3
  //       }
  //     } else {
  //       // 스크롤 올릴 때
  //       if (scrollTop < pageHeight) {
  //         targetScrollTop = 0
  //         nextPage = 1
  //       } else if (scrollTop < pageHeight * 2 + DIVIDER_HEIGHT * 2) {
  //         targetScrollTop = pageHeight + DIVIDER_HEIGHT
  //         nextPage = 2
  //       } else {
  //         // 세 번째 섹션에서 위로 스크롤할 때
  //         targetScrollTop = pageHeight * 2 + DIVIDER_HEIGHT * 2
  //         nextPage = 3
  //       }
  //     }

  //     outerRef.current?.scrollTo({
  //       top: targetScrollTop,
  //       left: 0,
  //       behavior: 'smooth',
  //     })

  //     setCurrentPage(nextPage)

  //     setTimeout(() => {
  //       scrollingRef.current = false
  //     }, 1000)
  //   }

  //   const outerDivRefCurrent = outerRef.current
  //   outerDivRefCurrent?.addEventListener('wheel', wheelHandler, {
  //     passive: false,
  //   })
  //   return () => {
  //     outerDivRefCurrent?.removeEventListener('wheel', wheelHandler)
  //   }
  // }, [])

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
    viewport: { amount: 0.5, once: true },
  }

  return (
    <div ref={outerRef} css={Outer}>
      <Header num={0} />
      <div css={Wrapper}>
        <motion.div css={[Section, FirstSection]} {...animations}>
          <div css={MainContainer}>
            <img
              src={main_image}
              alt='새로고침 부탁드립니다.'
              css={MainImage}
            />
            <span css={MainIntro}>
              {/* Since 1992 Lorem ipsum dolor sit amet consectetur. Vestibulum urna
              et quis netus mauris. */}
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
                      회원 수 173명 <br />
                      컴퓨터공학과 최대규모의 학술 동아리
                    </div>
                    <div css={DashedLine} />
                    <div css={HistoryNumber}>
                      회원수
                      <div css={Size28}>
                        <AnimatedNumber targetNumber={173} duration={2} />
                      </div>
                      명
                    </div>
                  </div>
                  <div css={HistoryContent}>
                    <span css={[Bold, HistoryBold]}>최고의</span>
                    <div css={[LineHeight, HistoryCenter]}>
                      TGWinG Github organization을 통한 협업
                    </div>
                    <div css={DashedLine} />
                    <div css={HistoryNumber}>
                      레포지토리
                      <div css={Size28}>
                        <AnimatedNumber targetNumber={27} duration={2} />
                      </div>
                      개
                    </div>
                  </div>
                  <div css={HistoryContent}>
                    <span css={[Bold, HistoryBold]}>최선의</span>
                    <div css={[LineHeight, HistoryCenter]}>
                      매 학기 참여식, 강의식 스터디 진행
                    </div>
                    <div css={DashedLine} />
                    <div css={HistoryNumber}>
                      연 평균
                      <div css={Size28}>
                        <AnimatedNumber targetNumber={16} duration={2} />
                      </div>
                      회
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div css={ThirdSection}>
          <span css={ThirdSectionTitle}>WHAT WE DO</span>
          <div>
            <img src={main_intro_members} alt='main_intro_members' />
          </div>
        </div>
      </div>
    </div>
  )
}

const Outer = css`
  height: 100vh;
  overflow-y: auto;

  ::-webkit-scrollbar {
    display: none;
  }
`

const Wrapper = css`
  width: 100%;
`

const FirstSection = css`
  margin-top: -60px;
`

const Section = css`
  width: 100%;

  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
`

const ThirdSection = css`
  height: 200vh;
  display: flex;
  flex-direction: column;
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
  /* height: 100%; */
  flex-direction: column;
  z-index: 999;
`

const HistoryTitle = css`
  font-size: 32px;
  line-height: 38.4px;
  font-weight: 900;
  color: ${Color.Gray100};
  margin-bottom: 11vh;
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
  padding-top: 14vh;
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
  gap: 16vh;
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

const ThirdSectionTitle = css`
  font-size: 32px;
  line-height: 38.4px;
  font-weight: 900;
  color: ${Color.Gray900};
`

export default Home
