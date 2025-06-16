
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { PlayCircle, BookOpen, Code, Calendar, Github, ArrowLeft, CheckCircle, Lock } from "lucide-react";
import { Link } from "react-router-dom";

const Course = () => {
  // For complete beginners, start with 0% progress
  const [completedLessons, setCompletedLessons] = useState(0);
  const totalLessons = 12;
  const progress = (completedLessons / totalLessons) * 100;

  const weeks = [
    {
      week: 1,
      title: "Misingi ya Python na Usanidi wa Mazingira",
      status: "available",
      videoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8",
      description: "Jifunze misingi ya Python na kusanidi mazingira ya utengenezaji",
      materials: [
        "Mwongozo wa Usanikishaji wa Python",
        "Maelekezo ya Usanidi wa VS Code", 
        "Mradi wa Kuanza wa Ufuatiliaji wa Mazao ya Kilimo"
      ],
      isCompleted: false,
      progress: 0
    },
    {
      week: 2,
      title: "Muundo wa Udhibiti",
      status: "locked",
      videoUrl: "https://www.youtube.com/embed/PqFKRqpHrjw",
      description: "Shinda masharti, vitanzi, na kazi za msingi",
      materials: [
        "Mazoezi ya Mtiririko wa Udhibiti",
        "Mwongozo wa Kutatua Hitilafu",
        "Nambari ya Ufuatiliaji wa Kilimo Iliyoboreshwa"
      ],
      isCompleted: false,
      progress: 0
    },
    {
      week: 3,
      title: "Miundo ya Data",
      status: "locked",
      videoUrl: "https://www.youtube.com/embed/W8KRzm-HUcc",
      description: "Fanya kazi na orodha, kamusi, na kushughulikia makosa",
      materials: [
        "Mifano ya Muundo wa Data",
        "Mazoea Bora ya Kushughulikia Makosa",
        "Mradi wa Kikokotoo cha Bei"
      ],
      isCompleted: false,
      progress: 0
    },
    {
      week: 4,
      title: "Git na GitHub",
      status: "locked",
      videoUrl: "https://www.youtube.com/embed/RGOj5yH7evk",
      description: "Udhibiti wa toleo na utengenezaji wa ushirikiano",
      materials: [
        "Karatasi ya Ghafla ya Amri za Git",
        "Mwongozo wa Mtiririko wa Kazi za GitHub",
        "Mfumo wa Usanidi wa Hifadhi"
      ],
      isCompleted: false,
      progress: 0
    }
  ];

  const upcomingMeetings = [
    {
      title: "Kipindi cha Swali na Jibu cha Wiki 1",
      date: "Juni 18, 2025",
      time: "6:00 PM EAT",
      meetLink: "https://meet.google.com/abc-defg-hij"
    },
    {
      title: "Kipindi cha Ukaguzi wa Nambari", 
      date: "Juni 20, 2025",
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
                <span>Rudi Nyumbani</span>
              </Link>
              <h1 className="text-2xl font-bold text-blue-600">ISN Academy</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/playground" className="text-gray-600 hover:text-blue-600 transition-colors">
                Eneo la Kuchezea la AI
              </Link>
              <Button variant="outline">Wasifu Wangu</Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Course Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Kozi ya Msingi ya Utengenezaji wa Programu</h1>
          <p className="text-gray-600 mb-4">Shinda Python, SQL, na GitHub kwa muktadha wa Afrika Mashariki</p>
          
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Maendeleo Yako</h3>
              <Badge variant="secondary">{completedLessons}/{totalLessons} iliyokamilishwa</Badge>
            </div>
            <Progress value={progress} className="mb-2" />
            <p className="text-sm text-gray-600">{progress.toFixed(0)}% imekamilika</p>
            {progress === 0 && (
              <p className="text-sm text-blue-600 mt-2">
                🎯 Karibu! Anza na somo la kwanza hapo chini
              </p>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="lessons" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="lessons">Masomo</TabsTrigger>
                <TabsTrigger value="exercises">Mazoezi</TabsTrigger>
                <TabsTrigger value="projects">Miradi</TabsTrigger>
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
                            <span>Wiki {week.week}: {week.title}</span>
                            {week.isCompleted && (
                              <Badge className="bg-green-100 text-green-800">Imekamilishwa</Badge>
                            )}
                            {week.status === 'available' && !week.isCompleted && (
                              <Badge className="bg-blue-100 text-blue-800">Inapatikana</Badge>
                            )}
                            {week.status === 'locked' && (
                              <Badge variant="secondary" className="flex items-center space-x-1">
                                <Lock className="h-3 w-3" />
                                <span>Imefungwa</span>
                              </Badge>
                            )}
                          </CardTitle>
                          <CardDescription>{week.description}</CardDescription>
                          <div className="mt-2">
                            <Progress value={week.progress} className="w-32" />
                            <span className="text-xs text-gray-500">{week.progress}% ya somo</span>
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
                              {week.isCompleted ? 'Rudia' : 'Anza'}
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
                            title={`Video ya Wiki ${week.week}`}
                            className="w-full h-full rounded-lg"
                            allowFullScreen
                          />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Nyenzo za Kozi:</h4>
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
                    <CardTitle>Mazoezi ya Vitendo</CardTitle>
                    <CardDescription>Mazoezi ya coding ya vitendo kuimarisha ujifunzaji wako</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-semibold">Kikokotoo cha Mazao ya Kilimo</h4>
                          <p className="text-sm text-gray-600">Unda kikokotoo cha bei za mazao</p>
                        </div>
                        <Link to="/playground">
                          <Button size="sm">
                            <Code className="h-4 w-4 mr-2" />
                            Anza Coding
                          </Button>
                        </Link>
                      </div>
                      <div className="flex items-center justify-between p-4 border rounded-lg opacity-50">
                        <div>
                          <h4 className="font-semibold">Mazoezi ya Muundo wa Data</h4>
                          <p className="text-sm text-gray-600">Fanya kazi na orodha na kamusi</p>
                        </div>
                        <Button size="sm" variant="outline" disabled>
                          <Lock className="h-4 w-4 mr-2" />
                          Imefungwa
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="projects" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Miradi ya Kozi</CardTitle>
                    <CardDescription>Jenga programu za ulimwengu halisi zenye muktadha wa Afrika Mashariki</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-semibold mb-2">Ufuatiliaji wa Mazao ya Kilimo</h4>
                        <p className="text-sm text-gray-600 mb-4">
                          Fuatilia hifadhi ya mazao, bei, na thamani za soko kwa biashara za kilimo za mitaa
                        </p>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" disabled={completedLessons === 0}>
                            <Github className="h-4 w-4 mr-2" />
                            {completedLessons === 0 ? 'Anza Somo la Kwanza' : 'Angalia kwenye GitHub'}
                          </Button>
                          <Badge className={completedLessons > 0 ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}>
                            {completedLessons > 0 ? 'Inaendelea' : 'Haijanza'}
                          </Badge>
                        </div>
                      </div>
                      <div className="p-4 border rounded-lg opacity-50">
                        <h4 className="font-semibold mb-2">Rekoda ya Fedha za Simu</h4>
                        <p className="text-sm text-gray-600 mb-4">
                          Mfumo wa ufuatiliaji wa miamala ulioongozwa na M-Pesa na Airtel Money
                        </p>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline" disabled>
                            <Lock className="h-4 w-4 mr-2" />
                            Inakuja Hivi Karibuni
                          </Button>
                          <Badge variant="secondary">Imefungwa</Badge>
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
                  <span>Vikao Vijavyo</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingMeetings.map((meeting, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <h4 className="font-semibold text-sm">{meeting.title}</h4>
                    <p className="text-xs text-gray-600">{meeting.date} saa {meeting.time}</p>
                    <Button 
                      size="sm" 
                      className="mt-2 w-full"
                      onClick={() => window.open(meeting.meetLink, '_blank')}
                    >
                      Jiunge na Mkutano
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card>
              <CardHeader>
                <CardTitle>Viungo vya Haraka</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link to="/playground">
                  <Button variant="outline" className="w-full justify-start">
                    <Code className="h-4 w-4 mr-2" />
                    Eneo la Kuchezea la AI
                  </Button>
                </Link>
                <Button variant="outline" className="w-full justify-start" disabled={completedLessons === 0}>
                  <Github className="h-4 w-4 mr-2" />
                  Hifadhi ya GitHub
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Rasilimali za Kozi
                </Button>
              </CardContent>
            </Card>

            {/* Beginner Tips */}
            <Card>
              <CardHeader>
                <CardTitle>💡 Vidokezo kwa Wanaoanza</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p className="text-gray-600">
                  • Anza polepole - hakuna haraka!
                </p>
                <p className="text-gray-600">
                  • Zoezi kila siku kidogo ni bora kuliko muda mrefu mara moja
                </p>
                <p className="text-gray-600">
                  • Usiogope kuuliza maswali katika vikao vya Google Meet
                </p>
                <p className="text-gray-600">
                  • Tumia eneo la kuchezea kujaribu mambo mapya
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
