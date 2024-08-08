import { ReactNode } from "react";

export default function LeetcodeHelpLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
}
