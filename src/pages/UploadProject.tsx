import { css } from '@emotion/react'
import React, { ChangeEvent, useRef, useState } from 'react'
import { Color } from '../palette'
import Button from '../components/Button'
import icon_plus_btn from '../assets/icon_plus_btn.svg'
import { CustomDatePicker } from '../components/CustomDatePicker'
import { Header } from '../common/Header'
import icon_delete_file from '../assets/icon_delete_tag.svg'
import 'swiper/css'
import 'swiper/css/effect-fade'
import { SwiperBullets } from '../components/SwiperBullets'
import { Swiper as SwiperClass } from 'swiper/types'
import { Swiper, SwiperSlide } from 'swiper/react'
import { uploadImageApi } from '../api/post'
import { uploadProjectApi } from '../api/project'
import { useLocation } from 'wouter'

interface Roles {
  PM: string[]
  FRONT: string[]
  BACK: string[]
  DESIGNER: string[]
}

const descriptions = ['Github', 'Notion', 'Homepage', 'PlayStore', 'AppStore']

const NewProject: React.FC = () => {
  const [roles, setRoles] = useState<Roles>({
    PM: [],
    FRONT: [],
    BACK: [],
    DESIGNER: [],
  })
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(
    new Date()
  )
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(
    new Date()
  )
  const [selectedRole, setSelectedRole] = useState<keyof Roles>('PM')
  const [name, setName] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const [files, setFiles] = useState<
    { name: string | null; preview: string | null }[]
  >([{ name: null, preview: null }])
  const [fileObjects, setFileObjects] = useState<(File | null)[]>([null])

  const [description, setDescription] = useState<string>('')
  const [devStatus, setDevStatus] = useState<string>('진행 중')
  const [devType, setDevType] = useState<string>('WEB')
  const [links, setLinks] = useState<string[]>(['', '', '', '', ''])

  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0)

  const swiperRef = useRef<SwiperClass | null>(null)
  const goToSlide = (index: number) => {
    if (swiperRef.current && swiperRef.current) {
      swiperRef.current.slideTo(index) // Move to the specified index
    }
  }

  const [, navigate] = useLocation()

  const fileRef = useRef<(HTMLInputElement | null)[]>([])

  const handleLinkChange = (index: number, value: string) => {
    setLinks((prevLinks) =>
      prevLinks.map((link, idx) => (idx === index ? value : link))
    )
  }

  const handleAdd = () => {
    if (name) {
      setRoles((prevRoles) => ({
        ...prevRoles,
        [selectedRole]: [...prevRoles[selectedRole], name],
      }))
      setName('')
    } else {
      alert('이름을 입력해주세요.')
    }
  }

  const addFileBox = () => {
    if (files.length < 5) {
      setFiles((prevFiles) => [...prevFiles, { name: null, preview: null }])
    }
    console.log(files)
  }

  // 파일이 변경될 때 배열의 특정 인덱스를 업데이트하는 함수
  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      const reader = new FileReader()
      reader.onloadend = () => {
        // 파일의 이름과 미리보기를 업데이트
        setFiles((prevFiles) => {
          const updatedFiles = [...prevFiles]
          updatedFiles[index] = {
            name: selectedFile.name,
            preview: reader.result as string,
          }
          return updatedFiles
        })

        // 실제 File 객체도 업데이트
        setFileObjects((prevFileObjects) => {
          const updatedFileObjects = [...prevFileObjects]
          updatedFileObjects[index] = selectedFile
          return updatedFileObjects
        })
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  // 파일 삭제 핸들러
  const handleDelete = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index))
    setFileObjects((prevFileObjects) =>
      prevFileObjects.filter((_, i) => i !== index)
    )
  }
  const handleRoleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedRole(e.target.value as keyof Roles)
  }

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleSubmit = async () => {
    console.log(roles)
    const participants = Object.entries(roles).flatMap(([role, names]) =>
      names.map((name: string) => ({
        part: role.toUpperCase(),
        username: name,
        major: role,
      }))
    )

    try {
      const validFiles = fileObjects.filter((file) => file !== null) as File[]

      const uploadedUrls = await Promise.all(
        validFiles.map(async (file) => {
          const formdata = new FormData()
          formdata.append('image', file) // 각 파일을 formdata로 추가
          const imgUrl = await uploadImageApi(formdata) // API 호출
          return imgUrl // 반환된 이미지 URL을 배열에 저장
        })
      )

      // 모든 파일의 이미지 URL이 담긴 배열
      console.log(uploadedUrls)

      const data = {
        title,
        description,
        start: selectedStartDate?.toISOString().split('T')[0],
        end: selectedEndDate?.toISOString().split('T')[0],
        imageUrls: uploadedUrls,
        devStatus,
        devType,
        participants,
        links: links
          .filter((url) => url.trim() !== '')
          .map((url, index) => ({
            url,
            description: descriptions[index] || `링크 ${index + 1}`,
          })),
      }

      console.log(data)

      await uploadProjectApi(data)
      navigate('/project')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <Header num={2} />
      <div css={NewProjectStyle.form}>
        <div css={NewProjectStyle.header}>프로젝트 등록</div>

        <div css={NewProjectStyle.inputBox}>
          <span>제목</span>
          <input
            type='text'
            className='input-text'
            placeholder='제목을 입력해주세요'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div css={NewProjectStyle.inputBox}>
          <span>부제목</span>
          <input
            type='text'
            className='input-text'
            placeholder='부제목을 입력해주세요'
          />
        </div>

        <div css={NewProjectStyle.inputBox}>
          <span>기간</span>
          <div css={NewProjectStyle.datePickerInputBox}>
            <CustomDatePicker
              selectedDate={selectedStartDate}
              setSelectedDate={setSelectedStartDate}
            />
            <div className='div' />
            <CustomDatePicker
              selectedDate={selectedEndDate}
              setSelectedDate={setSelectedEndDate}
            />
          </div>
        </div>

        <div css={NewProjectStyle.inputBox}>
          <span>형태</span>
          <input
            type='radio'
            id='webToggle'
            name='devtype'
            value='WEB'
            checked={devType === 'WEB'}
            onChange={() => setDevType('WEB')}
          />
          <label htmlFor='webToggle'>WEB</label>

          <input
            type='radio'
            id='appToggle'
            name='devtype'
            value='APP'
            checked={devType === 'APP'}
            onChange={() => setDevType('APP')}
          />
          <label htmlFor='appToggle'>APP</label>
        </div>

        <div css={NewProjectStyle.inputBox}>
          <span>상태</span>

          <input
            type='radio'
            id='progress'
            name='status'
            value='진행 중'
            checked={devStatus === '진행 중'}
            onChange={() => setDevStatus('진행 중')}
          />
          <label htmlFor='progress'>진행 중</label>

          <input
            type='radio'
            id='develop'
            name='status'
            value='개발 완료'
            checked={devStatus === '개발 완료'}
            onChange={() => setDevStatus('개발 완료')}
          />
          <label htmlFor='develop'>개발 완료</label>

          <input
            type='radio'
            id='deploy'
            name='status'
            value='배포 완료'
            checked={devStatus === '배포 완료'}
            onChange={() => setDevStatus('배포 완료')}
          />
          <label htmlFor='deploy'>배포 완료</label>
        </div>

        <div css={NewProjectStyle.linkBox}>
          <span>링크</span>
          <div css={NewProjectStyle.link}>
            <input
              placeholder='Github 링크를 추가해주세요'
              value={links[0]}
              onChange={(e) => handleLinkChange(0, e.target.value)}
            />
            <input
              placeholder='Notion 링크를 추가해주세요'
              value={links[1]}
              onChange={(e) => handleLinkChange(1, e.target.value)}
            />
            <input
              placeholder='홈페이지 링크를 추가해주세요'
              value={links[2]}
              onChange={(e) => handleLinkChange(2, e.target.value)}
            />
            <input
              placeholder='플레이스토어 링크를 추가해주세요'
              value={links[3]}
              onChange={(e) => handleLinkChange(3, e.target.value)}
            />
            <input
              placeholder='앱스토어 링크를 추가해주세요'
              value={links[4]}
              onChange={(e) => handleLinkChange(4, e.target.value)}
            />
          </div>
        </div>

        <div css={NewProjectStyle.linkBox}>
          <span>참여자</span>
          <div css={NewProjectStyle.roleBox}>
            <select
              name='role'
              id='role'
              value={selectedRole}
              onChange={handleRoleChange}
            >
              <option value='PM'>PM</option>
              <option value='FRONT'>Front-End</option>
              <option value='BACK'>Back-end</option>
              <option value='DESIGNER'>Designer</option>
            </select>
            <input
              type='text'
              id='nameInput'
              value={name}
              onChange={handleNameChange}
              placeholder='이름'
            />
            <button
              type='button'
              onClick={handleAdd}
              css={NewProjectStyle.plusButton}
            >
              <img src={icon_plus_btn} alt='+' />
            </button>
          </div>

          <div css={NewProjectStyle.previewBox}>
            <p>미리보기</p>
            <div css={NewProjectStyle.preview}>
              <div>
                <p css={roles.PM.length === 0 && NewProjectStyle.activeRole}>
                  PM
                </p>
                <div>
                  {roles.PM.map((item, idx) => (
                    <div key={idx}>{item}</div>
                  ))}
                </div>
              </div>
              <div>
                <p css={roles.FRONT.length === 0 && NewProjectStyle.activeRole}>
                  Front-end
                </p>
                <div>
                  {roles.FRONT.map((item, idx) => (
                    <div key={idx}>{item}</div>
                  ))}
                </div>
              </div>
              <div>
                <p css={roles.BACK.length === 0 && NewProjectStyle.activeRole}>
                  Back-end
                </p>
                <div>
                  {roles.BACK.map((item, idx) => (
                    <div key={idx}>{item}</div>
                  ))}
                </div>
              </div>
              <div>
                <p
                  css={
                    roles.DESIGNER.length === 0 && NewProjectStyle.activeRole
                  }
                >
                  Designer
                </p>
                <div>
                  {roles.DESIGNER.map((item, idx) => (
                    <div key={idx}>{item}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div css={NewProjectStyle.linkBox}>
          <span>파일첨부</span>
          <div css={NewProjectStyle.filelist}>
            {files.map((file, index) => (
              <div key={index} css={NewProjectStyle.fileBox}>
                <button
                  css={NewProjectStyle.button}
                  type='button'
                  onClick={() => fileRef.current[index]?.click()}
                >
                  파일첨부
                </button>
                <div
                  css={[
                    NewProjectStyle.filename,
                    file.name && NewProjectStyle.activeFilename,
                  ]}
                >
                  {!file.name ? '파일을 첨부해주세요.' : file.name}
                </div>
                <button onClick={() => handleDelete(index)}>
                  <img
                    css={[
                      NewProjectStyle.deleteIcon,
                      file.name && NewProjectStyle.activeDeleteIcon,
                    ]}
                    src={icon_delete_file}
                    alt='x'
                  />
                </button>
                <input
                  type='file'
                  accept='image/*' // 이미지 파일만 받도록 설정
                  ref={(el) => (fileRef.current[index] = el)}
                  css={css`
                    display: none;
                  `}
                  onChange={(e) => handleFileChange(e, index)}
                />
              </div>
            ))}
            {files.length < 5 && (
              <button onClick={addFileBox} css={NewProjectStyle.addFileButton}>
                <img src={icon_plus_btn} alt='+' /> 다른 파일 추가
              </button>
            )}
          </div>
          <div css={NewProjectStyle.previewBox}>
            <p>미리보기</p>
            <div css={NewProjectStyle.imgBox}>
              <Swiper
                onSwiper={(swiperInstance) =>
                  (swiperRef.current = swiperInstance)
                }
                spaceBetween={50}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                css={NewProjectStyle.swiperContainer}
                onActiveIndexChange={(swiper) => {
                  setActiveSlideIndex(swiper.activeIndex)
                }}
              >
                {files[0].preview &&
                  files.map(
                    (item, idx) =>
                      item.name && (
                        <SwiperSlide key={idx}>
                          <img
                            src={item.preview!}
                            css={css`
                              width: 100%;
                              height: 100%;
                              object-fit: cover;
                            `}
                          />
                        </SwiperSlide>
                      )
                  )}
              </Swiper>
            </div>
            <div
              css={[
                !files[0].name && NewProjectStyle.swiperBulletBox,
                { marginTop: '9px' },
              ]}
            >
              <SwiperBullets
                goToSlide={goToSlide}
                activeSlideIndex={activeSlideIndex}
                slideLength={files.filter((file) => file.name !== null).length}
              />
            </div>
          </div>
        </div>

        <div css={NewProjectStyle.linkBox}>
          <span>설명</span>

          <textarea
            placeholder='내용을 입력해주세요'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div css={NewProjectStyle.buttonBox}>
          <Button
            type='button'
            color={Color.Primary}
            text='등록하기'
            onClick={handleSubmit}
          />
        </div>
      </div>
    </>
  )
}

const NewProjectStyle = {
  form: css`
    width: 944px;
    margin: 92px auto;
    padding: 60px 75px;
    border-radius: 10px;
    border: 1px solid ${Color.Gray200};
    position: relative;
  `,

  header: css`
    font-size: 32px;
    font-weight: 600;
    margin-bottom: 68px;
  `,

  inputBox: css`
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 50px;

    span {
      font-weight: 500;
      width: 80px;
    }

    .input-text {
      margin-left: auto;
      flex: 1;
      border: 0;
      border-bottom: 1px solid ${Color.Gray300};
      padding: 5px 8px;
    }

    input[type='checkbox'],
    input[type='radio'] {
      display: none;
    }

    input[type='checkbox']:checked + label,
    input[type='radio']:checked + label {
      background: ${Color.Primary};
      color: #fff !important;
    }

    label {
      cursor: pointer;
      padding: 1px 8px;
      color: #a1a3ad;
      border-radius: 4px;
      margin-right: 15px;
      :hover {
        color: ${Color.Gray700};
      }
    }
  `,

  datePickerInputBox: css`
    display: flex;
    align-items: center;

    .div {
      margin: 0 21px;
      width: 15px;
      border-top: 1px solid ${Color.Black};
    }
  `,

  datePickerInput: css`
    /* color: #fff; */
    display: flex;
    align-items: center;
    padding: 9px 15px;
    border: 1px solid #5e5d5d;
    border-radius: 4px;
    margin: 0;
    text-align: center;
    font-size: 18px;
    font-weight: 500;
    line-height: 21.6px;
    color: ${Color.Gray400};
    cursor: pointer;
  `,

  linkBox: css`
    width: 100%;
    display: flex;
    margin-bottom: 50px;

    span {
      padding-top: 5px;
      font-weight: 500;
      width: 80px;
    }

    select {
      width: 106px;
      border: 0;
      border-bottom: 1px solid ${Color.Gray300};
      margin-right: 10px;
      padding: 5px 8px;
    }

    select ~ input {
      width: 106px;
      border: 0;
      border-bottom: 1px solid ${Color.Gray300};
      padding: 5px 8px;
    }

    textarea {
      margin-top: 5px;
      width: 100%;
      padding: 10px 16px;
      min-height: 250px;
      resize: vertical;
      border: 1px solid #e1e1e1;
      border-radius: 8px;
    }
  `,
  filelist: css`
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-right: 35px;
  `,
  filename: css`
    white-space: nowrap;
    width: 150px;
    color: ${Color.Gray400};
    overflow: hidden;
    text-overflow: ellipsis;
  `,

  link: css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex: 1;

    input {
      width: 100%;
      margin-bottom: 10px;
      border: 0;
      border-bottom: 1px solid ${Color.Gray300};
      padding: 5px 8px;
    }
  `,

  roleBox: css`
    margin-right: 33px;
  `,

  previewBox: css`
    flex: 1;
    overflow: hidden;

    p {
      margin: 6px 0;
      color: ${Color.Gray700};
    }
  `,

  preview: css`
    border: 1px solid #e1e1e1;
    border-radius: 8px;
    padding: 25px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    font-weight: 500;

    div {
      display: flex;

      div {
        display: inline;
        flex: 1;

        div {
          display: inline-block;
          margin-right: 8px;
        }
      }

      p {
        width: 85px;
        margin: 0 10px 0 0;
      }
    }
  `,

  button: css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 58px;
    height: 26px;
    border: 1px solid ${Color.Primary};
    border-radius: 4px;
    color: ${Color.Primary};
    font-size: 12px;
    margin-right: 12px;
    background: none;
  `,

  plusButton: css`
    margin-left: 10px;
    background-color: ${Color.White};
    border: none;
    cursor: pointer;
  `,

  imgBox: css`
    display: flex;
    width: 100%;
    height: 249px;

    img {
      border-radius: 4px;
    }
  `,

  fileBox: css`
    display: flex;
    align-items: center;
    padding-top: 5px;
    /* flex: 1; */
  `,

  buttonBox: css`
    display: flex;
    position: absolute;
    right: 0;
    bottom: -70px;
  `,
  deleteIcon: css`
    margin-left: 10px;
    width: 14px;
    height: 14px;
    filter: invert(15%) sepia(9%) saturate(118%) hue-rotate(187deg)
      brightness(96%) contrast(85%);
  `,
  addFileButton: css`
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 10px;
    color: ${Color.Primary};

    :hover {
      font-weight: 500;
    }
  `,
  activeFilename: css`
    color: ${Color.Black};
  `,
  activeDeleteIcon: css`
    filter: invert(64%) sepia(72%) saturate(5667%) hue-rotate(213deg)
      brightness(104%) contrast(96%);
  `,
  swiperContainer: css`
    width: 100%;
    height: 100%; // Ensure Swiper takes full height
  `,
  swiperBulletBox: css`
    opacity: 0;
  `,
  activeRole: css`
    color: ${Color.Gray400} !important;
  `,
}

export default NewProject
