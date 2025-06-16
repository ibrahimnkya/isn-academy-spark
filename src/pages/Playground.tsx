import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Lightbulb, CheckCircle, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { CodeEditor } from "@/components/CodeEditor";
import { ProgressTracker } from "@/components/ProgressTracker";

const Playground = () => {
  const [code, setCode] = useState(`# Farm Produce Calculator
# Calculate the total value of crops

maize_price = 100  # TZS per kg
beans_price = 150  # TZS per kg

maize_quantity = 50  # kg
beans_quantity = 30  # kg

total_maize_value = maize_price * maize_quantity
total_beans_value = beans_price * beans_quantity
total_value = total_maize_value + total_beans_value

print(f"Maize value: {total_maize_value} TZS")
print(f"Beans value: {total_beans_value} TZS")
print(f"Total farm value: {total_value} TZS`);

  const [output, setOutput] = useState("");
  const [aiInsights, setAiInsights] = useState([
    {
      type: "suggestion",
      message: "Consider adding input validation to handle negative quantities",
      severity: "medium"
    },
    {
      type: "improvement",
      message: "You could create a function to calculate crop values for better code reusability",
      severity: "low"
    }
  ]);

  const exercises = [
    {
      id: "variables-1",
      title: "Create Your First Variables",
      difficulty: "beginner" as const,
      description: "Create variables for your name, age, and favorite crop. Print them using print().",
      completed: false,
      points: 10
    },
    {
      id: "math-1",
      title: "Basic Math Operations",
      difficulty: "beginner" as const,
      description: "Calculate the total cost of 5 kg maize at 100 TZS per kg using variables.",
      completed: false,
      points: 15
    },
    {
      id: "strings-1",
      title: "Working with Text",
      difficulty: "beginner" as const,
      description: "Create a greeting message using string formatting (f-strings).",
      completed: false,
      points: 15
    },
    {
      id: "conditions-1",
      title: "Making Decisions",
      difficulty: "beginner" as const,
      description: "Write an if-else statement to check if crop price is above 100 TZS.",
      completed: false,
      points: 20
    },
    {
      id: "loops-1",
      title: "Repeating Actions",
      difficulty: "intermediate" as const,
      description: "Use a for loop to calculate total value for multiple crops.",
      completed: false,
      points: 25
    }
  ];

  const runCode = () => {
    try {
      // Simple Python-like execution simulation
      const lines = code.split('\n');
      let result = "";
      let variables: { [key: string]: any } = {};
      
      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith('#') || !trimmed) continue;
        
        // Simple variable assignment
        if (trimmed.includes(' = ') && !trimmed.startsWith('print')) {
          const [varName, value] = trimmed.split(' = ');
          const cleanVarName = varName.trim();
          let cleanValue = value.trim();
          
          // Remove comments
          if (cleanValue.includes('#')) {
            cleanValue = cleanValue.split('#')[0].trim();
          }
          
          // Evaluate simple expressions
          if (cleanValue.includes('*') || cleanValue.includes('+')) {
            try {
              // Replace variable names with their values
              let expression = cleanValue;
              Object.keys(variables).forEach(key => {
                expression = expression.replace(new RegExp(`\\b${key}\\b`, 'g'), variables[key]);
              });
              variables[cleanVarName] = eval(expression);
            } catch {
              variables[cleanVarName] = cleanValue;
            }
          } else {
            variables[cleanVarName] = isNaN(Number(cleanValue)) ? cleanValue.replace(/"/g, '') : Number(cleanValue);
          }
        }
        
        // Simple print statement
        if (trimmed.startsWith('print(')) {
          let printContent = trimmed.match(/print\((.*)\)/)?.[1] || '';
          
          // Handle f-strings
          if (printContent.startsWith('f"') && printContent.endsWith('"')) {
            let fString = printContent.slice(2, -1);
            Object.keys(variables).forEach(key => {
              fString = fString.replace(`{${key}}`, variables[key]);
            });
            result += fString + '\n';
          } else {
            // Simple string or variable
            printContent = printContent.replace(/"/g, '');
            if (variables[printContent]) {
              result += variables[printContent] + '\n';
            } else {
              result += printContent + '\n';
            }
          }
        }
      }
      
      setOutput(result || "Code executed successfully!");
    } catch (error) {
      setOutput(`Error: ${error}`);
    }
    
    // Simulate AI analysis
    setTimeout(() => {
      setAiInsights([
        {
          type: "success",
          message: "Great! Your code runs successfully and follows Python best practices.",
          severity: "low"
        },
        {
          type: "suggestion",
          message: "Try adding error handling with try-except blocks for user input.",
          severity: "medium"
        },
        {
          type: "improvement",
          message: "Consider using a dictionary to store crop data for easier management.",
          severity: "low"
        }
      ]);
    }, 1500);
  };

  const handleExerciseComplete = (exerciseId: string) => {
    console.log(`Exercise ${exerciseId} completed!`);
    // Could trigger celebratory animation or unlock next exercise
  };

  const handleExerciseRevisit = (exerciseId: string) => {
    console.log(`Revisiting exercise ${exerciseId}`);
    // Load specific exercise code template
    const exerciseTemplates: { [key: string]: string } = {
      "variables-1": `# Exercise: Create Your First Variables
# Create variables for your name, age, and favorite crop

name = "Your Name"
age = 25
favorite_crop = "Maize"

print(f"My name is {name}")
print(f"I am {age} years old")
print(f"My favorite crop is {favorite_crop}")`,
      "math-1": `# Exercise: Basic Math Operations
# Calculate the total cost of 5 kg maize at 100 TZS per kg

maize_price = 100  # TZS per kg
quantity = 5  # kg
total_cost = maize_price * quantity

print(f"Total cost: {total_cost} TZS")`,
      "strings-1": `# Exercise: Working with Text
# Create a greeting message using f-strings

farmer_name = "John"
farm_location = "Mwanza"

greeting = f"Hello {farmer_name} from {farm_location}!"
print(greeting)`
    };
    
    if (exerciseTemplates[exerciseId]) {
      setCode(exerciseTemplates[exerciseId]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/course" className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Back to Course</span>
                <span className="sm:hidden">Back</span>
              </Link>
              <h1 className="text-xl sm:text-2xl font-bold text-blue-600">AI Coding Playground</h1>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Badge className="bg-green-100 text-green-800 text-xs">AI Powered</Badge>
              <Button variant="outline" size="sm" className="hidden sm:inline-flex">Save Code</Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="grid lg:grid-cols-4 gap-4 lg:gap-8">
          {/* Sidebar - Progress & Exercises */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <ProgressTracker 
              exercises={exercises} 
              onExerciseComplete={handleExerciseComplete}
              onExerciseRevisit={handleExerciseRevisit}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            <Tabs defaultValue="code" className="space-y-4 sm:space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="code" className="text-xs sm:text-sm">Code Editor</TabsTrigger>
                <TabsTrigger value="output" className="text-xs sm:text-sm">Output</TabsTrigger>
                <TabsTrigger value="insights" className="text-xs sm:text-sm">AI Insights</TabsTrigger>
              </TabsList>

              <TabsContent value="code">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">Python Code Editor</CardTitle>
                    <CardDescription className="text-sm">Write and test your Python code with real-time AI feedback</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CodeEditor
                      initialCode={code}
                      onCodeChange={setCode}
                      onRun={runCode}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="output">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">Code Output</CardTitle>
                    <CardDescription className="text-sm">See the results of your code execution</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm min-h-[300px] sm:min-h-[400px] overflow-x-auto">
                      {output ? (
                        <pre className="whitespace-pre-wrap break-words">{output}</pre>
                      ) : (
                        <span className="text-gray-500">Click "Run Code" to see output...</span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="insights">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl">
                      <Lightbulb className="h-5 w-5 text-yellow-500" />
                      <span>AI-Powered Insights</span>
                    </CardTitle>
                    <CardDescription className="text-sm">
                      Get real-time suggestions and improvements for your code
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {aiInsights.map((insight, index) => (
                      <div key={index} className="flex items-start space-x-3 p-4 border rounded-lg">
                        <div className="flex-shrink-0">
                          {insight.type === 'success' && (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          )}
                          {insight.type === 'suggestion' && (
                            <AlertCircle className="h-5 w-5 text-yellow-500" />
                          )}
                          {insight.type === 'improvement' && (
                            <Lightbulb className="h-5 w-5 text-blue-500" />
                          )}
                        </div>
                        <div className="flex-grow min-w-0">
                          <p className="text-sm break-words">{insight.message}</p>
                          <Badge 
                            variant="secondary" 
                            className={`mt-2 text-xs ${
                              insight.severity === 'high' ? 'bg-red-100 text-red-800' :
                              insight.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }`}
                          >
                            {insight.severity} priority
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Quick Actions */}
            <Card className="mt-4 sm:mt-6">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  <Button variant="outline" className="w-full text-xs sm:text-sm">
                    Load Template
                  </Button>
                  <Button variant="outline" className="w-full text-xs sm:text-sm">
                    Share Code
                  </Button>
                  <Button variant="outline" className="w-full text-xs sm:text-sm">
                    Export Project
                  </Button>
                  <Button variant="outline" className="w-full text-xs sm:text-sm">
                    Get Help
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playground;
