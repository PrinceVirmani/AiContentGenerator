"use client";
import React, { useEffect, useRef } from "react";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

interface PROPS {
  aiOutput: string | undefined;
}

function OutputSection({ aiOutput }: PROPS) {
  const editorRef = useRef<Editor | null>(null);

  // Function to remove RTF formatting if present
  const cleanRTF = (text: string) => {
    if (!text) return "";
    return text
      .replace(/\\[a-z]+\d*/g, "")
      .replace(/{|}/g, "")
      .trim();
  };

  useEffect(() => {
    if (!editorRef.current) return; // ✅ Prevents null errors

    const instance = editorRef.current.getInstance?.(); // ✅ Safe function call
    if (!instance) return;

    const cleanedOutput = aiOutput ? cleanRTF(aiOutput) : "";
    instance.setMarkdown(cleanedOutput);
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
      <Editor
        ref={editorRef} // Using React.RefObject for the ref
        initialValue="Your result will appear here"
        height="600px"
        initialEditType="markdown"
        useCommandShortcut={true}
      />
    </div>
  );
}

export default OutputSection;
