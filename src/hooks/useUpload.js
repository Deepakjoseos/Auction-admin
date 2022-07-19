import { useState } from 'react'

const useUpload = (maxCount, mode = 'single') => {
  // console.log(maxCount)
  const [fileList, setFileList] = useState([])
  const [touched, setTouched] = useState(false)

  // const className = cls || 'upload-list-inline'
  // const listType = lt || 'picture'

  const onRemove = (file) => {
    setFileList((state) => {
      const index = state.indexOf(file)
      const newFileList = state.slice()
      newFileList.splice(index, 1)
      return newFileList
    })
  }

  const onChange = (info, b) => {
    console.log('filelist changed in useupload', info, b)
    const a = info.fileList
    // const fileArr = a.map(i => i.originFileObj)
    // console.log('Aliyun OSS 2:', a)
    // // console.log(fileArr)
    // set to a before
    setTouched(true)
    if (mode === 'single') {
      if (maxCount && maxCount > 0) setFileList(a.slice(-maxCount))
      else setFileList([...a])
    } else {
      setFileList([...a])
    }
  }

  const beforeUpload = (file) => {
    console.log('in before upload file Image', file)
    // console.log('in before upload fileList Image', fileList)
    if (mode === 'single') {
      setTouched(true)
      setFileList((state) => {
        console.log(state)
        return [state, file]
      })
    }
    return false
  }

  return { onRemove, onChange, beforeUpload, fileList, touched, setFileList }
}

export default useUpload
