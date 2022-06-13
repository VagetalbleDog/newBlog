import styled from '@emotion/styled'
import { Affix, Button } from 'antd'
import React, { useState } from 'react'

export default function Header() {
  const [top, setTop] = useState(10)

  return (
    <>
      <Affix offsetTop={top}>
        <Button type="primary" onClick={() => setTop(top + 10)}>
          Affix top
        </Button>
      </Affix>
      <br />
    </>
  )
}
const Container = styled.div`
  font-size: 40px;
  color: red;
`
