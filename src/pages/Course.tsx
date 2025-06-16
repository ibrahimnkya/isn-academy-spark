
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { PlayCircle, BookOpen, Code, Calendar, Github, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Course = () => {
  const [completedLessons, setCompletedLessons] = useState(2);
  const totalLessons = 12;
  const progress = (completedLessons / totalLessons) * 100;

  const weeks = [
    {
      week: 1,
      title: "Python Basics & Environment Setup",
      status: "completed",
      videoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8",
      description: "Learn Python fundamentals and set up your development environment",
      materials: [
        "Python Installation Guide",
        "VS Code Setup Instructions", 
        "Farm Produce Tracker Project Starter"
      ]
    },
    {
      week: 2,
      title: "Control Structures",
      status: "completed",
      videoUrl: "https://www.youtube.com/embed/PqFKRqpHrjw",
      description: "Master conditionals, loops, and basic functions",
      materials: [
        "Control Flow Exercises",
        "Debugging Guide",
        "Enhanced Farm Tracker Code"
      ]
    },
    {
      week: 3,
      title: "Data Structures",
      status: "current",
      videoUrl: "https://www.youtube.com/embed/W8KRzm-HUcc",
      description: "Work with lists, dictionaries, and error handling",
      materials: [
        "Data Structure Examples",
        "Error Handling Best Practices",
        "Price Calculator Project"
      ]
    },
    {
      week: 4,
      title: "Git & GitHub",
      status: "locked",
      videoUrl: "https://www.youtube.com/embed/RGOj5yH7evk",
      description: "Version control and collaborative development",
      materials: [
        "Git Commands Cheat Sheet",
        "GitHub Workflow Guide",
        "Repository Setup Tutorial"
      ]
    }
  ];

  const upcomingMeetings = [
    {
      title: "Week 3 Q&A Session",
      date: "June 18, 2025",
      time: "6:00 PM EAT",
      meetLink: "https://meet.google.com/abc-defg-hij"
    },
    {
      title: "Code Review Session", 
      date: "June 20, 2025",
      time: "5:30 PM EAT",
      meetLink: "https://meet.google.com/xyz-uvwx-yz"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Home</span>
              </Link>
              <h1 className="text-2xl font-bold text-blue-600">ISN Academy</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/playground" className="text-gray-600 hover:text-blue-600 transition-colors">
                AI Playground
              </Link>
              <Button variant="outline">My Profile</Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Course Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Basic Software Developer Course</h1>
          <p className="text-gray-600 mb-4">Master Python, SQL, and GitHub with East African context</p>
          
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Your Progress</h3>
              <Badge variant="secondary">{completedLessons}/{totalLessons} completed</Badge>
            </div>
            <Progress value={progress} className="mb-2" />
            <p className="text-sm text-gray-600">{progress.toFixed(0)}% complete</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="lessons" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="lessons">Lessons</TabsTrigger>
                <TabsTrigger value="exercises">Exercises</TabsTrigger>
                <TabsTrigger value="projects">Projects</TabsTrigger>
              </TabsList>

              <TabsContent value="lessons" className="space-y-6">
                {weeks.map((week) => (
                  <Card key={week.week} className={`${week.status === 'current' ? 'ring-2 ring-blue-500' : ''}`}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="flex items-center space-x-2">
                            <span>Week {week.week}: {week.title}</span>
                            {week.status === 'completed' && (
                              <Badge className="bg-green-100 text-green-800">Completed</Badge>
                            )}
                            {week.status === 'current' && (
                              <Badge className="bg-blue-100 text-blue-800">Current</Badge>
                            )}
                            {week.status === 'locked' && (
                              <Badge variant="secondary">Locked</Badge>
                            )}
                          </CardTitle>
                          <CardDescription>{week.description}</CardDescription>
                        </div>
                        {week.status !== 'locked' && (
                          <Button size="sm" variant={week.status === 'completed' ? 'outline' : 'default'}>
                            <PlayCircle className="h-4 w-4 mr-2" />
                            {week.status === 'completed' ? 'Review' : 'Watch'}
                          </Button>
                        )}
                      </div>
                    </CardHeader>
                    {week.status !== 'locked' && (
                      <CardContent>
                        <div className="aspect-video bg-gray-100 rounded-lg mb-4">
                          <iframe
                            src={week.videoUrl}
                            title={`Week ${week.week} Video`}
                            className="w-full h-full rounded-lg"
                            allowFullScreen
                          />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Course Materials:</h4>
                          <ul className="space-y-1">
                            {week.materials.map((material, index) => (
                              <li key={index} className="flex items-center space-x-2">
                                <BookOpen className="h-4 w-4 text-gray-500" />
                                <a href="#" className="text-blue-600 hover:underline text-sm">
                                  {material}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="exercises" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Practice Exercises</CardTitle>
                    <CardDescription>Hands-on coding exercises to reinforce your learning</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-semibold">Farm Produce Calculator</h4>
                          <p className="text-sm text-gray-600">Create a calculator for crop pricing</p>
                        </div>
                        <Link to="/playground">
                          <Button size="sm">
                            <Code className="h-4 w-4 mr-2" />
                            Start Coding
                          </Button>
                        </Link>
                      </div>
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-semibold">Data Structure Practice</h4>
                          <p className="text-sm text-gray-600">Work with lists and dictionaries</p>
                        </div>
                        <Link to="/playground">
                          <Button size="sm" variant="outline">
                            <Code className="h-4 w-4 mr-2" />
                            Practice
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="projects" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Course Projects</CardTitle>
                    <CardDescription>Build real-world applications with East African context</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-semibold mb-2">Farm Produce Tracker</h4>
                        <p className="text-sm text-gray-600 mb-4">
                          Track crop inventory, prices, and market values for local farming businesses
                        </p>
                        <div className="flex items-center space-x-2">
                          <Button size="sm">
                            <Github className="h-4 w-4 mr-2" />
                            View on GitHub
                          </Button>
                          <Badge className="bg-green-100 text-green-800">In Progress</Badge>
                        </div>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-semibold mb-2">Mobile Money Logger</h4>
                        <p className="text-sm text-gray-600 mb-4">
                          Transaction tracking system inspired by M-Pesa and Airtel Money
                        </p>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline" disabled>
                            <Github className="h-4 w-4 mr-2" />
                            Coming Soon
                          </Button>
                          <Badge variant="secondary">Locked</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Meetings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Upcoming Sessions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingMeetings.map((meeting, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <h4 className="font-semibold text-sm">{meeting.title}</h4>
                    <p className="text-xs text-gray-600">{meeting.date} at {meeting.time}</p>
                    <Button 
                      size="sm" 
                      className="mt-2 w-full"
                      onClick={() => window.open(meeting.meetLink, '_blank')}
                    >
                      Join Meeting
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link to="/playground">
                  <Button variant="outline" className="w-full justify-start">
                    <Code className="h-4 w-4 mr-2" />
                    AI Coding Playground
                  </Button>
                </Link>
                <Button variant="outline" className="w-full justify-start">
                  <Github className="h-4 w-4 mr-2" />
                  GitHub Repository
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Course Resources
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Course;
