import styled from '@emotion/styled'
import { Avatar, Button, Divider, List, message, Skeleton, Tag } from 'antd'
import { ReadOutlined } from '@ant-design/icons'
import { AxiosResponse } from 'axios'
import React, { useEffect, useState } from 'react'
import Service from '../../service'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Article, Author, Category } from '../../interface/articleList'
import { Map } from 'typescript'
import { Link } from 'react-router-dom'

const tagColors: string[] = ['cyan', 'gold', 'blue', 'purple']

const descriptions = new Map()

const ArticleList: React.FC = () => {
  const [artList, setArtList] = useState<Article[]>([])

  // 用于滚动加载的防抖
  const [loading, setLoading] = useState<boolean>(false)
  const [nextPage, setNextPage] = useState<number>(1)

  const loadMoreArticle = (): void => {
    if (loading) {
      return
    }
    if (nextPage === 10086) {
      message.info('已经全部加载完毕啦！您也可以发表文章哦！')
    }
    setLoading(true)
    Service.get('/api/article/', { page: nextPage })
      .then((res: any) => {
        setArtList([...artList, ...res.data.results])
        let requestArr = []
        for (let item of res.data.results) {
          requestArr.push(
            Service.get(`/api/article/${item.id}`).then((res: any) => {
              descriptions.set(item.id, res.data.body.slice(0, 50))
            })
          )
        }
        Promise.all(requestArr)
          .then(() => {
            console.log('加载成功')
          })
          .catch((err) => {
            message.error(err)
          })
        if (res.data.next === null) {
          setNextPage(10086)
        } else {
          setNextPage(nextPage + 1)
        }
        setLoading(false)
      })
      .catch(() => {
        message.error('加载失败,稍后再试！')
        setLoading(false)
      })
  }
  useEffect(() => {
    loadMoreArticle()
  }, [])
  return (
    <Container>
      <InfiniteScroll
        scrollableTarget="container"
        endMessage={<Divider plain>没有更多数据啦!</Divider>}
        loader={
          <>
            <Skeleton className="skeleton" avatar paragraph={{ rows: 2 }} active />
            <Skeleton className="skeleton" avatar paragraph={{ rows: 2 }} active />
            <Skeleton className="skeleton" avatar paragraph={{ rows: 2 }} active />
            <Skeleton className="skeleton" avatar paragraph={{ rows: 2 }} active />
          </>
        }
        hasMore={nextPage < 10086}
        dataLength={artList.length}
        next={loadMoreArticle}
      >
        <List
          itemLayout="vertical"
          dataSource={artList}
          size="large"
          renderItem={(item: Article) => {
            return (
              <List.Item className="listItem" key={item.id}>
                <div>
                  <span className="category">
                    <Button type="primary" shape="round">
                      {item.category.title}
                    </Button>
                  </span>
                  {item.tags.map((tag: string, index: number) => {
                    return (
                      <span className="tag" key={index}>
                        <Tag color={tagColors[index % 4]}>{tag}</Tag>
                      </span>
                    )
                  })}
                </div>
                <Link className="title" to={`/article/${item.id}`}>
                  {item.title}
                  <div className="readIcon">
                    <ReadOutlined style={{ fontSize: 50 }} />
                  </div>
                  <div className="draft">
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          size={60}
                          src={
                            item.avatar
                              ? item.avatar.content
                              : 'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png'
                          }
                        />
                      }
                      description={
                        descriptions.get(item.id)
                          ? descriptions.get(item.id) + '......'
                          : '相关内容正在加载中......'
                      }
                    />
                  </div>
                </Link>
                <div className="otherDetail">
                  <span className="created">
                    发布时间：{new Date(item.created).getFullYear()}/
                    {new Date(item.created).getMonth() + 1}/{new Date(item.created).getDate()}
                  </span>
                  <span className="updated">
                    最后修改于：{new Date(item.updated).getFullYear()}/
                    {new Date(item.updated).getMonth() + 1}/{new Date(item.updated).getDate()}
                  </span>
                  <span className="author">Created By:{item.author.username}</span>
                </div>
              </List.Item>
            )
          }}
        ></List>
      </InfiniteScroll>
    </Container>
  )
}
const Container = styled.div`
  width: 60%;
  .skeleton {
    margin: 40px 0;
  }
  .listItem {
    transform: translate(10%);
    width: 80%;
    margin-top: 20px;
    transition: all 0.5s;
  }
  .listItem:hover {
    transform: translate(10%, -20px);
    box-shadow: rgba(0, 0, 0, 0.2) 10px 10px 10px 10px;
  }
  .title {
    margin-top: 20px;
    margin-left: 20px;
    margin-bottom: 10px;
    display: block;
    font-size: 23px;
  }
  .tag {
    margin-left: 10px;
  }
  .draft {
    margin-left: 10px;
    margin-top: 20px;
    font-size: 14px;
    color: gray;
  }
  .readIcon {
    float: right;
  }
  .category {
    display: inline-block;
    font-size: 18px;
    color: whitesmoke;
  }
  .created {
    font-size: 10px;
    color: violet;
    margin: 0 10px;
  }
  .updated {
    font-size: 10px;
    color: green;
    margin: 0 10px;
  }
  .author {
    font-size: 14px;
  }
`
export default ArticleList
