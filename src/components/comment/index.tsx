import React from 'react'
import useSWR from 'swr'

const Comment: React.FC = () => {
  const { data, error } = useSWR('/api/user', fetch)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  return <div>hello</div>
}

export default Comment
