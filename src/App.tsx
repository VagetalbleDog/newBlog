import styled from '@emotion/styled'
import './App.css'
import ArticleList from './components/articleLIst'
import Header from './components/Header'
function App() {
  return (
    <Container>
      <Header/>
      <ArticleList/>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .articleList{
    color:blue
  }
`
export default App
