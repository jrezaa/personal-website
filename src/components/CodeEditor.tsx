// components/CodeEditor.tsx

import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";

type CodeEditorProps = {
  initialCode: string;
  tests: { input: any[]; expected: any }[];
};

const CodeEditor: React.FC<CodeEditorProps> = ({ initialCode, tests }) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<
    { input: string; message: string; passed: boolean }[]
  >([]);

  const runCode = () => {
    const results: { input: string; message: string; passed: boolean }[] = [];
    try {
      // eslint-disable-next-line no-eval
      const func = eval(`(${code})`);
      tests.forEach((test, index) => {
        try {
          const result = func(...test.input);
          const isPassed =
            JSON.stringify(result) === JSON.stringify(test.expected);
          results.push({
            input: `Test ${index + 1}: ${JSON.stringify(test.input)}`,
            message: isPassed
              ? "Passed"
              : `Failed (Expected: ${JSON.stringify(
                  test.expected
                )}, Got: ${JSON.stringify(result)})`,
            passed: isPassed,
          });
        } catch (testError) {
          results.push({
            input: `Test ${index + 1}: ${JSON.stringify(test.input)}`,
            message: `Error (${(testError as any).message})`,
            passed: false,
          });
        }
      });
    } catch (error) {
      results.push({
        input: "Error",
        message: (error as any).message,
        passed: false,
      });
    }
    setOutput(results);
  };

  return (
    <div className="">
      <CodeMirror
        value={code}
        height="250px"
        extensions={[javascript()]}
        theme={oneDark}
        onChange={(value) => setCode(value)}
      />
      <button
        onClick={runCode}
        className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
      >
        Run Code
      </button>
      <div className="mt-4 p-4 bg-[#282c34] rounded-lg">
        {output.map((result, index) => (
          <div key={index} className="mb-2">
            <span className="text-[#7d8799]">{result.input}</span>
            <pre
              className={`text-sm ${
                result.passed ? "text-green-600" : "text-red-600"
              }`}
            >
              {result.message}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CodeEditor;
