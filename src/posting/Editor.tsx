import ReactQuill from 'react-quill'

interface EditorProps {
  value: string
  onChange: (content: string) => void
}

const Editor = ({ value, onChange }: EditorProps) => {
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
          width: '942px',
          height: '500px',
        }}
        value={value}
        modules={modules}
        onChange={onChange}
      />
    </>
  )
}

export default Editor
