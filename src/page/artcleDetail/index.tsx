import { message, Skeleton } from 'antd'
import React, { Children, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import styled from '@emotion/styled'
import Service from '../../service'
import { Button, PageHeader, Tabs, Anchor } from 'antd'
import { Article } from '../../interface'
import 'github-markdown-css'
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
    updated: '',
    toc_html: '',
    body_html: ''
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
            body,
            toc_html,
            body_html
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
            updated,
            toc_html,
            body_html
          })
        }
      })
      .catch((err) => {
        message.error(err)
      })
  }
  const AnchorLinkArr = []
  const { Link } = Anchor
  let toc: string = article.toc_html.slice(23, article.toc_html.length - 14)
  let tocArr: string[] = toc.split('</a>')
  for (let href of tocArr) {
    let afterIndex = href.indexOf('">')
    let preIndex = href.indexOf('href="')
    console.log(href.slice(afterIndex + 2))
    if (preIndex !== -1 && afterIndex !== -1) {
      AnchorLinkArr.push(
        <Link href={href.slice(preIndex + 6, afterIndex)} title={href.slice(afterIndex + 2)} />
      )
    }
  }
  useEffect(() => {
    getArticleDetail()
  }, [])
  //防止锚点留下历史记录
  const preventHistory = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
  }
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
          <div
            className="markdown-body"
            dangerouslySetInnerHTML={{ __html: article.body_html }}
          ></div>
        )}
        <div className="rightSide">
          {article.body === '' ? (
            <></>
          ) : (
            <Anchor onClick={preventHistory}>
              {AnchorLinkArr.map((link) => {
                return link
              })}
            </Anchor>
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
      margin-top: 100px;
      margin-left: 40px;
    }
  }
`
export default ArticleDetail
