import { css } from '@emotion/react'
import React, { useEffect, useRef, useState, useLayoutEffect } from 'react'
import { Color } from '../palette'

import icon_default_profile from '../assets/icons/icon_default_profile.svg'

import useSWR from 'swr'
import { fetcher } from '../api'
import PostLists from '../techblog/PostLists'
import { Pagination } from '../components/Pagination'
import Button from '../components/Button'
import { updateUserInfo } from '../api/auth'
import { TProject, TUser } from '../types'
import { uploadImageApi } from '../api/post'
import { Header } from '../common/Header'

import { CustomInput } from '../components/CustomInput'
import { ServerError } from './error/ServerError'
import { NotFound } from './error/NotFound'
import userStore from '../store/User'
import { ProjectCard } from '../components/ProjectCard'

const Style = {
  wrapper: css`
    width: 944px;
    margin: 0 auto;
    padding-top: 60px;
  `,

  title: css`
    font-size: 32px;
    font-weight: 600;
    margin-bottom: 60px;
  `,

  subTitle: css`
    font-size: 24px;
    font-weight: 500;
    color: ${Color.Gray700};
    margin-bottom: 30px;
  `,

  profile: css`
    display: flex;
    position: relative;
    padding: 60px 140px;
    border: 1px solid ${Color.Gray200};
    border-radius: 8px;
    margin-bottom: 60px;

    img {
      position: relative;
      border-radius: 9999px;
      width: 200px;
      height: 200px;
      object-fit: cover;
    }
  `,

  name: css`
    font-size: 32px;
    font-weight: 500;
    color: ${Color.Gray900};
    margin-bottom: 30px;
  `,

  info: css`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: 500;

    p {
      width: 90px;
      font-size: 16px;
      color: ${Color.Gray500};
    }

    :nth-of-type(4) {
      margin-bottom: 0;
    }
  `,

  button: css`
    background: 0;
    border: 0;
    font-size: 18px;
    font-weight: 500;
    color: ${Color.PrimaryBorder};
    position: absolute;
    top: 30px;
    right: 30px;
    transition: all 0.2s ease-in-out;
    :hover {
      color: ${Color.Main700};
      font-weight: 600;
    }
  `,

  posts: css``,
  control: css`
    padding-top: 10px;
    margin-bottom: 40px;
    display: flex;
    gap: 20px;
  `,

  label: css`
    width: 85px;
    height: 38px;
    display: flex;
    justify-content: center;
    border: 1px solid ${Color.Primary};
    color: ${Color.Primary};
    align-items: center;
    border-radius: 32px;
  `,

  input: css`
    width: 340px;
    background-color: #fff;
    display: flex;
    align-items: center;
    border-radius: 32px;
    border: 1px solid ${Color.Primary};
    padding: 10px 15px;
    margin-right: 20px;
  `,
  editButton: css`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: -30px;
  `,
  profileImageBox: css`
    position: relative;
    margin-right: 85px;
  `,
  editInput: css`
    width: 250px;
    padding: 12px 16px;
    font-size: 20px;
    line-height: 24px;
    font-weight: 500;
    border: 1px solid ${Color.Gray300};
    border-radius: 8px;
  `,
  mb: css`
    margin-bottom: 20px;
  `,
  inputBox: css`
    display: flex;
    width: 340px;
    border: 1px solid ${Color.Primary};
    padding: 10px 15px;
    border-radius: 999px;
    gap: 10px;

    input {
      flex: 1;
      border: 0;
      font-size: 15px;
      font-weight: 400;
      line-height: 18px;

      :focus {
        outline: 0;
      }
    }

    :focus-within .SearchIcon {
      filter: invert(47%) sepia(39%) saturate(1009%) hue-rotate(193deg)
        brightness(101%) contrast(96%);
    }
  `,

  projectList: css`
    display: flex;
    flex-wrap: wrap;
    gap: 22px;
  `,
}

