"use client";

import React from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { vscodeDark } from '@uiw/codemirror-theme-vscode'
import { javascript } from '@codemirror/lang-javascript'
import { Code } from 'lucide-react';
import EditorFooter from './EditorFooter';
import { useRecoilState } from 'recoil';
import { resultAtom } from '@/atoms/userAtom';

const CodeEditor = () => {
  const [result, setResult] = useRecoilState(resultAtom);

  const handleSubmit = () => {
    setResult(true);
}

  return (
    <main className='w-full overflow-auto h-full relative bg-third'>
      <nav>
        <div className='flex w-full items-center bg-secondary text-white overflow-x-hidden border-b border-gray-500'>
          <div className={"rounded-t-[5px] px-5 py-[10px] flex items-center text-sm cursor-pointer"}>
            <Code className='text-green-500 mr-3' />  Code
          </div>
        </div>
      </nav>
      <CodeMirror
        value="const hello = world;"
        theme={vscodeDark}
        extensions={[javascript()]}
        style={{ fontSize: 16 }}
      />
      <EditorFooter handleSubmit={handleSubmit} />
    </main>
  )
}

export default CodeEditor