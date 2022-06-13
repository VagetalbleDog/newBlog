import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App'
import ArticleDetail from './page/artcleDetail'
import ErrorPage from './page/errorPage'

interface papeTitlePorps {
  title: string
  content: React.FC
}
//这个组件仅用来包裹文章标题使用
const PageTitle = (prop: papeTitlePorps) => {
  document.title = prop.title
  return <prop.content />
}
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<PageTitle content={App} title={'首页'} />} />
      <Route
        path="article/:ArticleId"
        element={<PageTitle content={ArticleDetail} title={'文章详情'} />}
      />
      <Route path="*" element={<PageTitle content={ErrorPage} title={'您是不是走错啦'} />} />
    </Routes>
  </BrowserRouter>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
