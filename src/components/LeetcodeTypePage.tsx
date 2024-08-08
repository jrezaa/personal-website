import { ReactNode } from "react";
import CodeEditor from "./CodeEditor";

type Problem = {
  id: number;
  title: string;
  link: string;
  code: string;
  tests: { input: any[]; expected: any }[];
};

type LeetcodeTypePageProps = {
  title: string;
  introduction: string;
  problems: Problem[];
  additionalSections?: ReactNode;
};

export default function LeetcodeTypePage({
  title,
  introduction,
  problems,
  additionalSections,
}: LeetcodeTypePageProps) {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6">{title} Questions</h2>
      <section className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">
          Introduction and Explanation
        </h3>
        <p className="text-gray-700">{introduction}</p>
      </section>

      <section className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">Common Problems</h3>
        <ul className="space-y-6">
          {problems.map((problem) => (
            <li key={problem.id} className="p-4 border rounded-lg shadow">
              <a
                href={problem.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-medium text-blue-600 hover:underline"
              >
                {problem.title}
              </a>
              <div className="mt-4">
                <CodeEditor initialCode={problem.code} tests={problem.tests} />
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">
          Example Problems and Solutions
        </h3>
        <p className="text-gray-700">
          Detailed solutions and explanations for selected problems will be
          added here.
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">Tips and Tricks</h3>
        <ul className="list-disc list-inside text-gray-700">
          <li>Understand the problem statement and constraints.</li>
          <li>Think about different approaches and trade-offs.</li>
          <li>Write clean and efficient code.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">External Resources</h3>
        <ul className="list-disc list-inside text-blue-600">
          <li>
            <a
              href="https://www.geeksforgeeks.org/data-structures/arrays/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              GeeksforGeeks: Arrays
            </a>
          </li>
          <li>
            <a
              href="https://www.youtube.com/results?search_query=array+data+structure"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              YouTube: Array Data Structure
            </a>
          </li>
          {/* Add more resources here */}
        </ul>
      </section>

      {additionalSections && (
        <section className="mb-8">{additionalSections}</section>
      )}

      <section>
        <h3 className="text-2xl font-semibold mb-4">Practice Problems</h3>
        <ul className="list-disc list-inside text-blue-600">
          {problems.map((problem) => (
            <li key={problem.id}>
              <a
                href={problem.link}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {problem.title}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
