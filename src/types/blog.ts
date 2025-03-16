type BlogUsers = {
  username: string
  name: string
  id: string
}

type Comments = {
  comment: string
  id: string
  created: string
  author?: string
}

export type BlogProps = {
  title: string
  author: string
  likes: number
  url: string
  comments: Comments[]
  users: BlogUsers[]
  id: string
}

export type UserProps = {
  token: string
  username: string
  name: string
}

export type BlogInfo = {
  title: string
  author: string
  url: string
}
