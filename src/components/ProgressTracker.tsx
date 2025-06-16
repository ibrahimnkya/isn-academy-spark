
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Lock, RotateCcw } from "lucide-react";

interface Exercise {
  id: string;
  title: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  description: string;
  completed: boolean;
  points: number;
}

interface ProgressTrackerProps {
  exercises: Exercise[];
  onExerciseComplete: (exerciseId: string) => void;
  onExerciseRevisit?: (exerciseId: string) => void;
}

export const ProgressTracker = ({ exercises, onExerciseComplete, onExerciseRevisit }: ProgressTrackerProps) => {
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);
  const [totalPoints, setTotalPoints] = useState(0);

  useEffect(() => {
    // Load progress from localStorage
    const saved = localStorage.getItem('exercise_progress');
    if (saved) {
      const progress = JSON.parse(saved);
      setCompletedExercises(progress.completed || []);
      setTotalPoints(progress.points || 0);
    }
  }, []);

  const handleCompleteExercise = (exercise: Exercise) => {
    if (!completedExercises.includes(exercise.id)) {
      const newCompleted = [...completedExercises, exercise.id];
      const newPoints = totalPoints + exercise.points;
      
      setCompletedExercises(newCompleted);
      setTotalPoints(newPoints);
      
      // Save to localStorage
      localStorage.setItem('exercise_progress', JSON.stringify({
        completed: newCompleted,
        points: newPoints
      }));
      
      onExerciseComplete(exercise.id);
    }
  };

  const handleRevisitExercise = (exercise: Exercise) => {
    onExerciseRevisit?.(exercise.id);
    console.log(`Revisiting exercise: ${exercise.title}`);
  };

  const completionPercentage = (completedExercises.length / exercises.length) * 100;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Your Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-sm text-gray-600">
                  {completedExercises.length}/{exercises.length} completed
                </span>
              </div>
              <Progress value={completionPercentage} className="mb-2" />
              <p className="text-xs text-gray-600">{completionPercentage.toFixed(0)}% complete</p>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <span className="font-semibold text-sm">Total Points Earned</span>
              <Badge className="bg-blue-100 text-blue-800">{totalPoints} pts</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Exercises</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {exercises.map((exercise, index) => {
            const isCompleted = completedExercises.includes(exercise.id);
            const isLocked = index > 0 && !completedExercises.includes(exercises[index - 1]?.id);
            
            return (
              <div 
                key={exercise.id}
                className={`p-3 sm:p-4 border rounded-lg ${
                  isCompleted ? 'border-green-500 bg-green-50' : 
                  isLocked ? 'border-gray-300 bg-gray-50 opacity-60' : 
                  'border-blue-500 bg-blue-50'
                }`}
              >
                <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 mb-2">
                  <h4 className="font-semibold text-sm">{exercise.title}</h4>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className={`text-xs ${getDifficultyColor(exercise.difficulty)}`}>
                      {exercise.difficulty}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">{exercise.points} pts</Badge>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3">{exercise.description}</p>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="flex items-center space-x-2">
                    {isCompleted && <CheckCircle className="h-4 w-4 text-green-500" />}
                    {isLocked && <Lock className="h-4 w-4 text-gray-400" />}
                    {!isCompleted && !isLocked && <Clock className="h-4 w-4 text-blue-500" />}
                    <span className="text-xs text-gray-500">
                      {isCompleted ? 'Completed' : isLocked ? 'Locked' : 'Available'}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    {isCompleted && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleRevisitExercise(exercise)}
                        className="flex-1 sm:flex-none"
                      >
                        <RotateCcw className="h-3 w-3 mr-1" />
                        Revisit
                      </Button>
                    )}
                    <Button 
                      size="sm" 
                      onClick={() => handleCompleteExercise(exercise)}
                      disabled={isCompleted || isLocked}
                      variant={isCompleted ? 'outline' : 'default'}
                      className="flex-1 sm:flex-none"
                    >
                      {isCompleted ? 'Completed' : isLocked ? 'Locked' : 'Start Exercise'}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};
