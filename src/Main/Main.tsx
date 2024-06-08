import { FC } from 'react'
import { css } from '@emotion/react'

import { Header } from '../common/Header.tsx'

import { Color } from '../platte.ts'
import mainTypographyBackground from '../assets/main-typography-background.png'
import label from '../assets/label.png'
import detailMockImg from '../assets/main-detail-mock.png'
import facebook from '../assets/facebook.png'
import github from '../assets/github.png'
import instagram from '../assets/instagram.png'
import notion from '../assets/notion.png'
import logo from '../assets/logo.png'

const MainStyle = {
  headPage: css`
    display: flex;
    flex-direction: column;
        
    height: 100vh;
  `,
  header: css`
    position: fixed;
    z-index: 1;
    
    width: 100%;
    background-color: ${Color.White};
  `,
  headParagraph: css`
    flex-grow: 1;
        
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  title: css`
    font-size: 150px;
    font-weight: 900;
            
    background-image: url(${mainTypographyBackground});
    background-position: 40% 40%;
    background-size: 100%;
    background-repeat: no-repeat;
    background-clip: text;
    color: transparent;
  `,
  subTitle: css`
    margin-top: -95px;
    margin-left: 400px;
          
    font-size: 40px;
    font-weight: 400;
    color: ${Color.Main200}CC;
  `,
  mainDescription:css`
    font-size: 16px;
    font-weight: 500;
  `,
  briefPage: css`
    position: relative;
    
    background: linear-gradient(0deg, ${Color.DeepNavy}, ${Color.DeepNavy});
    linear-gradient(143.83deg, rgba(86, 90, 128, 0.098) 7.82%, rgba(0, 0, 0, 0.2) 92.18%);
    
    padding-top: 162px;
    padding-left: 180px;
    
    color: ${Color.Gray100};
  `,
  briefPageTitle: css`
    font-size: 32px;
    font-weight: 900;
    line-height: 1;
  `,
  briefPageSubTitle: css`
    font-size: 30px;
    font-weight: 400;
    line-height: 1;
    
    margin-top: 136px;
    margin-bottom: 15px;
    
    span {
      font-weight: 700;
      color: ${Color.Main200};
    }
  `,
  briefPageContentBox: css`    
    margin-left: 70px;
    
    border-left: 1px solid ${Color.White};
    
    padding-top: 168px;
    padding-bottom: 68px;
  `,
  contentList: css`
    padding-left: 32px;
  `,
  contentRow: css`
    display: flex;
    align-items: center;
    
    margin-bottom: 200px;
  `,
  contentTitle: css`
    font-size: 30px;
    font-weight: 700;
    color: ${Color.Main200};
  `,
  contentDetail: css`
    margin-left: 100px;
    
    font-size: 16px;
    font-weight: 400;
    
    width: 333px;
  `,
  contentHr: css`
    border: 0px;
    border-top: 1px dashed ${Color.Main200};
    
    margin-left: 28px;
    width: 160px;
  `,
  summary: css`
    font-size: 15px;
    font-weight: 400;
    
    margin-left: 20px;
    
    span {
      font-size: 28px;
      font-weight: 600;
      
      margin: 0 1px;
    }
  `,
  label: css`
    position: absolute;
    right: 38px;
    bottom: 40px;
    
    height: 635.76px;
  `,
  detailPage: css`
    padding-top: 200px;
    padding-left: 178px;
    padding-right: 178px;
  `,
  detailPageTitle: css`
    font-size: 32px;
    font-weight: 900;
    color: ${Color.Gray900};
  `,
  detailList: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    
    gap: 260px;
    
    margin-top: 200px;
    
    padding: 0;
  `,
  detailItem: css`
    list-style-type: none;
  
    width: 85%;
    height: 310px;
  `,
  detailImage: css`
    float: inline-start;
    
    height: 100%;
  `,
  detailContentBox: css`
    display: flex;
    flex-direction: column;
    
    padding-top: 30px;
    padding-left: 60px;
    
    h2 {
      font-size: 22.5px;
      font-weight: 500;
    }
    
    h3 {
      font-size: 15px;
      font-weight: 400;
      color: ${Color.Gray500};
    }
    
    p {
      margin-top: 28px;
      
      flex-grow: 1;
    }
  `,
  gallery: css`
    margin-left: 50%;
    transform: translateX(-50%);
    
    margin-top: 400px;
  
    display: grid;
    
    width: 85%;
    
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(2, 1fr);
    
    gap: 20px;
    
    div {
      grid-column: 1/3;
    }
    
    p {
      margin-top: 20px;
    }
    
    img {
      height: auto;
      max-width: 100%;
    }
  `,
  footer: css`
    margin-top: 430px;
  
    background-color: ${Color.Gray100};
    
    padding: 90px 0px 75px 245px;
    
    height: 390px;
    
    p {
      font-size: 15px;
      font-weight: 500;
      color: ${Color.Gray600};
    }
    
    p span {
      font-weight: 700;
    }
  `,
  logo: css`
    height: 34px;
    
    margin-bottom: 46px;
  `,
  externalLinks: css`
    display: flex;
    
    margin-top: 40px;
    gap: 32px;
    
    img {
      width: 44px;
      height: 44px;
    }
  `
}

