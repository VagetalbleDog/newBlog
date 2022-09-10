import React, { useState } from 'react'
import useFormChange from '../../hooks/useForm'
function Index() {
  const [formData, setForm, resetForm] = useFormChange()
  const { name, options, select } = formData
  return (
    <div>
      <input
        name="value1"
        title="名称"
        type="text"
        placeholder="请输入名称"
        value={name}
        onChange={(e) => setForm('name', e.target.value)}
      />
      <button onClick={resetForm}>重置</button>
    </div>
  )
}
export default Index
