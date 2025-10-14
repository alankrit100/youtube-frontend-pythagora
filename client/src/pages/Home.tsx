import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Play, Users, Shield, Zap, Star, ArrowRight, Youtube, CheckCircle } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { getUserProfile } from "@/api/user"
import { useToast } from "@/hooks/useToast"

export function Home() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [userProfile, setUserProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        console.log("Fetching user profile...")
        const response = await getUserProfile()
        setUserProfile(response.user)
      } catch (error: any) {
        console.error("Error fetching user profile:", error)
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchUserProfile()
  }, [toast])

  const handleRoleSelection = (role: 'creator' | 'editor') => {
    console.log(`User selected role: ${role}`)
    if (role === 'creator') {
      navigate('/creator-dashboard')
    } else {
      navigate('/editor-dashboard')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-6 py-12">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
            YouTube Mediator
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Connect YouTube creators with professional video editors in a secure, streamlined platform
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-6 text-lg"
            onClick={() => handleRoleSelection('creator')}
          >
            <Youtube className="mr-2 h-5 w-5" />
            I'm a Creator
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="border-2 border-purple-500 text-purple-600 hover:bg-purple-50 px-8 py-6 text-lg"
            onClick={() => handleRoleSelection('editor')}
          >
            <Play className="mr-2 h-5 w-5" />
            I'm an Editor
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-center">Why Choose YouTube Mediator?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200 hover:shadow-lg transition-all duration-300">
            <CardHeader className="text-center">
              <Youtube className="h-12 w-12 text-red-600 mx-auto mb-2" />
              <CardTitle className="text-red-800">YouTube Integration</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-red-700">
                Seamless connection with your YouTube channels and analytics
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-lg transition-all duration-300">
            <CardHeader className="text-center">
              <Shield className="h-12 w-12 text-green-600 mx-auto mb-2" />
              <CardTitle className="text-green-800">Secure Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-green-700">
                Escrow system ensures safe transactions for both parties
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-lg transition-all duration-300">
            <CardHeader className="text-center">
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-2" />
              <CardTitle className="text-blue-800">Verified Professionals</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-blue-700">
                Work with verified editors and creators with proven track records
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-lg transition-all duration-300">
            <CardHeader className="text-center">
              <Zap className="h-12 w-12 text-purple-600 mx-auto mb-2" />
              <CardTitle className="text-purple-800">Fast Delivery</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-purple-700">
                Streamlined workflow for quick project completion
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-center">Success Stories</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-br from-orange-50 to-yellow-50 border-orange-200">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src="/placeholder-creator.jpg" />
                  <AvatarFallback>TC</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="flex items-center gap-2">
                    TechCreator Pro
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </CardTitle>
                  <CardDescription>1.2M Subscribers</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                "Found an amazing editor who understands my style perfectly. My video quality improved dramatically!"
              </p>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-teal-50 border-green-200">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src="/placeholder-editor.jpg" />
                  <AvatarFallback>VE</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="flex items-center gap-2">
                    VideoEdit Master
                    <Badge variant="secondary">Top Editor</Badge>
                  </CardTitle>
                  <CardDescription>Professional Editor</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                "This platform helped me connect with amazing creators and build a sustainable freelance business."
              </p>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center space-y-6 py-12 bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl">
        <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Join thousands of creators and editors already using YouTube Mediator
        </p>
        <Button 
          size="lg"
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-6 text-lg"
          onClick={() => navigate('/profile')}
        >
          Complete Your Profile
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </section>
    </div>
  )
}