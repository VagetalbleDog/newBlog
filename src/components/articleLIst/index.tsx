import styled from '@emotion/styled'
import { Avatar, Button, Divider, List, message, Skeleton, Tag } from 'antd'
import { ReadOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import Service from '../../service'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Article } from '../../interface'
import { Link } from 'react-router-dom'

const tagColors: string[] = ['cyan', 'gold', 'blue', 'purple']

interface Description {
  articleId: number
  content: string
}
const randomAvatar: string[] = [
  'https://s1.328888.xyz/2022/07/03/NbrC.th.png',
  'https://s1.328888.xyz/2022/07/03/N5bP.th.png',
  'https://s1.328888.xyz/2022/07/03/N9g6.th.png',
  'https://s1.328888.xyz/2022/07/03/No4I.th.png',
  'https://s1.328888.xyz/2022/07/03/NsDK.th.png',
  'https://s1.328888.xyz/2022/07/03/NPy7.th.png'
]
//返回描述
const findDescription = (descArr: Description[], nowId: number): string => {
  let idx = descArr.findIndex((item) => {
    return item.articleId === nowId
  })
  if (idx === -1) {
    return '相关内容正在加载中....'
  } else {
    return descArr[idx].content
  }
}
const transformDesc = (description: string): string => {
  let res = ''
  for (let char of description) {
    if (char === '#' || char === '*') {
      continue
    } else {
      res += char
    }
  }
  return res
}
const ArticleList = ({ isMobile }: any) => {
  const [artList, setArtList] = useState<Article[]>([])

  // 用于滚动加载的防抖
  const [loading, setLoading] = useState<boolean>(false)
  const [nextPage, setNextPage] = useState<number>(1)
  const [descriptions, setDescriptions] = useState<Description[]>([])
  const Size = isMobile ? 'small' : 'middle'
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
        setArtList([...artList, ...res.results])
        let requestArr = []
        for (let item of res.results) {
          requestArr.push(Service.get(`/api/article/${item.id}`))
        }
        Promise.all(requestArr)
          .then((res) => {
            let nowFour: Description[] = []
            for (let item of res) {
              nowFour.push({
                articleId: item.id,
                content: transformDesc(item.body.slice(0, 100)) + '........'
              })
            }
            setDescriptions([...descriptions, ...nowFour])
            console.log('加载成功')
          })
          .catch((err) => {
            message.error(err)
          })
        if (res.next === null) {
          setNextPage(10086)
        } else {
          setNextPage(nextPage + 1)
        }
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        message.error('加载失败,稍后再试！')
        setLoading(false)
      })
  }
  useEffect(() => {
    loadMoreArticle()
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                    <Button type="primary" shape="round" size={Size}>
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
                          style={isMobile ? { display: 'none' } : {}}
                          size={60}
                          src={randomAvatar[item.id % 6]}
                        />
                      }
                      description={
                        isMobile
                          ? findDescription(descriptions, item.id).slice(0, 30) + '......'
                          : findDescription(descriptions, item.id)
                      }
                    />
                  </div>
                </Link>
                <div className="otherDetail">
                  <span className="created">
                    Create at:{new Date(item.created).getFullYear()}/
                    {new Date(item.created).getMonth() + 1}/{new Date(item.created).getDate()}
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
  margin-left: 20px;
  width: 100%;
  .skeleton {
    margin: 40px 0;
  }
  .listItem {
    width: 90%;
    margin-top: 20px;
    transition: all 0.5s;
  }
  .listItem:hover {
    transform: translate(10px, -20px);
    box-shadow: rgba(0, 0, 0, 0.2) 5px 5px 5px 5px;
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
    color: #531dab;
    background: #f9f0ff;
    border: 1px solid;
    border-color: #d3adf7;
    margin: 0 5px;
    padding: 0 5px;
  }
  .author {
    margin: 0 5px;
    padding: 0 5px;
    font-size: 10px;
    color: #d48806;
    background: #fffbe6;
    border: 1px solid;
    border-color: #ffe58f;
  }
`
export default ArticleList
