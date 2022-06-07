export interface Author {
  id: number,
  username: string,
  last_login: null | string | Date,
  date_joined: null | string | Date
}

export interface Category {
  id: number,
  title: string,
  created: null | string | Date
}

export interface Avatar {
  id: number,
  url: string,
  content: string,
}

export interface Article {
  url: string,
  id: number,
  author: Author,
  category: Category,
  tags: string[],
  avatar: Avatar | null,
  title: string,
  created: null | string | Date,
  updated: null | string | Date
}