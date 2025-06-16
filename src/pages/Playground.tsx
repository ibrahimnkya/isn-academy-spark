
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, ArrowLeft, Lightbulb, CheckCircle, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Playground = () => {
  const [code, setCode] = useState(`# Farm Produce Calculator
# Calculate the total value of crops

maize_price = 100  # KES per kg
beans_price = 150  # KES per kg

maize_quantity = 50  # kg
beans_quantity = 30  # kg

total_maize_value = maize_price * maize_quantity
total_beans_value = beans_price * beans_quantity
total_value = total_maize_value + total_beans_value

print(f"Maize value: {total_maize_value} KES")
print(f"Beans value: {total_beans_value} KES")
print(f"Total farm value: {total_value} KES")`);

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

  const runCode = () => {
    // Simulate code execution
    setOutput(`Maize value: 5000 KES
Beans value: 4500 KES
Total farm value: 9500 KES`);
    
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

  const exercises = [
    {
      title: "Basic Variables",
      description: "Create variables for different crop types and prices",
      difficulty: "Beginner",
      status: "completed"
    },
    {
      title: "Control Structures",
      description: "Use if-else statements to categorize crops",
      difficulty: "Beginner", 
      status: "current"
    },
    {
      title: "Functions",
      description: "Create reusable functions for calculations",
      difficulty: "Intermediate",
      status: "locked"
    },
    {
      title: "Data Structures",
      description: "Work with lists and dictionaries",
      difficulty: "Intermediate",
      status: "locked"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/course" className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Course</span>
              </Link>
              <h1 className="text-2xl font-bold text-blue-600">AI Coding Playground</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="bg-green-100 text-green-800">AI Powered</Badge>
              <Button variant="outline">Save Code</Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Exercises */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Practice Exercises</CardTitle>
                <CardDescription>Build your skills step by step</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {exercises.map((exercise, index) => (
                  <div 
                    key={index}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      exercise.status === 'current' ? 'border-blue-500 bg-blue-50' : ''
                    } ${exercise.status === 'locked' ? 'opacity-50' : 'hover:bg-gray-50'}`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-sm">{exercise.title}</h4>
                      {exercise.status === 'completed' && (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{exercise.description}</p>
                    <div className="flex items-center justify-between">
                      <Badge 
                        variant="secondary" 
                        className={`text-xs ${
                          exercise.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {exercise.difficulty}
                      </Badge>
                      <span className="text-xs text-gray-500 capitalize">{exercise.status}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="code" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="code">Code Editor</TabsTrigger>
                <TabsTrigger value="output">Output</TabsTrigger>
                <TabsTrigger value="insights">AI Insights</TabsTrigger>
              </TabsList>

              <TabsContent value="code">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Python Code Editor</CardTitle>
                        <CardDescription>Write and test your Python code with real-time AI feedback</CardDescription>
                      </div>
                      <Button onClick={runCode} className="bg-green-600 hover:bg-green-700">
                        <Play className="h-4 w-4 mr-2" />
                        Run Code
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className="min-h-[400px] font-mono text-sm"
                      placeholder="Write your Python code here..."
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="output">
                <Card>
                  <CardHeader>
                    <CardTitle>Code Output</CardTitle>
                    <CardDescription>See the results of your code execution</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm min-h-[400px]">
                      {output ? (
                        <pre>{output}</pre>
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
                    <CardTitle className="flex items-center space-x-2">
                      <Lightbulb className="h-5 w-5 text-yellow-500" />
                      <span>AI-Powered Insights</span>
                    </CardTitle>
                    <CardDescription>
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
                        <div className="flex-grow">
                          <p className="text-sm">{insight.message}</p>
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
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button variant="outline" className="w-full">
                    Load Template
                  </Button>
                  <Button variant="outline" className="w-full">
                    Share Code
                  </Button>
                  <Button variant="outline" className="w-full">
                    Export Project
                  </Button>
                  <Button variant="outline" className="w-full">
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
