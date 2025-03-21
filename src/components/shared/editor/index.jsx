"use client";

import React, { useState, useCallback } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";
import { oneDark } from "@codemirror/theme-one-dark";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { basicLight } from "@uiw/codemirror-theme-basic";
import { gruvboxDark, gruvboxLight } from "@uiw/codemirror-theme-gruvbox-dark";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const languages = {
  javascript: { name: "JavaScript", mode: javascript(), compiler: "js" },
  python: { name: "Python", mode: python(), compiler: "python3" },
  java: { name: "Java", mode: java(), compiler: "java" },
  cpp: { name: "C++", mode: cpp(), compiler: "cpp" },
};

const themes = {
  dark: { name: "One Dark", mode: oneDark },
  dracula: { name: "Dracula", mode: dracula },
  light: { name: "Light", mode: basicLight },
  gruvboxDark: { name: "Gruvbox dark", mode: gruvboxDark },
  gruvbox: { name: "Gruvbox light", mode: gruvboxLight },
};

const executeCode = async (language, code) => {
  if (language === "javascript") {
    try {
      const result = eval(code);
      return result?.toString() || "No output";
    } catch (error) {
      return `❌ Error: ${error.message}`;
    }
  } else {
    try {
      const response = await fetch("https://emkc.org/api/v2/piston/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: languages[language].compiler,
          version: "*",
          files: [{ content: code }],
        }),
      });
      const data = await response.json();
      return data.run.stdout || data.run.stderr || "No output";
    } catch (error) {
      return `❌ Error: ${error.message}`;
    }
  }
};

