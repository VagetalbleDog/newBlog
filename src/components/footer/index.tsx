import { Affix, Button } from 'antd'
import React, { useState } from 'react'

const FooterTip: React.FC = () => {
  const [bottom, setBottom] = useState(10)
  return (
    <>
      <br />
      <Affix offsetBottom={bottom}>
        <Button type="primary">Affix bottom</Button>
        <Button type="primary">Affix bottom</Button>
        <Button type="primary">Affix bottom</Button>
        <Button type="primary">Affix bottom</Button>
        <Button type="primary">Affix bottom</Button>
        <Button type="primary">Affix bottom</Button>
      </Affix>
    </>
  )
}

export default FooterTip
