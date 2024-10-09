import { css } from '@emotion/react'
import React, { ChangeEvent, useRef, useState } from 'react'
import { Color } from '../palette'
import Button from '../components/Button'
import icon_plus_btn from '../assets/icon_plus_btn.svg'
import { CustomDatePicker } from '../components/CustomDatePicker'

interface Roles {
  pm: string[]
  frontend: string[]
  backend: string[]
  designer: string[]
}

const NewProject: React.FC = () => {
  const [roles, setRoles] = useState<Roles>({
    pm: [],
    frontend: [],
    backend: [],
    designer: [],
  })
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(
    new Date()
  )
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(
    new Date()
  )
  const [selectedRole, setSelectedRole] = useState<keyof Roles>('pm')
  const [name, setName] = useState<string>('')
  const [title, setTitle] = useState<string>('') // 제목 상태 추가
  const [fileName, setFileName] = useState<string | null>(null)
  const [imgPreview, setImgPreview] = useState<string | null>(null)
  const [description, setDescription] = useState<string>('') // 설명 상태 추가
  const [devStatus, setDevStatus] = useState<string>('진행 중') // 상태 상태 추가
  const [devType, setDevType] = useState<string>('WEB') // 형태 상태 추가
  const [links, setLinks] = useState<string[]>([
    '', // Github 링크
    '', // Notion 링크
    '', // 홈페이지 링크
    '', // 플레이스토어 링크
    '', // 앱스토어 링크
  ])
  const [participants, setParticipants] = useState<
    { part: string; username: string; major: string }[]
  >([]) // 참여자 상태 추가

  const fileRef = useRef<HTMLInputElement>(null)

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

  const clickHandler = () => {
    if (fileRef.current) fileRef.current.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setFileName(file.name)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImgPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRoleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedRole(e.target.value as keyof Roles)
  }

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleSubmit = () => {
    const participants = Object.entries(roles).flatMap(([role, names]) =>
      names.map((name) => ({
        part: role.toUpperCase(), // 역할을 대문자로 변환
        username: name, // 이름
        major: role, // 역할을 major로 사용
      }))
    )

    const data = {
      title, // 제목
      description, // 설명
      start: selectedStartDate?.toISOString().split('T')[0], // 시작일
      end: selectedEndDate?.toISOString().split('T')[0], // 종료일
      thumbnail: fileName || '', // 썸네일
      devStatus, // 개발 상태
      devType, // 개발 형태
      participants, // 참여자 목록
      links: links.map((url, index) => ({
        url,
        description: `링크 ${index + 1}`, // 설명을 자동으로 생성 (원하는 경우 변경 가능)
      })),
    }

    console.log(data) // 콘솔에 데이터 출력
  }

  return (
    <>
      <form css={NewProjectStyle.form}>
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

          <input type='checkbox' id='webToggle' />
          <label htmlFor='webToggle'>WEB</label>

          <input type='checkbox' id='appToggle' />
          <label htmlFor='appToggle'>APP</label>
        </div>

        <div css={NewProjectStyle.inputBox}>
          <span>상태</span>

          <input type='radio' id='progress' name='status' defaultChecked />
          <label htmlFor='progress'>진행 중</label>

          <input type='radio' id='develop' name='status' />
          <label htmlFor='develop'>개발 완료</label>

          <input type='radio' id='deploy' name='status' />
          <label htmlFor='deploy'>배포 완료</label>
        </div>

        <div css={NewProjectStyle.linkBox}>
          <span>링크</span>
          <div css={NewProjectStyle.link}>
            <input
              placeholder='Github 링크를 추가해주세요'
              value={links[0]}
              onChange={(e) => handleLinkChange(0, e.target.value)} // 링크 상태 업데이트
            />
            <input
              placeholder='Notion 링크를 추가해주세요'
              value={links[1]}
              onChange={(e) => handleLinkChange(1, e.target.value)} // 링크 상태 업데이트
            />
            <input
              placeholder='홈페이지 링크를 추가해주세요'
              value={links[2]}
              onChange={(e) => handleLinkChange(2, e.target.value)} // 링크 상태 업데이트
            />
            <input
              placeholder='플레이스토어 링크를 추가해주세요'
              value={links[3]}
              onChange={(e) => handleLinkChange(3, e.target.value)} // 링크 상태 업데이트
            />
            <input
              placeholder='앱스토어 링크를 추가해주세요'
              value={links[4]}
              onChange={(e) => handleLinkChange(4, e.target.value)} // 링크 상태 업데이트
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
              <option value='pm'>PM</option>
              <option value='frontend'>Front-End</option>
              <option value='backend'>Back-end</option>
              <option value='designer'>Designer</option>
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
                <p>PM</p>
                <div>
                  {roles.pm.map((item, idx) => (
                    <div key={idx}>{item}</div>
                  ))}
                </div>
              </div>
              <div>
                <p>Front-end</p>
                <div>
                  {roles.frontend.map((item, idx) => (
                    <div key={idx}>{item}</div>
                  ))}
                </div>
              </div>
              <div>
                <p>Back-end</p>
                <div>
                  {roles.backend.map((item, idx) => (
                    <div key={idx}>{item}</div>
                  ))}
                </div>
              </div>
              <div>
                <p>Designer</p>
                <div>
                  {roles.designer.map((item, idx) => (
                    <div key={idx}>{item}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div css={NewProjectStyle.linkBox}>
          <span>파일첨부</span>
          <div css={NewProjectStyle.fileBox}>
            <button
              css={NewProjectStyle.button}
              onClick={clickHandler}
              type='button'
            >
              파일첨부
            </button>
            <div>{!fileName ? '파일을 첨부해주세요.' : fileName}</div>
            <input
              type='file'
              ref={fileRef}
              css={css`
                display: none;
              `}
              onChange={handleFileChange}
            />
          </div>
          <div css={NewProjectStyle.previewBox}>
            <p>미리보기</p>
            <div css={NewProjectStyle.imgBox}>
              {imgPreview && (
                <img
                  src={imgPreview}
                  css={css`
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                  `}
                />
              )}
            </div>
          </div>
        </div>

        <div css={NewProjectStyle.linkBox}>
          <span>설명</span>

          <textarea
            placeholder='내용을 입력해주세요'
            value={description}
            onChange={(e) => setDescription(e.target.value)} // 설명 상태 업데이트
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
      </form>
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
      padding: 1px 8px;
      color: #a1a3ad;
      border-radius: 4px;
      margin-right: 15px;
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
    margin-right: 20px;
    background: none;

    ~ div {
      width: 150px;
      color: ${Color.Gray400};
      overflow: hidden;
      text-overflow: ellipsis;
      margin-right: 51px;
    }
  `,

  plusButton: css`
    background-color: ${Color.White};
    border: none;
    cursor: pointer;
  `,

  imgBox: css`
    width: 417px;
    height: 249px;
  `,

  fileBox: css`
    display: flex;
    padding-top: 5px;
    /* flex: 1; */
  `,

  buttonBox: css`
    display: flex;
    position: absolute;
    right: 0;
    bottom: -70px;
  `,
}

export default NewProject