const Profile: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [projectCurrentPage, setProjectCurrentPage] = useState<number>(0)
  const [totalPages, setTotalPages] = useState<number>(0)
  const [projectTotalPages, setProjectTotalPages] = useState<number>(0)
  const [isEditMode, setIsEditMode] = useState<boolean>(false)
  const [uploadProfileImage, setUploadProfileImage] = useState<File | null>(
    null
  )
  const [profileData, setProfileData] = useState<TUser | null>(null)
  const [preview, setPreview] = useState<string | undefined>(undefined)
  const [keyword, setKeyword] = useState<string>('')
  const [projectKeyword, setProjectKeyword] = useState<string>('')
  const [hashtag, setHashtag] = useState<string[]>([])

  const fileInputRef = useRef<HTMLInputElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const projectInputRef = useRef<HTMLInputElement>(null)

  const scrollPositionRef = useRef<number>(0)
  const projectScrollPositionRef = useRef<number>(0)

  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true)

  const { user } = userStore()
  const { data, isLoading, error, mutate } = useSWR('profile', fetcher)

  const params = new URLSearchParams({
    page: String(currentPage),
    size: '3',
    sort: 'modDate,desc',
    keyword,
    hashtag: hashtag.join(','),
  }).toString()

  const {
    data: myPosts,
    isLoading: postLoading,
    error: postsError,
    mutate: postMutate,
  } = useSWR(`profile/blog?${params}`, fetcher)

  const projectParams = new URLSearchParams({
    page: String(projectCurrentPage),
    size: '6',
    sort: 'modDate,desc',
    keyword: projectKeyword,
  }).toString()

  const {
    data: myProjects,
    isLoading: projectLoading,
    // error: projectError,
    mutate: projectMutate,
  } = useSWR(`profile/project?${projectParams}`, fetcher)

  useEffect(() => {
    if (user !== null) {
      setIsLoadingUser(false)
    }
  }, [user])

  const handleEditMode = async () => {
    if (!isEditMode) {
      setIsEditMode(true)
      return
    }
    try {
      if (profileData) {
        if (uploadProfileImage) {
          const formdata = new FormData()
          formdata.append('image', uploadProfileImage)
          const imgUrl = await uploadImageApi(formdata)
          const newData: TUser = {
            studentNumber: profileData.studentNumber,
            email: profileData.email,
            name: profileData.name,
            birth: profileData.birth,
            phoneNumber: profileData.phoneNumber,
            profilePicture: imgUrl,
          }
          await updateUserInfo(newData)
        } else {
          await updateUserInfo(profileData)
        }
        mutate()
        postMutate()
        projectMutate()
        setPreview(undefined)
      }
      setIsEditMode(false)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (myPosts?.data) {
      setTotalPages(Math.ceil(myPosts.data.totalElements / 3))
    }
  }, [myPosts])

  useEffect(() => {
    if (myProjects?.data) {
      setProjectTotalPages(Math.ceil(myProjects.data.totalElements / 6))
    }
  }, [myProjects])

  useEffect(() => {
    if (data && data.data) {
      setProfileData(data.data)
    }
  }, [data])

  const clickHandler = () => {
    if (inputRef.current) {
      scrollPositionRef.current = window.scrollY
      setKeyword(inputRef.current.value)
      inputRef.current.value = ''
    }
  }

  const projectClickHandler = () => {
    if (projectInputRef.current) {
      projectScrollPositionRef.current = window.scrollY
      setProjectKeyword(projectInputRef.current.value)
      projectInputRef.current.value = ''
    }
  }

  const handlePageChange = (newPage: number) => {
    scrollPositionRef.current = window.scrollY
    setCurrentPage(newPage)
  }

  const handleProjectPageChange = (newPage: number) => {
    projectScrollPositionRef.current = window.scrollY
    setProjectCurrentPage(newPage)
  }

  useLayoutEffect(() => {
    if (!postLoading && myPosts?.data) {
      window.scrollTo(0, scrollPositionRef.current)
    }
  }, [postLoading, myPosts, keyword])

  useLayoutEffect(() => {
    if (!projectLoading && myProjects?.data) {
      window.scrollTo(0, projectScrollPositionRef.current)
    }
  }, [projectLoading, myProjects, projectKeyword])

  if (isLoadingUser) return <div></div>
  if (user === null) return <NotFound />
  if (isLoading || !profileData || !myPosts?.data || !myProjects?.data)
    return <div></div>
  if (error || postsError) return <ServerError />

  const profiles: TUser = profileData

  const postList = myPosts.data.content
  const projectList = myProjects.data.content

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && profileData) {
      setUploadProfileImage(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <>
      <Header num={3} />
      <div css={Style.wrapper}>
        <div css={Style.title}>프로필</div>
        <div css={Style.subTitle}>내 정보</div>
        <div css={Style.profile}>
          <div css={Style.profileImageBox}>
            <img
              src={preview || profiles.profilePicture || icon_default_profile}
              alt='프로필'
            />
            {isEditMode && (
              <div css={Style.editButton}>
                <Button
                  width={'150px'}
                  text='이미지 업로드'
                  color={Color.Primary}
                  onClick={handleUploadClick} // 이미지 업로드 버튼 클릭 시 파일 입력 트리거
                />
                <input
                  type='file'
                  accept='image/*'
                  style={{ display: 'none' }}
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
              </div>
            )}
          </div>
          <div>
            {isEditMode && profileData ? (
              <input
                type='text'
                value={profileData.name}
                onChange={(e) =>
                  setProfileData({ ...profileData, name: e.target.value })
                }
                css={[Style.editInput, Style.mb]}
              />
            ) : (
              <p css={Style.name}>{profiles.name}</p>
            )}
            <div css={Style.info}>
              <p>학번</p> {profiles.studentNumber}
            </div>
            <div css={Style.info}>
              <p>이메일</p> {profiles.email}
            </div>
            <div css={Style.info}>
              <p>생년월일</p> {profiles.birth}
            </div>
            {isEditMode && profileData ? (
              <div css={Style.info}>
                <p>전화번호</p>
                <input
                  type='text'
                  value={profileData.phoneNumber}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      phoneNumber: e.target.value,
                    })
                  }
                  css={Style.editInput}
                />
              </div>
            ) : (
              <div css={Style.info}>
                <p>전화번호</p> {profiles.phoneNumber}
              </div>
            )}
          </div>
          <button css={Style.button} onClick={handleEditMode}>
            {isEditMode ? '완료' : '수정'}
          </button>
        </div>

        <div css={Style.posts}>
          <p css={Style.subTitle}>내 포스트</p>
          <div css={Style.control}>
            <CustomInput
              inputRef={inputRef}
              clickHandler={clickHandler}
              placeholder='검색'
              setHashtag={setHashtag}
            />
          </div>
        </div>
        <PostLists postList={postList} />
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={handlePageChange}
        />

        <div css={Style.posts}>
          <p css={Style.subTitle}>내 프로젝트</p>
          <div css={Style.control}>
            <CustomInput
              inputRef={projectInputRef}
              clickHandler={projectClickHandler}
              placeholder='검색'
            />
          </div>
          <div css={Style.projectList}>
            {projectList.map((item: TProject) => (
              <ProjectCard
                id={item.id}
                key={item.id}
                title={item.title}
                thumbnail={item.thumbnail}
                description={item.description}
                devStatus={item.devStatus}
                devType={item.devType}
              />
            ))}
          </div>

          <Pagination
            totalPages={projectTotalPages}
            currentPage={projectCurrentPage}
            setCurrentPage={handleProjectPageChange}
          />
        </div>
      </div>
    </>
  )
}

export default Profile
