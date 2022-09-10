import { useCallback, useEffect, useRef, useState } from 'react'
import { FormInstance, message } from 'antd'
interface ResponseType<ReturnType> {
  //响应码
  code: number
  //后端返回数据的格式
  data: ReturnType
}
interface useFormOptions<FormDataType, DataType, ReturnType> {
  canEdit?: boolean
  data?: DataType // data是后端返回给我们的数据
  transformer?: (data: DataType) => FormDataType | Promise<FormDataType>
  onSave?: (formData: FormDataType) => Promise<ResponseType<ReturnType>>
  onCreate?: (formData: FormDataType) => Promise<ResponseType<ReturnType>>
}

export const useCommonForm = <FormDataType = any, DataType = any, ReturnType = any>(
  options: useFormOptions<FormDataType, DataType, ReturnType>
) => {
  const { canEdit, data, transformer, onCreate, onSave } = options
  //fromRef为 antd的一个实例，用于拿到form实例的一些方法
  const fromRef = useRef<FormInstance>(null)
  //表示表单是否可以编辑，不可编辑，将设置表单项的状态为disable
  const [canEditStatue, setCanEdit] = useState(canEdit)
  //loading表示表单的状态，create和save未完成的时候，均为true，其余时刻为false
  const [loading, setLoading] = useState(false)

  // 初始化表单数据
  const initFormData = useCallback(async () => {
    if (data) {
      const formData = transformer ? await transformer(data) : data
      fromRef.current?.setFieldsValue(formData)
    }
  }, [data, transformer])
  useEffect(() => {
    initFormData()
  }, [])
  const create = async () => {
    //新建条目
    //1、判断有没有传入相应的onCreate函数
    if (!onCreate) {
      message.error('缺失onCreate函数')
      return
    }
    //2、判断表单字段有没有通过校验
    const valid = await fromRef.current?.validateFields()
    if (!valid) {
      message.error('表单数据不合法')
      return
    }
    //3、获取表单数据
    const formData = fromRef.current?.getFieldsValue()
    //4、设置loading为true
    setLoading(true)
    //5、发起请求
    try {
      const res = await onCreate(formData)
      setLoading(false)
      if (res && res.code === 200) {
        message.success('新建成功')
        return res.data
      }
    } catch (error: any) {
      setLoading(false)
      message.error('新建失败，请检查控制台报错信息')
      console.log(error)
    }
  }
  const save = async () => {
    //编辑条目
    //1、检查是否传入onSave函数
    if (!onSave) {
      message.error('缺失onSave')
      return
    }
    //2、表单校验
    const valid = await fromRef.current?.validateFields()
    if (!valid) {
      message.error('表单数据不合法')
      return
    }
    //3、获取表单数据
    const formData = fromRef.current?.getFieldsValue()
    //4、设置loading为true
    setLoading(true)
    //5、发起请求，成功的话，需要将canEdit设置为false
    try {
      const res = await onSave(formData)
      setLoading(false)
      if (res && res.code === 200) {
        message.success('编辑成功')
        return res.data
      }
    } catch (error: any) {
      setLoading(false)
      message.error('编辑失败')
      console.log(error)
    }
  }
  const edit = () => {
    setCanEdit(true)
  }
  const clear = () => {
    fromRef.current?.resetFields()
  }
  return { fromRef, canEditStatue, loading, create, save, edit, clear }
}
