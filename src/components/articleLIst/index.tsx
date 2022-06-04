import styled from '@emotion/styled'
import { Button, Divider,List } from 'antd'
import React, { useEffect, useState } from 'react'
import Service from '../../service'
export default function ArticleList() {
  const [artList,setArtList] = useState([])

  const getArticle = ()=>{
    Service.get('/api/article').then((res:any)=>{
      setArtList(res.data.results)
    })
  }

  useEffect(()=>{
    getArticle()
  },[])
  return (
    <Container>
    <List itemLayout='vertical' dataSource={artList} size="large" footer={<p>下拉展示更多数据</p>}
    renderItem={
      (item:any)=>{
        return (
          <List.Item className='listItem'>
            <div>
              <span className='category'>{item.category.title}</span>
              {
                item.tags.map((tag:string)=>{
                  return <span className='tag'>{tag}</span>
                })
              }
            </div>
              <a className='title' href={item.url}>{item.title}</a>
              <div className='otherDetail'>
                <span className='created'>发布时间：{new Date(item.created).toDateString()}</span>
                <span className='updated'>最后修改于：{new Date(item.updated).toDateString()}</span>
                <span className='author'>Created By：{item.author.username}</span>
              </div>
          </List.Item>
        )
      }
    }>
    </List>
    </Container>
  )
}


const Container = styled.div`
  .listItem{
    width: auto;
    height: 200px;
    margin-top:20px;
    transition: all 0.5s;
  }
  .listItem:hover{
    transform: scale(1.1);
    box-shadow:rgba(0,0,0,0.2) 10px 10px 10px 10px;
  }
  .title{
    display: block;
    font-size: 23px;
    margin: 40px;
  }
  .tag{
    display: inline-block;
    background-color: aqua;
    border-radius:15px;
    margin-left:10px;
    padding: 0 10px;
    font-size: 15px;
    color: goldenrod;
  }
  .category{
    border: 1px solid gold;
    background-color: gold;
    display: inline-block;
    border-radius:20px;
    padding: 0 5px;
    font-size: 18px;
    color: whitesmoke;
  }
  .created{
    font-size: 16px;
    color:violet;
    margin: 0 10px;
  }
  .updated{
    font-size: 16px;
    color:green;
    margin: 0 10px;
 }
 .author{
   font-size:20px;
 }
`