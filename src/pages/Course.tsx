import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { PlayCircle, BookOpen, Code, Calendar, Github, ArrowLeft, CheckCircle, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { CourseMaterials } from "@/components/CourseMaterials";

const Course = () => {
  // For complete beginners, start with 0% progress
  const [completedLessons, setCompletedLessons] = useState(0);
  const totalLessons = 12;
  const progress = (completedLessons / totalLessons) * 100;

  const weeks = [
    {
      week: 1,
      title: "Python Basics & Environment Setup",
      status: "available",
      videoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8",
      description: "Learn Python fundamentals and set up your development environment",
      materials: [
        {
          id: "w1-pdf1",
          title: "Python Installation Guide",
          type: "pdf" as const,
          url: "/materials/python-installation-guide.pdf",
          description: "Step-by-step guide to install Python on Windows, Mac, and Linux",
          size: "2.5 MB"
        },
        {
          id: "w1-pdf2", 
          title: "VS Code Setup Instructions",
          type: "pdf" as const,
          url: "/materials/vscode-setup.pdf",
          description: "Configure VS Code for Python development",
          size: "1.8 MB"
        },
        {
          id: "w1-link1",
          title: "Python Official Tutorial",
          type: "link" as const,
          url: "https://docs.python.org/3/tutorial/",
          description: "Official Python tutorial for beginners"
        }
      ],
      isCompleted: false,
      progress: 0
    },
    {
      week: 2,
      title: "Control Structures",
      status: "locked",
      videoUrl: "https://www.youtube.com/embed/PqFKRqpHrjw",
      description: "Master conditionals, loops, and basic functions",
      materials: [
        {
          id: "w2-pdf1",
          title: "Control Flow Exercises",
          type: "pdf" as const,
          url: "/materials/control-flow-exercises.pdf",
          description: "Practice exercises for if-else statements and loops",
          size: "3.2 MB"
        },
        {
          id: "w2-pdf2",
          title: "Debugging Guide",
          type: "pdf" as const,
          url: "/materials/debugging-guide.pdf",
          description: "Common Python errors and how to fix them",
          size: "2.1 MB"
        }
      ],
      isCompleted: false,
      progress: 0
    },
    {
      week: 3,
      title: "Data Structures",
      status: "locked",
      videoUrl: "https://www.youtube.com/embed/W8KRzm-HUcc",
      description: "Work with lists, dictionaries, and error handling",
      materials: [
        {
          id: "w3-pdf1",
          title: "Data Structure Examples",
          type: "pdf" as const,
          url: "/materials/data-structure-examples.pdf",
          description: "Examples of common data structures",
          size: "1.5 MB"
        },
        {
          id: "w3-pdf2",
          title: "Error Handling Best Practices",
          type: "pdf" as const,
          url: "/materials/error-handling-best-practices.pdf",
          description: "Best practices for handling errors in Python",
          size: "1.2 MB"
        }
      ],
      isCompleted: false,
      progress: 0
    },
    {
      week: 4,
      title: "Git & GitHub",
      status: "locked",
      videoUrl: "https://www.youtube.com/embed/RGOj5yH7evk",
      description: "Version control and collaborative development",
      materials: [
        {
          id: "w4-pdf1",
          title: "Git Commands Cheat Sheet",
          type: "pdf" as const,
          url: "/materials/git-commands-cheat-sheet.pdf",
          description: "A comprehensive guide to Git commands",
          size: "1.0 MB"
        },
        {
          id: "w4-pdf2",
          title: "GitHub Workflow Guide",
          type: "pdf" as const,
          url: "/materials/github-workflow-guide.pdf",
          description: "Best practices for using GitHub",
          size: "0.8 MB"
        }
      ],
      isCompleted: false,
      progress: 0
    }
  ];

  const upcomingMeetings = [
    {
      title: "Week 1 Q&A Session",
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

  const handleLessonComplete = (weekIndex: number) => {
    // This would typically update the backend
    console.log(`Completed lesson ${weekIndex + 1}`);
    setCompletedLessons(prev => Math.max(prev, weekIndex + 1));
  };

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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Basic Software Development Course</h1>
          <p className="text-gray-600 mb-4">Master Python, SQL, and GitHub in East African context</p>
          
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Your Progress</h3>
              <Badge variant="secondary">{completedLessons}/{totalLessons} completed</Badge>
            </div>
            <Progress value={progress} className="mb-2" />
            <p className="text-sm text-gray-600">{progress.toFixed(0)}% complete</p>
            {progress === 0 && (
              <p className="text-sm text-blue-600 mt-2">
                🎯 Welcome! Start with the first lesson below
              </p>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="lessons" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="lessons">Lessons</TabsTrigger>
                <TabsTrigger value="materials">Materials</TabsTrigger>
                <TabsTrigger value="exercises">Exercises</TabsTrigger>
                <TabsTrigger value="projects">Projects</TabsTrigger>
              </TabsList>

              <TabsContent value="lessons" className="space-y-6">
                {weeks.map((week, index) => (
                  <Card key={week.week} className={`${
                    week.status === 'available' ? 'ring-2 ring-blue-500' : 
                    week.status === 'locked' ? 'opacity-75' : ''
                  }`}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="flex items-center space-x-2">
                            <span>Week {week.week}: {week.title}</span>
                            {week.isCompleted && (
                              <Badge className="bg-green-100 text-green-800">Completed</Badge>
                            )}
                            {week.status === 'available' && !week.isCompleted && (
                              <Badge className="bg-blue-100 text-blue-800">Available</Badge>
                            )}
                            {week.status === 'locked' && (
                              <Badge variant="secondary" className="flex items-center space-x-1">
                                <Lock className="h-3 w-3" />
                                <span>Locked</span>
                              </Badge>
                            )}
                          </CardTitle>
                          <CardDescription>{week.description}</CardDescription>
                          <div className="mt-2">
                            <Progress value={week.progress} className="w-32" />
                            <span className="text-xs text-gray-500">{week.progress}% of lesson</span>
                          </div>
                        </div>
                        {week.status === 'available' && (
                          <div className="flex space-x-2">
                            <Button 
                              size="sm" 
                              variant={week.isCompleted ? 'outline' : 'default'}
                              onClick={() => handleLessonComplete(index)}
                            >
                              <PlayCircle className="h-4 w-4 mr-2" />
                              {week.isCompleted ? 'Review' : 'Start'}
                            </Button>
                            {week.isCompleted && (
                              <Button size="sm" variant="ghost">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              </Button>
                            )}
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    {week.status === 'available' && (
                      <CardContent>
                        <div className="aspect-video bg-gray-100 rounded-lg mb-4">
                          <iframe
                            src={week.videoUrl}
                            title={`Week ${week.week} Video`}
                            className="w-full h-full rounded-lg"
                            allowFullScreen
                          />
                        </div>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="materials" className="space-y-6">
                {weeks.map((week) => (
                  week.status === 'available' && week.materials && (
                    <CourseMaterials 
                      key={week.week}
                      weekNumber={week.week}
                      materials={week.materials}
                    />
                  )
                ))}
              </TabsContent>

              <TabsContent value="exercises" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Practical Exercises</CardTitle>
                    <CardDescription>Hands-on coding exercises to reinforce your learning</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-semibold">Farm Produce Calculator</h4>
                          <p className="text-sm text-gray-600">Build a crop price calculator</p>
                        </div>
                        <Link to="/playground">
                          <Button size="sm">
                            <Code className="h-4 w-4 mr-2" />
                            Start Coding
                          </Button>
                        </Link>
                      </div>
                      <div className="flex items-center justify-between p-4 border rounded-lg opacity-50">
                        <div>
                          <h4 className="font-semibold">Data Structure Exercises</h4>
                          <p className="text-sm text-gray-600">Work with lists and dictionaries</p>
                        </div>
                        <Button size="sm" variant="outline" disabled>
                          <Lock className="h-4 w-4 mr-2" />
                          Locked
                        </Button>
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
                          <Button size="sm" disabled={completedLessons === 0}>
                            <Github className="h-4 w-4 mr-2" />
                            {completedLessons === 0 ? 'Start First Lesson' : 'View on GitHub'}
                          </Button>
                          <Badge className={completedLessons > 0 ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}>
                            {completedLessons > 0 ? 'In Progress' : 'Not Started'}
                          </Badge>
                        </div>
                      </div>
                      <div className="p-4 border rounded-lg opacity-50">
                        <h4 className="font-semibold mb-2">Mobile Money Logger</h4>
                        <p className="text-sm text-gray-600 mb-4">
                          Transaction tracking system inspired by M-Pesa and Airtel Money
                        </p>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline" disabled>
                            <Lock className="h-4 w-4 mr-2" />
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
                  <span>Upcoming Meetings</span>
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
                    AI Playground
                  </Button>
                </Link>
                <Button variant="outline" className="w-full justify-start" disabled={completedLessons === 0}>
                  <Github className="h-4 w-4 mr-2" />
                  GitHub Repository
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Course Resources
                </Button>
              </CardContent>
            </Card>

            {/* Beginner Tips */}
            <Card>
              <CardHeader>
                <CardTitle>💡 Beginner Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p className="text-gray-600">
                  • Start slowly - there's no rush!
                </p>
                <p className="text-gray-600">
                  • Practice daily for short periods rather than long sessions
                </p>
                <p className="text-gray-600">
                  • Don't hesitate to ask questions in Google Meet sessions
                </p>
                <p className="text-gray-600">
                  • Use the playground to experiment with new concepts
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Course;
