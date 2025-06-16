
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, BookOpen, Video, ExternalLink } from "lucide-react";

interface Material {
  id: string;
  title: string;
  type: 'pdf' | 'video' | 'link';
  url: string;
  description: string;
  size?: string;
  content?: string; // Real PDF content
}

interface CourseMaterialsProps {
  weekNumber: number;
  materials: Material[];
}

export const CourseMaterials = ({ weekNumber, materials }: CourseMaterialsProps) => {
  const generatePDFContent = (material: Material) => {
    // Real PDF content based on material type
    const pdfContents: { [key: string]: string } = {
      "Python Installation Guide": `
# Python Installation Guide

## Installing Python on Windows
1. Download Python from python.org
2. Run the installer
3. Check "Add Python to PATH"
4. Click "Install Now"

## Installing Python on macOS
1. Download Python from python.org
2. Run the .pkg installer
3. Follow the installation wizard

## Installing Python on Linux
1. Open terminal
2. Run: sudo apt update
3. Run: sudo apt install python3 python3-pip

## Verifying Installation
Open command prompt/terminal and type:
python --version

You should see Python 3.x.x

## Setting up Virtual Environment
python -m venv myproject
source myproject/bin/activate  # On Windows: myproject\\Scripts\\activate
`,
      "VS Code Setup Instructions": `
# VS Code Setup for Python Development

## Installing VS Code
1. Download from code.visualstudio.com
2. Install the application
3. Launch VS Code

## Essential Python Extensions
1. Python Extension by Microsoft
2. Python Docstring Generator
3. Code Runner
4. GitLens

## Configuration
1. Open VS Code Settings (Ctrl/Cmd + ,)
2. Search for "python interpreter"
3. Select your Python installation

## Useful Shortcuts
- Ctrl/Cmd + Shift + P: Command Palette
- F5: Run/Debug
- Ctrl/Cmd + /: Toggle Comment
`,
      "Control Flow Exercises": `
# Python Control Flow Exercises

## Exercise 1: Age Categories
Write a program that categorizes age:
- 0-12: Child
- 13-19: Teenager
- 20-59: Adult
- 60+: Senior

age = int(input("Enter your age: "))
if age <= 12:
    print("Child")
elif age <= 19:
    print("Teenager")
elif age <= 59:
    print("Adult")
else:
    print("Senior")

## Exercise 2: Grade Calculator
Create a grading system:
- 90-100: A
- 80-89: B
- 70-79: C
- 60-69: D
- Below 60: F

## Exercise 3: Number Guessing Game
Create a simple number guessing game using loops.
`,
      "Git Commands Cheat Sheet": `
# Git Commands Cheat Sheet

## Basic Commands
git init - Initialize a new repository
git clone <url> - Clone a repository
git add <file> - Add file to staging
git commit -m "message" - Commit changes
git push - Push to remote repository
git pull - Pull from remote repository

## Branching
git branch - List branches
git branch <name> - Create new branch
git checkout <branch> - Switch to branch
git merge <branch> - Merge branch

## Useful Commands
git status - Check repository status
git log - View commit history
git diff - Show changes
git reset - Undo changes

## Best Practices
- Write clear commit messages
- Commit frequently
- Use branches for features
- Pull before pushing
`
    };

    return pdfContents[material.title] || `# ${material.title}\n\nContent for ${material.title}`;
  };

  const handleDownload = (material: Material) => {
    if (material.type === 'pdf') {
      const content = generatePDFContent(material);
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Week_${weekNumber}_${material.title.replace(/\s+/g, '_')}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      console.log(`Downloaded: ${material.title}`);
    } else {
      window.open(material.url, '_blank');
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="h-4 w-4" />;
      case 'video':
        return <Video className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'pdf':
        return 'bg-red-100 text-red-800';
      case 'video':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Week {weekNumber} Materials</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {materials.map((material) => (
          <div key={material.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border rounded-lg gap-4">
            <div className="flex items-start space-x-3 flex-1">
              <div className="p-2 bg-gray-100 rounded flex-shrink-0">
                {getIcon(material.type)}
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-semibold text-sm">{material.title}</h4>
                <p className="text-xs text-gray-600 mt-1">{material.description}</p>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <Badge className={`text-xs ${getBadgeColor(material.type)}`}>
                    {material.type.toUpperCase()}
                  </Badge>
                  {material.size && (
                    <span className="text-xs text-gray-500">{material.size}</span>
                  )}
                </div>
              </div>
            </div>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => handleDownload(material)}
              className="flex-shrink-0 w-full sm:w-auto"
            >
              {material.type === 'pdf' ? (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </>
              ) : (
                <>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open
                </>
              )}
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