export const Main: FC = () => {

  return (
    <main>
      <Header css={MainStyle.header} />
      <div css={MainStyle.headPage}>
        <p css={MainStyle.headParagraph}>
          <h1 css={MainStyle.title}>TGWinG</h1>
          <span css={MainStyle.subTitle}>The Greatest Wave-ing</span>
          <h2 css={MainStyle.mainDescription}>Since 1992 Lorem ipsum dolor sit amet consectetur. Vestibulum urna et quis
            netus mauris.</h2>
        </p>
      </div>
      <div css={MainStyle.briefPage}>
        <h1 css={MainStyle.briefPageTitle}>WHO WE ARE</h1>

        <h2 css={MainStyle.briefPageSubTitle}>The <span>Greatest</span> Wave-ing</h2>
        <div css={MainStyle.briefPageContentBox}>
          <ul css={MainStyle.contentList}>
            <li css={MainStyle.contentRow}>
              <h3 css={MainStyle.contentTitle}>최대의</h3>

              <p css={MainStyle.contentDetail}>
                <p>회원 수 @@@명</p>
                <p>컴퓨터공학과 최대규모의 학술 동아리</p>
              </p>

              <hr css={MainStyle.contentHr}/>

              <p css={MainStyle.summary}>회원수<span>123</span>명</p>
            </li>
            <li css={MainStyle.contentRow}>
              <h3 css={MainStyle.contentTitle}>최고의</h3>

              <p css={MainStyle.contentDetail}>
                <p>프로젝트 진행 횟수 누적 @@@회</p>
                <p>최대 크기 이만큼만 해주세요 박스 크기 여기까지입니다</p>
              </p>

              <hr css={MainStyle.contentHr}/>

              <p css={MainStyle.summary}>프로젝트<span>456</span>회</p>
            </li>
            <li css={MainStyle.contentRow}>
              <h3 css={MainStyle.contentTitle}>최선의</h3>

              <p css={MainStyle.contentDetail}>
                <p>스터디 진행횟수 @@@명</p>
                <p>이 글 박스랑 점선 사이 간격 최소 28이용</p>
              </p>

              <hr css={MainStyle.contentHr}/>

              <p css={MainStyle.summary}>스터디<span>78</span>개</p>
            </li>

            <img src={label} css={MainStyle.label}/>
          </ul>
        </div>
      </div>
      <div css={MainStyle.detailPage}>
        <h1 css={MainStyle.detailPageTitle}>WHAT WE DO</h1>

        <ul css={MainStyle.detailList}>
          <li css={MainStyle.detailItem}>
            <img src={detailMockImg} css={MainStyle.detailImage}/>

            <div css={MainStyle.detailContentBox}>
              <h2>Lorem ipsum dolor sit amet consectetur. Tempus ultricies elementum quam sapien </h2>
              <h3>필수정보 한 줄로 어쩌고 날짜랑 머 그런거 있죠 응응</h3>

              <p>
                Lorem ipsum dolor sit amet consectetur. Leo nulla mi felis nunc dolor at quam enim commodo.
                Malesuada phasellus id euismod pellentesque orci duis vel fames.
                Vestibulum ultrices sed consectetur massa. Sed tortor elit. astrdswt tsdat.
              </p>
            </div>
          </li>
          <li css={MainStyle.detailItem}>
            <img src={detailMockImg} css={[MainStyle.detailImage, css`float: right;`]}/>

            <div css={[MainStyle.detailContentBox, css`padding-left: 0; padding-right: 60px;`]}>
              <h2>Lorem ipsum dolor sit amet consectetur. Temp제목 글박스 여기까지입니당 사진이랑 마진 60이요오</h2>
              <h3>필수정보 한 줄로 어쩌고 날짜랑 머 그런거 있죠 응응</h3>

              <p>
                Lorem ipsum dolor sit amet consectetur. Quam arcu turpis egestas volutpat.
                Nulla amet aliquet ultricies lectus.
                Rhoncus purus nunc fermentum eu ac eu bibendum neque.
                Enim viverra nisl ullamcorper in neque pulvinar.
                Est et ornare nunc lectus tincidunt elementum mauris aliquet eu.
                Mattis interdum id commodo cras volutpat duis velit.
                Pretium neque ultricies enim natoque nunc molestie.
              </p>
            </div>
          </li>
          <li css={MainStyle.detailItem}>
            <img src={detailMockImg} css={MainStyle.detailImage}/>

            <div css={MainStyle.detailContentBox}>
              <h2>제목 한 줄 일때는 이런느낌 글박스 여기까지 입니다</h2>
              <h3>필수정보 한 줄로 어쩌고 날짜랑 머 그런거 있죠 응응</h3>

              <p>
                Lorem ipsum dolor sit amet consectetur.
                Leo nulla mi felis nunc dolor at quam enim commodo.
                Malesuada phasellus id euismod pellentesque orci duis vel fames.
                Vestibulum ultrices sed consectetur massa. Sed tortor elit.
                astrdswt tsdat.
              </p>
            </div>
          </li>
        </ul>
        <div css={MainStyle.gallery}>
          <div>
            <h2>
              Lorem ipsum dolor sit amet consectetur.
            </h2>
            <p>
              Lorem ipsum dolor sit amet consectetur. Leo nulla mi felis nunc dolor at quam enim commodo.
              Malesuada phasellus id euismod pellentesque orci duis vel fames.
              Vestibulum ultrices sed consectetur massa.
            </p>
          </div>

          <img src={detailMockImg}/>
          <img src={detailMockImg}/>
          <img src={detailMockImg}/>
          <img src={detailMockImg}/>
          <img src={detailMockImg}/>
          <img src={detailMockImg}/>
        </div>
      </div>
      <div css={MainStyle.footer}>
        <img src={logo} css={MainStyle.logo} />

        <p>경기도 용인시 기흥구 덕영대로 1732 (서천동)</p>
        <p><span>T</span> 031-123-4567</p>
        <p><span>E</span> tgwing@khu.ac.kr</p>

        <div css={MainStyle.externalLinks}>
          <img src={facebook}/>
          <img src={instagram}/>
          <img src={github}/>
          <img src={notion}/>
        </div>
      </div>
    </main>
  )
}