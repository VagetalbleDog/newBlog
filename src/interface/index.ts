export interface Author {
  id: number
  username: string
  last_login: null | string | Date
  date_joined: null | string | Date
}

export interface Category {
  id: number
  title: string
  created: null | string | Date
}

export interface Avatar {
  id: number
  url: string
  content: string
}

export interface Comment {
  id: number
  url: string
  author: Author
  article: string
  parent_comments: Comment
  body: string
  created: Date | null
}
export interface Article {
  url: string
  id: number
  author: Author
  category: Category
  tags: string[]
  avatar: Avatar | null
  title: string
  created: string | Date
  updated: string | Date
  body: string
  comments: Comment[]
}
