
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Play, Download, Save } from "lucide-react";

interface CodeEditorProps {
  initialCode?: string;
  onCodeChange?: (code: string) => void;
  onRun?: (code: string) => void;
}

export const CodeEditor = ({ initialCode = "", onCodeChange, onRun }: CodeEditorProps) => {
  const [code, setCode] = useState(initialCode);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    onCodeChange?.(newCode);
  };

  const handleRun = () => {
    onRun?.(code);
  };

  const handleSave = () => {
    localStorage.setItem('saved_code', code);
    // Show toast notification
    console.log('Code saved to local storage');
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'my_code.py';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Python Code Editor</h3>
        <div className="flex space-x-2">
          <Button size="sm" variant="outline" onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
          <Button size="sm" variant="outline" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button size="sm" onClick={handleRun} className="bg-green-600 hover:bg-green-700">
            <Play className="h-4 w-4 mr-2" />
            Run Code
          </Button>
        </div>
      </div>
      <Textarea
        value={code}
        onChange={(e) => handleCodeChange(e.target.value)}
        className="min-h-[400px] font-mono text-sm bg-gray-900 text-green-400 border-gray-700"
        placeholder="# Write your Python code here...
# Example:
name = input('Enter your name: ')
print(f'Hello, {name}!')

# Try creating variables for different crops
maize_price = 100  # KES per kg
beans_price = 150  # KES per kg
print(f'Maize costs {maize_price} KES per kg')"
      />
    </div>
  );
};
