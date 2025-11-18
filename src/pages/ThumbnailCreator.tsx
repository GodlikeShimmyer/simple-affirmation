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

export default function ThumbnailCreator() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [prompt, setPrompt] = useState('');
  const [title, setTitle] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('gaming');
  const [dimensions, setDimensions] = useState('1920x1080');
  const [format, setFormat] = useState('png');
  const [fontSize, setFontSize] = useState('large');
  const [isGenerating, setIsGenerating] = useState(false);
  const [jobId, setJobId] = useState<string | null>(null);

  const templates = [
    { id: 'gaming', name: 'Gaming', color: 'from-purple-500 to-pink-500' },
    { id: 'tech', name: 'Tech', color: 'from-blue-500 to-cyan-500' },
    { id: 'vlog', name: 'Vlog', color: 'from-orange-500 to-red-500' },
    { id: 'tutorial', name: 'Tutorial', color: 'from-green-500 to-teal-500' },
    { id: 'review', name: 'Review', color: 'from-yellow-500 to-orange-500' },
    { id: 'podcast', name: 'Podcast', color: 'from-indigo-500 to-purple-500' },
  ];

  const handleGenerate = async () => {
    if (!title || !prompt) {
      toast.error('Please provide a title and prompt');
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch('/api/thumbnail/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          prompt,
          template: selectedTemplate,
          userId: user?.id,
          options: { dimensions, format, fontSize }
        }),
      });

      const data = await response.json();

      if (data.success) {
        setJobId(data.jobId);
        toast.success('Thumbnail generation started! Job ID: ' + data.jobId);
      } else {
        toast.error(data.error || 'Generation failed');
      }
    } catch (error) {
      toast.error('Failed to start thumbnail generation');
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
            Thumbnail Creator
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
                <Label>Thumbnail Title</Label>
                <Input
                  placeholder="Enter your thumbnail title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-background/50"
                />
              </div>

              <div className="space-y-2">
                <Label>Templates</Label>
                <div className="grid grid-cols-2 gap-3">
                  {templates.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => setSelectedTemplate(template.id)}
                      className={`p-4 rounded-lg bg-gradient-to-br ${template.color} text-white font-semibold hover:scale-105 transition-transform ${
                        selectedTemplate === template.id ? 'ring-2 ring-white' : ''
                      }`}
                    >
                      {template.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>AI Prompt</Label>
                <Textarea
                  placeholder="Describe your thumbnail style (e.g., 'bold text, vibrant colors, eye-catching design')"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={3}
                  className="bg-background/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Dimensions</Label>
                  <Select value={dimensions} onValueChange={setDimensions}>
                    <SelectTrigger className="bg-background/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1920x1080">1920x1080 (YouTube)</SelectItem>
                      <SelectItem value="1280x720">1280x720 (HD)</SelectItem>
                      <SelectItem value="1080x1080">1080x1080 (Square)</SelectItem>
                      <SelectItem value="1200x628">1200x628 (Facebook)</SelectItem>
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
                      <SelectItem value="webp">WebP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Font Size</Label>
                  <Select value={fontSize} onValueChange={setFontSize}>
                    <SelectTrigger className="bg-background/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                      <SelectItem value="xlarge">Extra Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={handleGenerate} className="w-full bg-gradient-primary" disabled={isGenerating}>
                <Wand2 className="w-4 h-4 mr-2" />
                {isGenerating ? 'Generating...' : 'Generate Thumbnail'}
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
              <div className="aspect-video bg-background/50 rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Thumbnail preview will appear here</p>
              </div>
              <Button className="w-full mt-4" variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download Thumbnail
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
