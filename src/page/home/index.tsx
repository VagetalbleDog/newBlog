import styled from '@emotion/styled'
import React from 'react'
import ArticleList from '../../components/articleLIst'
import Footer from '../../components/footer'
import Header from '../../components/Header'
import Info from '../../components/Info'
const Home: React.FC = () => {
  return (
    <Container>
      <Header />
      <div className="container">
        <div className="side">
          <Info />
        </div>
        <div className="list">
          <ArticleList />
        </div>
      </div>
      <Footer />
    </Container>
  )
}
const Container = styled.div`
  .container {
    display: flex;
    flex-direction: row;
  }
  .side {
    width: 300px;
  }
  .list {
    flex: 1;
  }
`
export default Home
