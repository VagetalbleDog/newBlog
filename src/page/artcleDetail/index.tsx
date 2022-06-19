import { message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from '@emotion/styled'
import Service from '../../service'
import ReactMarkdown from 'react-markdown'
import MarkNav from 'markdown-navbar'
import 'github-markdown-css'

const ArticleDetail: React.FC = () => {
  const param = useParams<any>()
  const [article, setArticle] = useState<string>('')
  const getArticleDetail = () => {
    Service.get(`/api/article/${param.ArticleId}`)
      .then((res: any) => {
        if (res.data) {
          message.success('加载成功')
          setArticle(res.data.body)
        }
      })
      .catch((err) => {
        message.error(err)
      })
  }
  useEffect(() => {
    getArticleDetail()
  }, [])
  return (
    <Container>
      <div className="leftSide"></div>
      <ReactMarkdown className="markdown-body">{article}</ReactMarkdown>
      <div className="rightSide">
        <MarkNav ordered={false} source={article} className="markdown-toc" />
      </div>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  .markdown-body {
    flex: 1;
  }
  .leftSide {
    width: 10%;
  }
  .rightSide {
    width: 300px;
    .markdown-toc {
      margin-top: 100px;
      margin-left: 40px;
    }
  }
`
export default ArticleDetail