export default function LeetCodeEditor() {
  const [language, setLanguage] = useState("javascript");
  const [theme, setTheme] = useState("dark");
  const [code, setCode] = useState("// Write your code here...");
  const [output, setOutput] = useState("");

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onChange = useCallback((value) => {
    setCode(value);
  }, []);

  const handleRun = async () => {
    setOutput("⏳ Running...");
    const result = await executeCode(language, code);
    setOutput(result);
  };

  const handleSubmit = () => {
    setOutput("✅ Your solution has been submitted!");
  };

  return (
    <div className="min-h-screen px-3 pb-3">

      <div className="max-w-[99%] px-1 py-2 mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link className="border-r border-white/20 pr-2" to="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 512 512"
            >
              <path
                fill="#ff0000"
                d="M360 256h16v48h-16zm-248 48h129.6l-48-48H112z"
              />
              <path
                fill="#ff0000"
                d="M364.5 60.1a9 9 0 0 1-1-.6a219 219 0 0 0-34.4-14.8l-5.4-1.8A223.2 223.2 0 0 0 256 32C132.3 32 32 132.3 32 256a223.71 223.71 0 0 0 115.4 195.8c.4.2.7.5 1.1.7a219 219 0 0 0 34.4 14.8l5.4 1.8A222.7 222.7 0 0 0 256 480c123.7 0 224-100.3 224-224A223.76 223.76 0 0 0 364.5 60.1M256 426.4a162 162 0 0 1-27.2-2.4a170 170 0 0 1-28.5-7.3c-1.9-.6-3.8-1.2-5.6-1.9a162 162 0 0 1-19-8.6a170.33 170.33 0 0 1-90.1-150.3c0-37.2 12.4-71.4 32.7-99.4l237.2 237.2c-28.1 20.3-62.3 32.7-99.5 32.7m137.8-71L156.6 118.2c28-20.2 62.1-32.6 99.4-32.6a163 163 0 0 1 27.2 2.4a170 170 0 0 1 28.5 7.3c1.8.6 3.7 1.2 5.6 1.9a162 162 0 0 1 18 8.1a170.25 170.25 0 0 1 91.2 150.8c-.1 37.2-12.5 71.3-32.7 99.3"
              />
              <path
                fill="#ff0000"
                d="M352 256h-34l34 34zm32 0h16v48h-16zm-23.9-43.3c-8.8-4.1-22-5.7-45.6-5.7h-3.6c-12.7.1-15.9-.1-20-6.1c-2.8-4.2-1-14.8 3.7-21.9a8 8 0 0 0 .4-8.2a8.26 8.26 0 0 0-7-4.3a53.7 53.7 0 0 1-18.3-3.9c-10.6-4.5-15.6-12.1-15.6-23.1c0-25.8 21.8-27.7 22.8-27.7v-16c-12 0-38.8 11-38.8 43.7c0 17.5 9 31 25.7 38a66.6 66.6 0 0 0 12 3.6c-3.3 9.8-3.6 20.9 1.7 28.7c9 13.3 20.3 13.2 33.3 13.1h3.5c26.3 0 34.6 2.3 38.9 4.3c5.7 2.6 6.8 7.5 6.6 15.7v1h16v-1c0-7.1.3-22.8-15.7-30.2"
              />
              <path
                fill="#ff0000"
                d="M400 244c0-25.7-3-39.2-9.1-49.6C382.3 180 368.5 172 352 172h-17.4c2.9-8.3 5.4-19.8 3.5-30.9c-3.2-18.8-19.1-30-43.1-30v16c21 0 26.1 9.1 27.4 16.7c2.5 14.5-6.8 32.1-6.9 32.3a8 8 0 0 0 .1 7.9a8.06 8.06 0 0 0 6.9 3.9H352c10.9 0 19.4 4.9 25.1 14.6c3.1 5.3 6.9 13.5 6.9 41.4h16Z"
              />
            </svg>
          </Link>
          <div className="flex items-center ml-2 gap-3 hover:bg-white/10 rounded-sm pl-2">
            <p className="text-[14px] flex items-center gap-2 border-r border-transparent">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#808080"
                  d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5s1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5m0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5S5.5 6.83 5.5 6S4.83 4.5 4 4.5m0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5s1.5-.68 1.5-1.5s-.67-1.5-1.5-1.5M7 19h14v-2H7zm0-6h14v-2H7zm0-8v2h14V5z"
                />
              </svg>
              <span className="cursor-pointer">Problem list</span>
            </p>
            <div className="flex items-center">
              <svg
                className="h-[24px] w-[24px] p-1 hover:bg-white/10 cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#808080"
                  d="m9.55 12l7.35 7.35q.375.375.363.875t-.388.875t-.875.375t-.875-.375l-7.7-7.675q-.3-.3-.45-.675t-.15-.75t.15-.75t.45-.675l7.7-7.7q.375-.375.888-.363t.887.388t.375.875t-.375.875z"
                />
              </svg>
              <svg
                className="h-[24px] w-[24px] p-1 hover:bg-white/10 cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#808080"
                  d="m14.475 12l-7.35-7.35q-.375-.375-.363-.888t.388-.887t.888-.375t.887.375l7.675 7.7q.3.3.45.675t.15.75t-.15.75t-.45.675l-7.7 7.7q-.375.375-.875.363T7.15 21.1t-.375-.888t.375-.887z"
                />
              </svg>
              <svg
                className="rounded-r-sm h-[24px] w-[24px] p-1 hover:bg-white/10 cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 512 512"
              >
                <path
                  d="M365.419 152h13.81l-50.738 41.584 20.308 24.572L448 136l-99.136-84-20.368 24.978L379.679 120h-14.26c-103.727 0-146.494 79.62-180.857 143.727-1.362 2.542-2.715 4.99-4.06 7.488l-.059.095c-1.591 2.953-3.176 6.114-4.76 9.038-35.562 65.63-66.893 83.214-111.684 83.641V396c37.625 0 57.563-9.451 72.236-18.178 24.935-14.831 47.042-44.559 67.583-82.467 1.541-2.844 3.083-5.752 4.632-8.626l.225-.438c1.459-2.711 2.922-5.273 4.39-8.014C246.369 216.113 280.808 152 365.419 152z"
                  fill="#808080"
                />
                <path
                  d="M348.798 293.844l-20.308 24.572L379.229 360h-13.81c-70.728 0-106.396-44.801-135.649-95.812l-17.648 32.618C243.556 346.626 287.116 392 365.419 392h14.26l-51.183 43.022L348.864 460 448 376l-99.202-82.156z"
                  fill="#808080"
                />
                <path
                  d="M175.684 231.652c1.584 2.924 3.169 6.085 4.76 9.038l.059.095c1.218 2.262 2.442 4.49 3.675 6.777 5.82-10.73 11.98-21.748 18.695-32.649-20.273-37.079-42.083-66.132-66.636-80.735C121.563 125.451 101.625 116 64 116v32.011c44.791.427 76.122 18.011 111.684 83.641z"
                  fill="#808080"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-[1px] rounded-sm">
          <Button
            className='h-8 rounded-r-none'
            variant="secondary"
            onClick={handleRun}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M9 15.714V8.287q0-.368.244-.588q.243-.22.568-.22q.102 0 .213.028q.11.027.211.083l5.843 3.733q.186.13.28.298q.093.167.093.379t-.093.379t-.28.298l-5.843 3.733q-.101.055-.213.083t-.213.028q-.326 0-.568-.22T9 15.714"
              />
            </svg>
            Run
          </Button>
          <Button
            variant="secondary"
            onClick={handleSubmit}
            className='h-8 rounded-l-none'
          >
            <svg
              className="mr-1"
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
            >
              <path
                fill="#28C244"
                d="M17.5 18.25a.75.75 0 0 1 0-1.5c1.66 0 2.25-.83 2.25-3.18a3.57 3.57 0 0 0-3.25-3.25a3.3 3.3 0 0 0-1 .18a.74.74 0 0 1-1-.49a5.25 5.25 0 0 0-10.25 1.56c0 3.44.76 5.18 2.25 5.18a.75.75 0 0 1 0 1.5c-2.5 0-3.75-2.25-3.75-6.68a6.75 6.75 0 0 1 13-2.68a4.4 4.4 0 0 1 .8-.07a5.07 5.07 0 0 1 4.75 4.75c-.05 1.28-.05 4.68-3.8 4.68"
              />
              <path
                fill="#28C244"
                d="M14.83 15.65a.77.77 0 0 1-.53-.22l-2.3-2.3l-2.3 2.3a.75.75 0 0 1-1.06-1.06l2.83-2.83a.74.74 0 0 1 1.06 0l2.83 2.83a.75.75 0 0 1 0 1.06a.8.8 0 0 1-.53.22"
              />
              <path
                fill="#28C244"
                d="M12 19.18a.75.75 0 0 1-.75-.75v-6.36a.75.75 0 0 1 1.5 0v6.36a.75.75 0 0 1-.75.75"
              />
            </svg>
            Submit
          </Button>
        </div>
        <div className="flex items-center gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <g
              fill="none"
              stroke="#808080"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            >
              <path d="M19.875 6.27A2.23 2.23 0 0 1 21 8.218v7.284c0 .809-.443 1.555-1.158 1.948l-6.75 4.27a2.27 2.27 0 0 1-2.184 0l-6.75-4.27A2.23 2.23 0 0 1 3 15.502V8.217c0-.809.443-1.554 1.158-1.947l6.75-3.98a2.33 2.33 0 0 1 2.25 0l6.75 3.98z" />
              <path d="M9 12a3 3 0 1 0 6 0a3 3 0 1 0-6 0" />
            </g>
          </svg>
          <div className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path
                fill="#808080"
                d="M12 2.02c-5.51 0-9.98 4.47-9.98 9.98s4.47 9.98 9.98 9.98s9.98-4.47 9.98-9.98S17.51 2.02 12 2.02m-.52 15.86v-4.14H8.82c-.37 0-.62-.4-.44-.73l3.68-7.17c.23-.47.94-.3.94.23v4.19h2.54c.37 0 .61.39.45.72l-3.56 7.12c-.24.48-.95.31-.95-.22"
              />
            </svg>
            <span className="text-[13px] text-[#808080]">0</span>
          </div>
          <img
            className="rounded-full"
            height={30}
            width={30}
            src="https://assets.leetcode.com/users/avatars/avatar_1646426627.png"
          />
        </div>
      </div>

      <ResizablePanelGroup
        direction="horizontal"
        className="!h-[92vh] grid grid-cols-1 md:grid-cols-3 gap-2"
      >
        <ResizablePanel className="md:col-span-2 border rounded-lg shadow-lg flex flex-col">
          <div className="flex p-1 pl-2 flex-col sm:flex-row sm:justify-between sm:items-center border-b">
            <p className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#28C244"
                  d="M8.7 15.9L4.8 12l3.9-3.9a.984.984 0 0 0 0-1.4a.984.984 0 0 0-1.4 0l-4.59 4.59a.996.996 0 0 0 0 1.41l4.59 4.6c.39.39 1.01.39 1.4 0a.984.984 0 0 0 0-1.4m6.6 0l3.9-3.9l-3.9-3.9a.984.984 0 0 1 0-1.4a.984.984 0 0 1 1.4 0l4.59 4.59c.39.39.39 1.02 0 1.41l-4.59 4.6a.984.984 0 0 1-1.4 0a.984.984 0 0 1 0-1.4"
                />
              </svg>
              <span className="text-[14px] mb-1">Code</span>
            </p>
          </div>

          <div className="flex py-2 pl-2 flex-col sm:flex-row sm:justify-between sm:items-center">
            <div className="flex items-center gap-2">
              <Select onValueChange={setLanguage} defaultValue={language}>
                <SelectTrigger className="w-28 text-[12px] cursor-pointer !h-2 border-none">
                  <SelectValue placeholder="Select Language" />
                </SelectTrigger>
                <SelectContent className="border">
                  {Object.keys(languages).map((lang) => (
                    <SelectItem
                      key={lang}
                      value={lang}
                      className="cursor-pointer"
                    >
                      {languages[lang].name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select onValueChange={setTheme} defaultValue={theme}>
                <SelectTrigger className="w-32 text-[12px] cursor-pointer !h-2 border-none">
                  <SelectValue placeholder="Select Theme" />
                </SelectTrigger>
                <SelectContent className="border">
                  {Object.keys(themes).map((th) => (
                    <SelectItem key={th} value={th}>
                      {themes[th].name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <CodeMirror
            value={code}
            height="500px"
            theme={themes[theme].mode}
            extensions={[languages[language].mode]}
            onChange={onChange}
            className="rounded border border-gray-600"
          />

          <div className="p-4">
            <h3 className="text-sm font-bold">Output:</h3>
            <pre className="text-sm whitespace-pre-wrap">
              {output}
            </pre>
          </div>
        </ResizablePanel>

        <ResizableHandle />

        <ResizablePanel className="border rounded-lg">
          <div className="flex py-1 pl-3 gap-4">
            <p className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#0080ff"
                  d="M9 13h6q.425 0 .713-.288T16 12t-.288-.712T15 11H9q-.425 0-.712.288T8 12t.288.713T9 13m0 3h6q.425 0 .713-.288T16 15t-.288-.712T15 14H9q-.425 0-.712.288T8 15t.288.713T9 16m0 3h3q.425 0 .713-.288T13 18t-.288-.712T12 17H9q-.425 0-.712.288T8 18t.288.713T9 19m-3 3q-.825 0-1.412-.587T4 20V4q0-.825.588-1.412T6 2h7.175q.4 0 .763.15t.637.425l4.85 4.85q.275.275.425.638t.15.762V20q0 .825-.587 1.413T18 22zM18 9h-3.5q-.625 0-1.062-.437T13 7.5V4H6v16h12zM6 4v5zv16z"
                />
              </svg>
              <span className="text-[14px] mb-1">Description</span>
            </p>
            <p className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 56 56"
              >
                <path
                  fill="#ff8000"
                  d="M28 54.402c13.055 0 23.906-10.828 23.906-23.906c0-11.531-8.437-21.305-19.383-23.46v-3.33c0-1.664-1.148-2.11-2.437-1.195l-7.477 5.226c-1.054.75-1.078 1.875 0 2.649l7.453 5.25c1.313.937 2.461.492 2.461-1.196v-3.35c8.86 2.015 15.375 9.914 15.375 19.406A19.84 19.84 0 0 1 28 50.418c-11.063 0-19.945-8.86-19.922-19.922c.023-6.656 3.258-12.539 8.25-16.101c.961-.727 1.266-1.829.656-2.813c-.562-.96-1.851-1.219-2.883-.422C8.055 15.543 4.094 22.621 4.094 30.496c0 13.078 10.828 23.906 23.906 23.906"
                />
              </svg>
              <span className="text-[14px] mb-1">Description</span>
            </p>
          </div>
          <div className="px-3 py-2">
            <h2 className="text-lg font-semibold mb-2">Problem: Two Sum</h2>
            <p>
              Given an array of integers <code>nums</code> and an integer{" "}
              <code>target</code>, return the indices of the two numbers such
              that they add up to <code>target</code>.
            </p>
            <p className="mt-2 text-sm text-gray-400">
              <strong>Example:</strong>
            </p>
            <pre className="border p-2 rounded text-sm">
              <code>
                Input: nums = [2,7,11,15], target = 9
                <br />
                Output: [0,1]
              </code>
            </pre>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}