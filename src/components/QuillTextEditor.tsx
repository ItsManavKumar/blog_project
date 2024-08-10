import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import 'quill/dist/quill.snow.css';

// Dynamically import Quill to avoid server-side rendering issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface QuillTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const QuillTextEditor: React.FC<QuillTextEditorProps> = ({ value, onChange }) => {
  const [editorHeight, setEditorHeight] = useState<number>(400);
  const editorRef = useRef<HTMLDivElement | null>(null);

  // Configure Quill's modules and formats
  const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['bold', 'italic', 'underline'],
      [{ 'align': [] }],
      ['link', 'image'],
      ['clean'],
    ],
  };

  // Handle editor content change
  const handleEditorChange = (content: string) => {
    onChange(content);
  };

  useEffect(() => {
    // Resize editor based on content height
    const updateEditorSize = () => {
      if (editorRef.current) {
        setEditorHeight(editorRef.current.scrollHeight);
      }
    };

    // Reference to the editor element
    const editorElement = editorRef.current;
    if (editorElement) {
      editorElement.addEventListener('input', updateEditorSize);
    }

    // Cleanup function to remove event listener
    return () => {
      if (editorElement) {
        editorElement.removeEventListener('input', updateEditorSize);
      }
    };
  }, [value]);

  return (
    <div className="rich-text-editor text-xl">
      <ReactQuill
        value={value}
        onChange={handleEditorChange}
        modules={modules}
        style={{ minHeight: `${editorHeight}px` }}
      />
      <div ref={editorRef} className="ql-editor" />
    </div>
  );
};

export default QuillTextEditor;
