import { Affix, Button } from 'antd'
import React, { useState } from 'react'

const FooterTip: React.FC = () => {
  const [bottom, setBottom] = useState(10)
  return (
    <>
      <br />
      {/* <Affix offsetBottom={bottom}>1</Affix> */}
    </>
  )
}

export default FooterTip
