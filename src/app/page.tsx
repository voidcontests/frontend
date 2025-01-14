'use client';

import { Button } from "@/components/ui/button";
import Preview from "@/components/preview";
import Editor from "@/components/editor";
import { useState } from 'react';
import Link from "next/link";
import React from "react";
import {
  Widget,
  WidgetContent,
  WidgetTitle,
  WidgetFooter,
} from "@/components/ui/widget";
import { Toggle } from "@/components/ui/toggle";
import { useTheme } from "@/contexts/ThemeContext";

const DEFAULT_MD = `## 3042/ Count Prefix and Suffix Pairs. Part I

You are given a **0-indexed** string array \`words\`.

Let's define a **boolean** function \`isPrefixAndSuffix\` that takes two strings, \`str1\` and \`str2\`:
- \`isPrefixAndSuffix(str1, str2)\` returns \`true\` if \`str1\` is **both** a [prefix](/prefix) and a [suffix](/suffix) of \`str2\`, and \`false\` otherwise.

For example, \`isPrefixAndSuffix("aba", "ababa")\` is \`true\` because \`"aba"\` is a prefix of \`"ababa"\` and also a suffix, but \`isPrefixAndSuffix("abc", "abcd")\` is \`false\`.

Return an integer denoting the **number** of index pairs \`(i, j)\` such that \`i < j\`, and \`isPrefixAndSuffix(words[i], words[j])\` is \`true\`.

## Solution
---
### First **dumb** approach
\`\`\`python
class Solution:
  def countPrefixSuffixPairs(self, words: List[str]) -> int:
    ans = 0
    for i in range(len(words)):
      for j in range(i + 1, len(words)):
        if self.isPrefixAndSuffix(words[i], words[j]):
          ans += 1
    return ans
        
    def isPrefixAndSuffix(self, s1: str, s2: str) -> bool:
      if len(s1) > len(s2): return False

      for i in range(len(s1)):
        if s1[i] != s2[i]: return False

      for i in range(len(s1)):
        if s1[i] != s2[len(s2) - len(s1) + i]: return False
      
      return True
\`\`\``;

export default function Home() {
  const [markdown, setMarkdown] = useState(DEFAULT_MD);

  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex justify-center">
      <div className="w-[1200px] flex flex-col gap-[20px]">
        <Button onClick={() => toggleTheme()}>TOGGLE</Button>
        {theme}
        <Widget className="w-[380px]">
          <WidgetContent>
            <WidgetTitle>HOST</WidgetTitle>
            <p>
              Contests provided by <b>VOID</b> are not only what you can do here.
              Looking for a place for hosting your own competition? You just found it
            </p>
          </WidgetContent>
          <WidgetFooter className="pt-[20px]">
            <Button variant="link" className="w-full" asChild>
              <Link href='/contests/create'>
                CREATE CONTEST
              </Link>
            </Button>
          </WidgetFooter>
        </Widget>
        <Editor
          placeholder="Write something"
          markdown={markdown}
          setMarkdown={setMarkdown}
          className="h-[300px]"
        >
          Add a description
        </Editor>
        <Preview markdown={markdown} />
      </div>
    </div >
  );
}