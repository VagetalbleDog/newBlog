import { message, Skeleton } from 'antd'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from '@emotion/styled'
import Service from '../../service'
import ReactMarkdown from 'react-markdown'
import MarkNav from 'markdown-navbar'
import 'github-markdown-css'
import { Button, PageHeader, Tabs } from 'antd'
import { Article } from '../../interface'

const Header = (props: any) => {
  const { title, subtitle } = props
  const { TabPane } = Tabs
  return (
    <PageHeader
      className="site-page-header-responsive"
      onBack={() => window.history.back()}
      title={title}
      subTitle={subtitle}
      extra={[
        <Button key="3">修改文章</Button>,
        <Button key="1" type="primary" danger>
          删除文章
        </Button>
      ]}
      footer={
        <Tabs defaultActiveKey="1">
          <TabPane tab="文章详情" key="1" />
          <TabPane tab="评论" key="2" />
        </Tabs>
      }
    ></PageHeader>
  )
}

const ArticleDetail: React.FC = () => {
  const param = useParams<any>()
  const [article, setArticle] = useState<Article>({
    url: '',
    id: 1,
    author: {
      id: 1,
      username: '',
      date_joined: null,
      last_login: null
    },
    comments: [],
    category: {
      id: 1,
      title: '',
      created: null
    },
    tags: [],
    avatar: {
      id: 1,
      url: '',
      content: ''
    },
    title: '',
    created: '',
    body: '',
    updated: ''
  })
  const getArticleDetail = () => {
    Service.get(`/api/article/${param.ArticleId}`)
      .then((res: any) => {
        console.log(res)
        if (res) {
          const {
            id,
            url,
            author,
            comments,
            category,
            tags,
            avatar,
            title,
            created,
            updated,
            body
          } = res
          message.success('加载成功')
          setArticle({
            url,
            id,
            author,
            comments,
            category,
            tags,
            avatar,
            title,
            created,
            body,
            updated
          })
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
    <>
      <Header
        title={article.title ? article.title : '加载中'}
        subtitle={
          article.title
            ? `由 ${article.author.username} 创作于${article.created.toLocaleString()}`
            : '加载中'
        }
      />
      <Container>
        <div className="leftSide" />
        {article.body === '' ? (
          <div className="markdown-body">
            <Skeleton className="skeleton" avatar paragraph={{ rows: 8 }} active />
          </div>
        ) : (
          <ReactMarkdown className="markdown-body">{article.body}</ReactMarkdown>
        )}
        <div className="rightSide">
          {article.body === '' ? (
            <></>
          ) : (
            <MarkNav ordered={false} source={article.body} className="markdown-toc" />
          )}
        </div>
      </Container>
    </>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  hr::after {
    display: none;
  }
  hr::before {
    display: none;
  }
  .markdown-body {
    flex: 1;
  }
  .leftSide {
    width: 10%;
  }
  .rightSide {
    width: 300px;
    .markdown-toc {
      position: sticky;
      top: 20px;
      margin-top: 100px;
      margin-left: 40px;
    }
  }
`
export default ArticleDetail
