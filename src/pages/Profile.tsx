import { css } from '@emotion/react'
import React, { useEffect, useRef, useState } from 'react'
import { Color } from '../palette'

import icon_default_profile from '../assets/icon_default_profile.svg'

import useSWR from 'swr'
import { fetcher } from '../api'
import PostLists from '../techblog/PostLists'
import { Pagination } from '../components/Pagination'
import Button from '../components/Button'
import { updateUserInfo } from '../api/auth'
import { TUser } from '../types'
import { uploadImageApi } from '../api/post'

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
  `,

  posts: css``,
  control: css`
    padding-top: 10px;
    margin-bottom: 40px;
    display: flex;
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
    height: 38px;
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
}

const Profile: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [totalPages, setTotalPages] = useState<number>(0)
  const [isEditMode, setIsEditMode] = useState<boolean>(false)
  const [uploadProfileImage, setUploadProfileImage] = useState<File | null>(
    null
  )
  const [profileData, setProfileData] = useState<TUser | null>(null)
  const [preview, setPreview] = useState<string | undefined>(undefined)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleEditMode = async () => {
    if (!isEditMode) {
      setIsEditMode(true)
      return
    }
    try {
      if (profileData) {
        console.log('Updated profile:', profileData, uploadProfileImage)
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
        mutate('profile')
        setPreview(undefined)
      }
      setIsEditMode(false)
    } catch (err) {
      console.log(err)
    }
  }

  const { data, isLoading, error, mutate } = useSWR('profile', fetcher)

  const params = new URLSearchParams({
    page: String(currentPage),
    size: '5',
    sort: 'modDate,desc',
  }).toString()

  const {
    data: myPosts,
    isLoading: postLoading,
    error: postsError,
  } = useSWR(`profile/blog?${params}`, fetcher)

  useEffect(() => {
    if (myPosts) {
      setTotalPages(Math.ceil(myPosts.data.totalElements / 5))
    }
  }, [myPosts])

  useEffect(() => {
    if (data && data.data) {
      setProfileData(data.data)
    }
  }, [data])

  if (error || postsError) return <div>Failed to load profile</div>
  if (isLoading || postLoading || !profileData) return <div>Loading...</div>

  const profiles: TUser = profileData
  console.log(profiles)

  const postList = myPosts.data.content

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
          <input css={Style.input} placeholder='검색' />
          <label css={Style.label}>+ 글쓰기</label>
        </div>
      </div>
      <PostLists postList={postList} />
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  )
}

export default Profile
