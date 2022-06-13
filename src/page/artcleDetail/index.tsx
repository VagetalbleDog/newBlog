import { message } from 'antd'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Service from '../../service'

const ArticleDetail: React.FC = () => {
  const param = useParams<any>()
  const getArticleDetail = () => {
    Service.get(`/api/article/${param.ArticleId}`)
      .then((res: any) => {
        if (res.data) {
          message.success('加载成功')
          console.log(res.data)
        }
      })
      .catch((err) => {
        message.error(err)
      })
  }
  useEffect(() => {
    getArticleDetail()
  }, [])
  return <>文章详情</>
}

export default ArticleDetail
