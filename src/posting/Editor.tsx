import React, { useMemo, useRef } from 'react'
import ReactQuill from 'react-quill'
import { uploadImageApi } from '../api/post'
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark.css'

interface EditorProps {
  value: string
  onChange: (content: string) => void
}

const Editor = React.memo(({ value, onChange }: EditorProps) => {
  const quillRef = useRef<ReactQuill | null>(null)

  const ImageHandler = () => {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click()
    input.onchange = async () => {
      const file: File | null = input.files ? input.files[0] : null
      if (!file) return
      const formdata = new FormData()
      formdata.append('image', file)

      const quillObj = quillRef.current?.getEditor()
      const range = quillObj?.getSelection()

      try {
        const res = await uploadImageApi(formdata)
        quillObj?.insertEmbed(range!.index, 'image', `${res}`)
      } catch (err) {
        console.log(err)
      }
    }
  }

  hljs.configure({
    languages: ['javascript', 'ruby', 'python', 'java', 'cpp', 'kotlin', 'sql'],
  })

  const modules = useMemo(() => {
    return {
      syntax: {
        highlight: (text: string) => hljs.highlightAuto(text).value,
      },
      toolbar: {
        container: [
          ['image'],
          [{ header: [1, 2, 3, 4, 5, false] }],
          ['bold', 'italic', 'underline', 'strike', 'code-block'],
          ['link'],
          [{ indent: '-1' }, { indent: '+1' }],
          [{ color: [] }],
        ],
        handlers: {
          image: ImageHandler,
        },
      },
    }
  }, [])

  return (
    <>
      <ReactQuill
        ref={quillRef}
        style={{
          width: '942px',
          height: '500px',
        }}
        value={value}
        modules={modules}
        onChange={onChange}
      />
    </>
  )
})

Editor.displayName = 'Editor'

export default Editor
