import styled from '@emotion/styled'
import { Divider, List, message, Skeleton } from 'antd'
import { AxiosResponse } from 'axios'
import React, { useEffect, useState } from 'react'
import Service from '../../service'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Article, Avatar, Author, Category } from '../../interface/articleList'
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
    console.log(1)
    setLoading(true)
    Service.get('/api/article/', { page: nextPage })
      .then((res: any) => {
        setArtList([...artList, ...res.data.results])
        message.success('加载成功')
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
        loader={<Skeleton avatar paragraph={{ rows: 2 }} active />}
        hasMore={nextPage < 10086}
        dataLength={artList.length}
        next={loadMoreArticle}
      >
        <List
          itemLayout="vertical"
          dataSource={artList}
          size="large"
          renderItem={(item: any) => {
            return (
              <List.Item className="listItem">
                <div>
                  <span className="category">{item.category.title}</span>
                  {item.tags.map((tag: string) => {
                    return <span className="tag">{tag}</span>
                  })}
                </div>
                <a className="title" href={item.url}>
                  {item.title}
                </a>
                <div className="otherDetail">
                  <span className="created">发布时间：{new Date(item.created).toDateString()}</span>
                  <span className="updated">
                    最后修改于：{new Date(item.updated).toDateString()}
                  </span>
                  <span className="author">Created By：{item.author.username}</span>
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
  .listItem {
    width: 80%;
    margin-top: 20px;
    transition: all 0.5s;
  }
  .listItem:hover {
    transform: translate(40px);
    box-shadow: rgba(0, 0, 0, 0.2) 10px 10px 10px 10px;
  }
  .title {
    display: block;
    font-size: 23px;
    margin: 40px;
  }
  .tag {
    display: inline-block;
    background-color: aqua;
    border-radius: 15px;
    margin-left: 10px;
    padding: 0 10px;
    font-size: 15px;
    color: goldenrod;
  }
  .category {
    border: 1px solid gold;
    background-color: gold;
    display: inline-block;
    border-radius: 20px;
    padding: 0 5px;
    font-size: 18px;
    color: whitesmoke;
  }
  .created {
    font-size: 16px;
    color: violet;
    margin: 0 10px;
  }
  .updated {
    font-size: 16px;
    color: green;
    margin: 0 10px;
  }
  .author {
    font-size: 20px;
  }
`
export default ArticleList
