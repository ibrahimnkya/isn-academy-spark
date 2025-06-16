
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Code, Database, GitBranch, Users, Clock, Globe, Video } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const features = [
    {
      icon: <Code className="h-6 w-6" />,
      title: "Python Programming",
      description: "Master Python fundamentals with hands-on projects"
    },
    {
      icon: <Database className="h-6 w-6" />,
      title: "SQL & Databases",
      description: "Learn database design and SQL querying"
    },
    {
      icon: <GitBranch className="h-6 w-6" />,
      title: "Version Control",
      description: "GitHub collaboration and project management"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Live Mentoring",
      description: "30-minute Google Meet sessions weekly"
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "East African Context",
      description: "Projects relevant to local markets and solutions"
    },
    {
      icon: <Video className="h-6 w-6" />,
      title: "Video Learning",
      description: "Curated YouTube tutorials and interactive content"
    }
  ];

  const curriculum = [
    { week: 1, title: "Python Basics & Environment Setup", topics: ["Variables", "Data Types", "Farm Produce Tracker"] },
    { week: 2, title: "Control Structures", topics: ["Conditionals", "Loops", "Functions"] },
    { week: 3, title: "Data Structures", topics: ["Lists", "Dictionaries", "Error Handling"] },
    { week: 4, title: "Git & GitHub", topics: ["Version Control", "Repositories", "Collaboration"] },
    { week: 5, title: "Database Fundamentals", topics: ["SQLite", "SQL Queries", "Data Modeling"] },
    { week: 6, title: "Python + SQL Integration", topics: ["Database Connections", "CRUD Operations"] },
    { week: 7, title: "Advanced Python", topics: ["Modules", "Code Organization", "Best Practices"] },
    { week: 8, title: "APIs & External Data", topics: ["REST APIs", "Weather Data", "Integration"] },
    { week: 9, title: "Final Project Planning", topics: ["Mobile Money Logger", "Project Setup"] },
    { week: 10, title: "Project Development I", topics: ["Implementation", "Testing", "Code Review"] },
    { week: 11, title: "Project Development II", topics: ["Debugging", "Optimization", "Documentation"] },
    { week: 12, title: "Project Presentation", topics: ["Demo", "Deployment", "Portfolio"] }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">ISN Academy</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/course" className="text-gray-600 hover:text-blue-600 transition-colors">
                Course Materials
              </Link>
              <Link to="/playground" className="text-gray-600 hover:text-blue-600 transition-colors">
                AI Playground
              </Link>
              <Button variant="outline">Sign In</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <Badge className="mb-4 bg-green-100 text-green-800 border-green-200">
              🚀 New Course Available
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Master Software Development
              <span className="block text-blue-600">with East African Context</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Learn Python, SQL, and GitHub through practical projects like Farm Produce Tracking and Mobile Money Systems. 
              Perfect for beginners in East Africa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <a href="#pricing">Start Learning Today</a>
              </Button>
              <Button size="lg" variant="outline">
                <a href="#curriculum">View Curriculum</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What You'll Learn</h2>
            <p className="text-xl text-gray-600">Comprehensive curriculum designed for African developers</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section id="curriculum" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">12-Week Curriculum</h2>
            <p className="text-xl text-gray-600">Structured learning path from beginner to job-ready</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {curriculum.map((week) => (
              <Card key={week.week} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">Week {week.week}</Badge>
                    <Clock className="h-4 w-4 text-gray-500" />
                  </div>
                  <CardTitle className="text-lg">{week.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {week.topics.map((topic, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">{topic}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple, Affordable Pricing</h2>
            <p className="text-xl text-gray-600">Invest in your future with our comprehensive course</p>
          </div>
          <div className="max-w-lg mx-auto">
            <Card className="border-2 border-blue-200 shadow-xl">
              <CardHeader className="text-center pb-2">
                <Badge className="w-fit mx-auto mb-4 bg-blue-100 text-blue-800">
                  Most Popular
                </Badge>
                <CardTitle className="text-2xl">Basic Software Developer Course</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-blue-600">$99</span>
                  <span className="text-gray-600">/12 weeks</span>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>12 weeks of structured learning</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Weekly 30-min Google Meet sessions</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>AI-powered coding playground</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>GitHub project tracking</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Certificate of completion</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Lifetime access to materials</span>
                  </li>
                </ul>
                <Link to="/course">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6">
                    Enroll Now
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">ISN Academy</h3>
            <p className="text-gray-400 mb-4">Empowering African developers with practical skills</p>
            <div className="flex justify-center space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
