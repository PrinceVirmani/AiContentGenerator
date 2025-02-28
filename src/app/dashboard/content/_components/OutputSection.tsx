"use client";
import React, { useEffect, useState } from "react";
// @ts-ignore - Ignore TypeScript errors for this import
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

interface PROPS {
  aiOutput: string | undefined;
}

function OutputSection({ aiOutput }: PROPS) {
  const [markdownValue, setMarkdownValue] = useState<string>(
    "Your result will appear here"
  );

  // Function to remove RTF formatting if present
  const cleanRTF = (text: string) => {
    if (!text) return "";
    return text
      .replace(/\\[a-z]+\d*/g, "")
      .replace(/{|}/g, "")
      .trim();
  };

  useEffect(() => {
    const cleanedOutput = aiOutput ? cleanRTF(aiOutput) : "";
    if (cleanedOutput) {
      setMarkdownValue(cleanedOutput);
    }
  }, [aiOutput]);

  return (
    <div className="bg-white shadow-lg border rounded-lg">
      <div className="flex justify-between items-center p-5">
        <h2 className="font-medium text-lg">Your Result</h2>
        <Button
          className="flex gap-2"
          onClick={() => {
            navigator.clipboard.writeText(aiOutput ?? "");
          }}
        >
          <Copy className="w-4 h-4" /> Copy
        </Button>
      </div>
      <div data-color-mode="light">
        <MDEditor
          value={markdownValue}
          onChange={(val: string | undefined) => setMarkdownValue(val || "")}
          height={600}
          preview="preview"
          hideToolbar={false}
        />
      </div>
    </div>
  );
}

export default OutputSection;
