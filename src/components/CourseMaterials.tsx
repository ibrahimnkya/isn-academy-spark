
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, BookOpen, Video } from "lucide-react";

interface Material {
  id: string;
  title: string;
  type: 'pdf' | 'video' | 'link';
  url: string;
  description: string;
  size?: string;
}

interface CourseMaterialsProps {
  weekNumber: number;
  materials: Material[];
}

export const CourseMaterials = ({ weekNumber, materials }: CourseMaterialsProps) => {
  const handleDownload = (material: Material) => {
    if (material.type === 'pdf') {
      // Simulate PDF download
      const link = document.createElement('a');
      link.href = material.url;
      link.download = `Week_${weekNumber}_${material.title.replace(/\s+/g, '_')}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
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
          <div key={material.id} className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gray-100 rounded">
                {getIcon(material.type)}
              </div>
              <div>
                <h4 className="font-semibold text-sm">{material.title}</h4>
                <p className="text-xs text-gray-600">{material.description}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge className={`text-xs ${getBadgeColor(material.type)}`}>
                    {material.type.toUpperCase()}
                  </Badge>
                  {material.size && (
                    <span className="text-xs text-gray-500">{material.size}</span>
                  )}
                </div>
              </div>
            </div>
            <Button size="sm" variant="outline" onClick={() => handleDownload(material)}>
              <Download className="h-4 w-4 mr-2" />
              {material.type === 'pdf' ? 'Download' : 'Open'}
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
