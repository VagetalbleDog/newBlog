import { Affix, Button } from 'antd'
import React, { useState } from 'react'

const Footer: React.FC = () => {
  const [bottom, setBottom] = useState(10)
  return (
    <>
      <br />
      <Affix offsetBottom={bottom}>
        <Button type="primary" onClick={() => setBottom(bottom + 10)}>
          Affix bottom
        </Button>
      </Affix>
    </>
  )
}

export default Footer
