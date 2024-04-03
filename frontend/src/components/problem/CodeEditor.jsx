"use client";

import React, { useEffect, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { javascript } from "@codemirror/lang-javascript";
import { Code } from "lucide-react";
import EditorFooter from "./EditorFooter";
import { useRecoilState } from "recoil";
import { resultAtom } from "@/atoms/userAtom";
import { useParams } from "react-router-dom";

const CodeEditor = ({ starterCode, setUserCode }) => {
  const [result, setResult] = useRecoilState(resultAtom);
  const { pid } = useParams();

  const handleSubmit = () => {
    setResult(true);
  };

  useEffect(() => {
    const code = localStorage.getItem(`code-${pid}`);
    if (code) {
      setUserCode(code ? JSON.parse(code) : starterCode);
    } else {
      setUserCode(starterCode);
    }
  }, [pid, starterCode]);

  const onChange = (value) => {
    setUserCode(value);
    localStorage.setItem(`code-${pid}`, JSON.stringify(value));
  };

  return (
    <main className="relative h-full w-full overflow-auto bg-third">
      <nav>
        <div className="flex w-full items-center overflow-x-hidden border-b border-gray-500 bg-secondary text-white">
          <div
            className={
              "flex cursor-pointer items-center rounded-t-[5px] px-5 py-[10px] text-sm"
            }
          >
            <Code className="mr-3 text-primary" /> Code
          </div>
        </div>
      </nav>
      <CodeMirror
        value={starterCode}
        onChange={onChange}
        theme={vscodeDark}
        extensions={[javascript()]}
        style={{ fontSize: 16 }}
      />
      {/* <EditorFooter handleSubmit={handleSubmit} /> */}
    </main>
  );
};

export default CodeEditor;
