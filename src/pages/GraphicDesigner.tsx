import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Wand2, Download } from 'lucide-react';
import { toast } from 'sonner';

export default function GraphicDesigner() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [prompt, setPrompt] = useState('');
  const [projectName, setProjectName] = useState('');
  const [designType, setDesignType] = useState('logo');
  const [colorScheme, setColorScheme] = useState('vibrant');
  const [style, setStyle] = useState('modern');
  const [format, setFormat] = useState('png');
  const [dimensions, setDimensions] = useState('1024x1024');
  const [isGenerating, setIsGenerating] = useState(false);
  const [jobId, setJobId] = useState<string | null>(null);

  const designTypes = [
    { id: 'logo', name: 'Logo', color: 'from-purple-500 to-pink-500' },
    { id: 'social', name: 'Social Post', color: 'from-blue-500 to-cyan-500' },
    { id: 'flyer', name: 'Flyer', color: 'from-orange-500 to-red-500' },
    { id: 'brochure', name: 'Brochure', color: 'from-green-500 to-teal-500' },
    { id: 'banner', name: 'Banner', color: 'from-yellow-500 to-orange-500' },
    { id: 'poster', name: 'Poster', color: 'from-indigo-500 to-purple-500' },
  ];

  const handleGenerate = async () => {
    if (!projectName || !prompt) {
      toast.error('Please provide a project name and prompt');
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch('/api/design/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectName,
          designType,
          prompt,
          userId: user?.id,
          options: { colorScheme, style, format, dimensions }
        }),
      });

      const data = await response.json();

      if (data.success) {
        setJobId(data.jobId);
        toast.success('Design generation started! Job ID: ' + data.jobId);
      } else {
        toast.error(data.error || 'Generation failed');
      }
    } catch (error) {
      toast.error('Failed to start design generation');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Graphic Designer
          </h1>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-12 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardHeader>
              <CardTitle>Design Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Project Name</Label>
                <Input
                  placeholder="Enter your project name"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="bg-background/50"
                />
              </div>

              <div className="space-y-2">
                <Label>Design Type</Label>
                <div className="grid grid-cols-2 gap-3">
                  {designTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setDesignType(type.id)}
                      className={`p-4 rounded-lg bg-gradient-to-br ${type.color} text-white font-semibold hover:scale-105 transition-transform ${
                        designType === type.id ? 'ring-2 ring-white' : ''
                      }`}
                    >
                      {type.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>AI Prompt</Label>
                <Textarea
                  placeholder="Describe your design (e.g., 'minimalist logo with blue and white, modern tech company')"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={3}
                  className="bg-background/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Color Scheme</Label>
                  <Select value={colorScheme} onValueChange={setColorScheme}>
                    <SelectTrigger className="bg-background/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vibrant">Vibrant</SelectItem>
                      <SelectItem value="pastel">Pastel</SelectItem>
                      <SelectItem value="monochrome">Monochrome</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="light">Light</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Style</Label>
                  <Select value={style} onValueChange={setStyle}>
                    <SelectTrigger className="bg-background/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="modern">Modern</SelectItem>
                      <SelectItem value="vintage">Vintage</SelectItem>
                      <SelectItem value="minimalist">Minimalist</SelectItem>
                      <SelectItem value="bold">Bold</SelectItem>
                      <SelectItem value="elegant">Elegant</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Format</Label>
                  <Select value={format} onValueChange={setFormat}>
                    <SelectTrigger className="bg-background/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="png">PNG</SelectItem>
                      <SelectItem value="jpg">JPG</SelectItem>
                      <SelectItem value="svg">SVG</SelectItem>
                      <SelectItem value="pdf">PDF</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Dimensions</Label>
                  <Select value={dimensions} onValueChange={setDimensions}>
                    <SelectTrigger className="bg-background/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1024x1024">1024x1024 (Square)</SelectItem>
                      <SelectItem value="1920x1080">1920x1080 (16:9)</SelectItem>
                      <SelectItem value="1080x1350">1080x1350 (4:5)</SelectItem>
                      <SelectItem value="2480x3508">A4 (Print)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={handleGenerate} className="w-full bg-gradient-primary" disabled={isGenerating}>
                <Wand2 className="w-4 h-4 mr-2" />
                {isGenerating ? 'Generating...' : 'Generate Design'}
              </Button>

              {jobId && (
                <div className="p-3 bg-primary/10 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    Job ID: <span className="font-mono">{jobId}</span>
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-square bg-background/50 rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Design preview will appear here</p>
              </div>
              <Button className="w-full mt-4" variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download Design
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
