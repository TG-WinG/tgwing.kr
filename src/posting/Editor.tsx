import { FC } from 'react'
import ReactQuill from 'react-quill'

const Editor: FC = () => {
  const modules = {
    toolbar: {
      container: [
        ['image'],
        [{ header: [1, 2, 3, 4, 5, false] }],
        ['bold', 'italic', 'underline', 'strike', 'code-block'],
        [{ color: [] }],
        // can add highlight.js & indent, size, background, font, align, clean etc.
      ],
    },
  }

  return (
    <>
      <ReactQuill
        style={{
          width: '1296px',
          height: '600px',
        }}
        modules={modules}
      />
    </>
  )
}

export default Editor
