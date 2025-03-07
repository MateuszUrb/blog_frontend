export type BlogProps = {
  title: string
  author: string
  likes: number
  url: string
  users: UserProps[]
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
