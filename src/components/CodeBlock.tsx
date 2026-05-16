'use client'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface CodeBlockProps {
  code: string
  language: string
  filename?: string
}

export function CodeBlock({ code, language, filename }: CodeBlockProps) {
  return (
    <div className="my-6 overflow-hidden rounded-lg border border-neutral-800">
      {filename && (
        <div className="border-b border-neutral-800 bg-neutral-900 px-4 py-2 text-xs text-neutral-400 font-mono">
          {filename}
        </div>
      )}
      <SyntaxHighlighter
        language={language || 'text'}
        style={oneDark}
        customStyle={{
          margin: 0,
          borderRadius: filename ? '0 0 0.5rem 0.5rem' : '0.5rem',
          fontSize: '0.875rem',
        }}
        showLineNumbers={code.split('\n').length > 5}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  )
}
