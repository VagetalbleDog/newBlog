/* eslint-disable react-hooks/exhaustive-deps */
import { BackTop, Drawer, message, Skeleton } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from '@emotion/styled'
import Service from '../../service'
import { Button, PageHeader, Tabs, Anchor } from 'antd'
import { UnorderedListOutlined } from '@ant-design/icons'
import { Article } from '../../interface'
import 'github-markdown-css'
//找到文章标题
const findTitleLevel = (titleStr: string, articleBody: string): [number, number] => {
  const index = articleBody.indexOf(titleStr)
  let macTitle
  if (index < 7) {
    macTitle = articleBody.slice(0, index + titleStr.length)
  } else {
    macTitle = articleBody.slice(index - 7, index + titleStr.length)
  }
  let titleLevel = 0
  for (const char of macTitle) {
    char === '#' && titleLevel++
  }
  const nowIndex = index + titleStr.length
  return [titleLevel, nowIndex]
}
const titleTab = (titleStr: string, titleLevel: number): JSX.Element => {
  let space = ''
  for (let i = 1; i < titleLevel; i++) {
    space += '&nbsp;&nbsp;&nbsp;&nbsp;'
  }
  const htmlStr = `<div style="font-size:${16 - titleLevel}px">${space}${titleStr}</div>`
  return <div dangerouslySetInnerHTML={{ __html: htmlStr }}></div>
}
const Header = (props: any) => {
  const { title, subtitle, footer, setShowTitle, showTitle, showButton } = props
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
        </Button>,
        <Button
          className="title-drawer-button"
          style={showButton ? {} : { display: 'none' }}
          onClick={() => {
            setShowTitle(!showTitle)
          }}
        >
          <UnorderedListOutlined />
          目录
        </Button>
      ]}
      footer={footer}
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
  const [showTitle, setShowTitle] = useState<boolean>(false)
  const [showButton, setShowButton] = useState<boolean>(true)
  const ref = useRef<any>(null)

  const getArticleDetail = () => {
    Service.get(`/api/article/${param.ArticleId}`)
      .then((res: any) => {
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
  let body = article.body
  let toc: string = article.toc_html.slice(23, article.toc_html.length - 14)
  let tocArr: string[] = toc.split('</a>')
  for (let href of tocArr) {
    let afterIndex = href.indexOf('">')
    let preIndex = href.indexOf('href="')

    const macTitle = href.slice(afterIndex + 2)

    const macHref = href.slice(preIndex + 6, afterIndex)
    let titleLevel = 0
    let nowIndex = 0
    if (body !== '') {
      ;[titleLevel, nowIndex] = findTitleLevel(macTitle, body)
    }
    body = body.slice(nowIndex)
    if (preIndex !== -1 && afterIndex !== -1) {
      AnchorLinkArr.push(<Link href={macHref} title={titleTab(macTitle, titleLevel)} />)
    }
  }
  useEffect(() => {
    getArticleDetail()
    if (ref.current) {
      if (ref.current.offsetWidth !== 0 || 0 !== ref.current.offsetHeight) {
        setShowButton(false)
      }
    }
  }, [])

  //防止锚点留下历史记录
  const preventHistory = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
  }
  const { TabPane } = Tabs
  const footer: JSX.Element = (
    <Tabs defaultActiveKey="1">
      <TabPane tab="文章详情" key="1">
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
          <div ref={ref} className="rightSide">
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
          <Drawer
            title="文章目录"
            placement="right"
            onClose={() => {
              setShowTitle(false)
            }}
            visible={showTitle}
          >
            <Anchor
              onClick={(e) => {
                preventHistory(e)
                setShowTitle(false)
              }}
            >
              {AnchorLinkArr.map((link) => {
                return link
              })}
            </Anchor>
          </Drawer>
          <BackTop duration={1000} />
        </Container>
      </TabPane>
      <TabPane tab="评论" key="2">
        评论
      </TabPane>
    </Tabs>
  )
  return (
    <HeaderStyle>
      <Header
        showButton={showButton}
        setShowTitle={setShowTitle}
        showTitle={showTitle}
        title={article.title ? article.title : '加载中'}
        subtitle={
          article.title
            ? `由 ${article.author.username} 创作于 ${article.created
                .toLocaleString()
                .slice(0, 10)} | 最后一次更新于 ${article.updated.toLocaleString().slice(0, 10)}`
            : '加载中'
        }
        footer={footer}
      />
    </HeaderStyle>
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
  img {
    border-radius: 20px;
    box-shadow: 10px 10px 10px 10px rgba(0, 0, 0, 0.3);
  }
  .markdown-body {
    flex: 1;
    @media screen and (min-width: 200px) {
      font-size: 13px;
    }
    @media screen and (min-width: 400px) {
      font-size: 14px;
    }
    @media screen and (min-width: 600px) {
      font-size: 15px;
    }
    @media screen and (min-width: 800px) {
      font-size: 17px;
    }
  }
  .leftSide {
    @media screen and (min-width: 800px) {
      width: 5%;
    }
  }
  .rightSide {
    width: 300px;
    @media screen and (max-width: 800px) {
      display: none;
    }
  }
  .ant-anchor-link-active {
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 5px;
  }
`
const HeaderStyle = styled.div`
  .ant-page-header-heading-sub-title {
    @media screen and (max-width: 1000px) {
      display: none;
    }
  }
`
export default ArticleDetail
