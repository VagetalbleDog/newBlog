import styled from '@emotion/styled'
import React, { useLayoutEffect, useRef, useState } from 'react'
import ArticleList from '../../components/articleLIst'
import Footer from '../../components/footer'
import Header from '../../components/Header'
import Info from '../../components/Info'
import { ConfigProvider } from 'antd'
// ConfigProvider.config({
//   theme: {
//     primaryColor: '#25b864'
//   }
// })
const Home: React.FC = () => {
  const ref = useRef<any>(null)
  const [isMobile, setisMobile] = useState<boolean>(false)
  useLayoutEffect(() => {
    if (ref.current.offsetWidth === 0 && ref.current.offsetHeight === 0) {
      setisMobile(true)
    }
  }, [])
  return (
    <Container>
      <Header isMobile={isMobile} />
      <div className="container">
        <div className="side" ref={ref}>
          <Info />
        </div>
        <div className="list">
          <ArticleList isMobile={isMobile} />
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
    @media screen and (max-width: 800px) {
      display: none;
    }
    width: 300px;
  }
  .list {
    flex: 1;
  }
`
export default Home
