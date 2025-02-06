"use client";

// Create a new file called CopyButton.tsx
import { Button } from "@/components/ui/button";

interface CopyButtonProps {
  content: string;
}

const CopyButton = ({ content }: CopyButtonProps) => {
  return (
    <Button
      variant="ghost"
      className="text-primary"
      onClick={() => navigator.clipboard.writeText(content)}
    >
      Copy
    </Button>
  );
};

export default CopyButton;
