import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, DollarSign, Star, Clock, MessageSquare, TrendingUp, Users, Youtube, CheckCircle, Eye } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { getEditorDashboard, getAvailableProjects } from "@/api/editor"
import { useToast } from "@/hooks/useToast"

export function EditorDashboard() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [dashboardData, setDashboardData] = useState<any>(null)
  const [availableProjects, setAvailableProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [budgetFilter, setBudgetFilter] = useState("")
  const [typeFilter, setTypeFilter] = useState("")

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        console.log("Fetching editor dashboard data...")
        const [dashboardResponse, projectsResponse] = await Promise.all([
          getEditorDashboard(),
          getAvailableProjects()
        ])
        setDashboardData(dashboardResponse)
        setAvailableProjects(projectsResponse.projects)
      } catch (error: any) {
        console.error("Error fetching dashboard data:", error)
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [toast])

  const filteredProjects = availableProjects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesBudget = !budgetFilter || 
                         (budgetFilter === "low" && project.budget < 500) ||
                         (budgetFilter === "medium" && project.budget >= 500 && project.budget < 1500) ||
                         (budgetFilter === "high" && project.budget >= 1500)
    const matchesType = !typeFilter || project.videoType === typeFilter
    
    return matchesSearch && matchesBudget && matchesType
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Editor Dashboard</h1>
          <p className="text-muted-foreground">Find projects and manage your work</p>
        </div>
        <Button 
          onClick={() => navigate('/profile')}
          className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
        >
          Update Portfolio
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">${dashboardData?.stats.totalEarnings}</div>
            <p className="text-xs text-green-700">+15% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-800">Active Projects</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{dashboardData?.stats.activeProjects}</div>
            <p className="text-xs text-blue-700">2 due this week</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-yellow-800">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-900">{dashboardData?.stats.avgRating}</div>
            <p className="text-xs text-yellow-700">From {dashboardData?.stats.totalReviews} reviews</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-800">Completed Projects</CardTitle>
            <CheckCircle className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">{dashboardData?.stats.completedProjects}</div>
            <p className="text-xs text-purple-700">98% success rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="available" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="available">Available Projects</TabsTrigger>
          <TabsTrigger value="active">My Active Projects</TabsTrigger>
          <TabsTrigger value="completed">Completed Work</TabsTrigger>
        </TabsList>

        <TabsContent value="available" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filter Projects
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                  />
                </div>
                <Select value={budgetFilter} onValueChange={setBudgetFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Budget Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Budgets</SelectItem>
                    <SelectItem value="low">Under $500</SelectItem>
                    <SelectItem value="medium">$500 - $1,500</SelectItem>
                    <SelectItem value="high">$1,500+</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Video Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="tutorial">Tutorial</SelectItem>
                    <SelectItem value="vlog">Vlog</SelectItem>
                    <SelectItem value="gaming">Gaming</SelectItem>
                    <SelectItem value="review">Review</SelectItem>
                    <SelectItem value="educational">Educational</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Available Projects */}
          <div className="space-y-4">
            {filteredProjects.map((project) => (
              <Card key={project._id} className="hover:shadow-lg transition-all duration-300 cursor-pointer"
                    onClick={() => navigate(`/project/${project._id}`)}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{project.title}</CardTitle>
                      <CardDescription className="mt-1">{project.description}</CardDescription>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge variant="outline">{project.videoType}</Badge>
                      <span className="text-2xl font-bold text-green-600">${project.budget}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Creator Info */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={project.creator.avatar} />
                          <AvatarFallback>{project.creator.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{project.creator.name}</span>
                            {project.creator.verified && (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Youtube className="h-3 w-3 text-red-600" />
                              {project.creator.subscriberCount.toLocaleString()} subs
                            </span>
                            <span className="flex items-center gap-1">
                              <Star className="h-3 w-3 text-yellow-500" />
                              {project.creator.rating}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          Due {new Date(project.deadline).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Posted {new Date(project.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    {/* Project Details */}
                    <div className="flex flex-wrap gap-2">
                      {project.requirements.map((req: string, index: number) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {req}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <span className="text-sm text-muted-foreground">
                        {project.proposalCount} proposals submitted
                      </span>
                      <Button>
                        Submit Proposal
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          {dashboardData?.activeProjects.map((project: any) => (
            <Card key={project._id} className="hover:shadow-lg transition-all duration-300 cursor-pointer"
                  onClick={() => navigate(`/project/${project._id}`)}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </div>
                  <Badge variant={project.status === 'in_progress' ? 'default' : 'secondary'}>
                    {project.status.replace('_', ' ')}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={project.creator.avatar} />
                        <AvatarFallback>{project.creator.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {project.creator.name}
                    </span>
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      Due {new Date(project.deadline).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">${project.budget}</span>
                    <Button variant="outline" size="sm">
                      <MessageSquare className="mr-2 h-3 w-3" />
                      Message Creator
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {dashboardData?.completedProjects.map((project: any) => (
            <Card key={project._id} className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </div>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    Completed
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={project.creator.avatar} />
                      <AvatarFallback>{project.creator.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{project.creator.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-3 w-3 ${i < project.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <span className="text-lg font-semibold text-green-600">+${project.budget}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}