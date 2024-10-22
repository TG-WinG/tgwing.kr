type TProject = {
  id: number
  title: string
  description: string
  start: string
  end: string
  thumbnail: string
  devStatus: string
  devType: string
  participants: TParticipants[]
  links: TLinks[]
  imageUrls: string[]
}

type TParticipants = {
  part: string
  username: string
  major: string
}

type TLinks = {
  url: string
  description: string
}

export type { TProject }
