import React from 'react'
import ArticleList from '../../components/articleLIst'
import Footer from '../../components/footer'
import Header from '../../components/Header'
const Home: React.FC = () => {
  return (
    <>
      <Header />
      <ArticleList />
      <Footer />
    </>
  )
}

export default Home
