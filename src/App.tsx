import styled from '@emotion/styled'
import './App.css'
import ArticleList from './components/articleLIst'
import Header from './components/Header'
import Home from './page/home'
function App() {
  return (
    <Container>
      <Home />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .articleList {
    color: cyan;
  }
`
export default App
