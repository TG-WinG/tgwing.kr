import { css } from '@emotion/react'
import { Header } from '../common/Header'
import main_image from '../assets/icons/main_image.svg'
import history_background from '../assets/images/history_background.png'
import main_intro_members from '../assets/images/main_intro_members1.png'
import main_intro_members2 from '../assets/images/main_intro_members2.png'
import main_intro_tgthon from '../assets/images/main_intro_tgthon.jpeg'
import { Color } from '../palette'
import AnimatedNumber from '../components/AnimatedNumber'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import logo from '../assets/images/logo.png'

import icon_instagram from '../assets/icons/icon_instagram.svg'
import icon_github from '../assets/icons/icon_github.svg'
import icon_notion from '../assets/icons/icon_notion.svg'

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

        <div css={IntroSection}>
          <div css={IntroSectionContainer}>
            <span css={IntroSectionTitle}>WHAT WE DO</span>
          </div>

          <div css={IntroSectionContainer}>
            <img
              src={main_intro_members2}
              alt='main_intro_members'
              css={IntroSectionImage}
            />
            <div css={IntroSectionContent}>
              <span css={IntroSectionContentTitle}>개강총회 & 종강총회</span>
              <span css={IntroSectionContentSubTitle}>
                첫 만남부터 마지막까지. 우리의 이야기
              </span>
              <span css={IntroSectionContentDescription}>
                한 학기의 시작과 끝을 동아리 선배, 동기들과 함께하며 소통하는
                동아리
              </span>
            </div>
          </div>

          <div css={IntroSectionContainer}>
            <div css={IntroSectionContent}>
              <span css={IntroSectionContentTitle}>사색의 광장 막걸리</span>
              <span css={IntroSectionContentSubTitle}>
                낭만이 피어나는 사색에서의 만남
              </span>
              <span css={IntroSectionContentDescription}>
                벚꽃이 만개할 때면 경희대학교의 전통, 사막을 진행합니다 <br />
                선후배들이 한 자리에 모여 파전을 굽고 막걸리를 마시며 낭만을
                즐기는 동아리
              </span>
            </div>
            <img
              src={main_intro_members}
              alt='main_intro_members'
              css={IntroSectionImage}
            />
          </div>

          <div css={IntroSectionContainer}>
            <img
              src={main_intro_tgthon}
              alt='main_intro_members'
              css={IntroSectionImage}
            />
            <div css={IntroSectionContent}>
              <span css={IntroSectionContentTitle}>TGTHON</span>
              <span css={IntroSectionContentSubTitle}>
                실력과 열정이 꽃피는 도전의 무대
              </span>
              <span css={IntroSectionContentDescription}>
                동아리 내 해커톤을 진행합니다 <br />
                동기들, 선후배들과 함께 해커톤을 준비하면서 실력 향상 <br />
                현업에 종사하는 선배님들께 심사받으며 각종 조언을 얻을 수 있는
                기회
              </span>
            </div>
          </div>
        </div>

        <div css={Footer}>
          <div css={FooterContainer}>
            <img src={logo} alt='logo' css={FooterLogo} />
            <div css={FooterContent}>
              <span>경기도 용인시 기흥구 덕영대로 1732 (서천동)</span>
              <span>
                <b>T</b> 031-123-4567
              </span>
              <span>
                <b>E</b> tgwing@khu.ac.kr
              </span>
            </div>
            <div css={FooterSocial}>
              <a
                href='https://www.instagram.com/t.g.wing/'
                target='_blank'
                rel='noreferrer'
              >
                <img src={icon_instagram} alt='icon_instagram' />
              </a>
              <a
                href='https://github.com/TG-WinG'
                target='_blank'
                rel='noreferrer'
              >
                <img src={icon_github} alt='icon_github' />
              </a>
              <a href='' target='_blank' rel='noreferrer'>
                <img src={icon_notion} alt='icon_notion' />
              </a>
            </div>
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

const IntroSection = css`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 150px;
  margin-bottom: 150px;
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

const IntroSectionTitle = css`
  margin-top: 150px;
  font-size: 32px;
  line-height: 38.4px;
  font-weight: 900;
  color: ${Color.Gray900};
`

const IntroSectionContainer = css`
  width: 900px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const IntroSectionImage = css`
  width: 410px;
  height: 310px;
  object-fit: cover;
`

const IntroSectionContent = css`
  display: flex;
  flex-direction: column;
`

const IntroSectionContentTitle = css`
  font-size: 24px;
  line-height: 33.75px;
  font-weight: 500;
`

const IntroSectionContentSubTitle = css`
  font-size: 15px;
  line-height: 24px;
  font-weight: 400;
  color: ${Color.Gray500};
`

const IntroSectionContentDescription = css`
  margin-top: 28px;
  font-size: 15px;
  line-height: 24px;
  font-weight: 500;
`

const Footer = css`
  width: 100%;
  padding: 50px 0 40px 0;
  background-color: ${Color.Gray100};
  display: flex;
  justify-content: center;
  align-items: center;
`

const FooterContainer = css`
  width: 900px;
`

const FooterLogo = css`
  width: 159px;
  height: 33px;
`

const FooterContent = css`
  display: flex;
  flex-direction: column;
  margin-top: 46px;
  color: ${Color.Gray600};
  font-weight: 500;
  font-size: 15px;
  line-height: 18px;
  gap: 4px;
`

const FooterSocial = css`
  display: flex;
  gap: 32px;
  margin-top: 40px;

  img {
    aspect-ratio: 1;
    transition: all 0.2s ease;

    :hover {
      filter: brightness(0.95);
      scale: 1.05;
    }
  }
`

export default Home
