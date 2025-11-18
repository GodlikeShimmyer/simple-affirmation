import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Video, Image, Palette, LogOut } from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const tools = [
    {
      title: 'Video Editor',
      description: 'AI-powered video editing with music, transitions, and effects',
      icon: Video,
      path: '/video-editor',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Thumbnail Creator',
      description: 'Create stunning thumbnails with customizable templates',
      icon: Image,
      path: '/thumbnail-creator',
      gradient: 'from-cyan-500 to-green-500',
    },
    {
      title: 'Graphic Designer',
      description: 'Design logos, social posts, brochures, and more',
      icon: Palette,
      path: '/graphic-designer',
      gradient: 'from-green-500 to-blue-500',
    },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            GodlikeCreation
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Welcome, {user?.name}</span>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Your Creative Studio
          </h2>
          <p className="text-xl text-muted-foreground">
            All tools unlocked. Choose your creative tool below.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {tools.map((tool, index) => (
            <Card
              key={index}
              className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 cursor-pointer group"
              onClick={() => navigate(tool.path)}
            >
              <CardHeader>
                <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${tool.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <tool.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl">{tool.title}</CardTitle>
                <CardDescription className="text-base">{tool.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-gradient-primary">
                  Launch Tool
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            💡 All features are fully unlocked. No limitations until you choose to subscribe!
          </p>
        </div>
      </main>
    </div>
  );
}
