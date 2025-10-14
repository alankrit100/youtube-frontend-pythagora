import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from ".././components/ui/separator"
import { ArrowLeft, MessageSquare, Upload, Download, Play, Star, Clock, DollarSign, CheckCircle, AlertCircle } from "lucide-react"
import { getProjectDetails, submitFeedback, approveDeliverable } from "@/api/projects"
import { useToast } from "@/hooks/useToast"

export function ProjectDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { toast } = useToast()
  const [project, setProject] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [feedback, setFeedback] = useState("")
  const [submittingFeedback, setSubmittingFeedback] = useState(false)

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return
      
      try {
        console.log(`Fetching project details for ID: ${id}`)
        const response = await getProjectDetails(id)
        setProject(response.project)
      } catch (error: any) {
        console.error("Error fetching project details:", error)
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchProject()
  }, [id, toast])

  const handleSubmitFeedback = async () => {
    if (!feedback.trim() || !id) return

    setSubmittingFeedback(true)
    try {
      console.log("Submitting feedback...")
      await submitFeedback(id, { feedback })
      
      toast({
        title: "Success",
        description: "Feedback submitted successfully",
      })
      
      setFeedback("")
      // Refresh project data
      const response = await getProjectDetails(id)
      setProject(response.project)
    } catch (error: any) {
      console.error("Error submitting feedback:", error)
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setSubmittingFeedback(false)
    }
  }

  const handleApproveDeliverable = async (deliverableId: string) => {
    if (!id) return

    try {
      console.log(`Approving deliverable: ${deliverableId}`)
      await approveDeliverable(id, deliverableId)
      
      toast({
        title: "Success",
        description: "Deliverable approved successfully",
      })
      
      // Refresh project data
      const response = await getProjectDetails(id)
      setProject(response.project)
    } catch (error: any) {
      console.error("Error approving deliverable:", error)
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-2">Project Not Found</h2>
        <p className="text-muted-foreground mb-4">The project you're looking for doesn't exist.</p>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold">{project.title}</h1>
            <Badge variant={project.status === 'completed' ? 'default' : 'secondary'}>
              {project.status.replace('_', ' ')}
            </Badge>
          </div>
          <p className="text-muted-foreground">{project.description}</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Project Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Project Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Video Type</h4>
                  <Badge variant="outline">{project.videoType}</Badge>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Editing Style</h4>
                  <p className="text-sm text-muted-foreground">{project.style}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Requirements</h4>
                <div className="flex flex-wrap gap-2">
                  {project.requirements.map((req: string, index: number) => (
                    <Badge key={index} variant="secondary">{req}</Badge>
                  ))}
                </div>
              </div>

              {project.referenceVideos && (
                <div>
                  <h4 className="font-semibold mb-2">Reference Videos</h4>
                  <p className="text-sm text-muted-foreground">{project.referenceVideos}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Progress & Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Progress & Timeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Overall Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-3" />
              </div>

              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-muted rounded-lg">
                  <Clock className="h-5 w-5 mx-auto mb-1 text-blue-600" />
                  <p className="text-sm font-medium">Started</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(project.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <AlertCircle className="h-5 w-5 mx-auto mb-1 text-orange-600" />
                  <p className="text-sm font-medium">Deadline</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(project.deadline).toLocaleDateString()}
                  </p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <CheckCircle className="h-5 w-5 mx-auto mb-1 text-green-600" />
                  <p className="text-sm font-medium">Completion</p>
                  <p className="text-xs text-muted-foreground">
                    {project.status === 'completed' ? 'Completed' : 'In Progress'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Deliverables & Files */}
          <Tabs defaultValue="deliverables" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="deliverables">Deliverables</TabsTrigger>
              <TabsTrigger value="assets">Project Assets</TabsTrigger>
              <TabsTrigger value="communication">Messages</TabsTrigger>
            </TabsList>

            <TabsContent value="deliverables" className="space-y-4">
              {project.deliverables?.map((deliverable: any) => (
                <Card key={deliverable._id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{deliverable.title}</CardTitle>
                        <CardDescription>{deliverable.description}</CardDescription>
                      </div>
                      <Badge variant={deliverable.approved ? 'default' : 'secondary'}>
                        {deliverable.approved ? 'Approved' : 'Pending Review'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Button variant="outline" size="sm">
                          <Play className="mr-2 h-3 w-3" />
                          Preview
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="mr-2 h-3 w-3" />
                          Download
                        </Button>
                      </div>
                      {!deliverable.approved && (
                        <Button 
                          size="sm"
                          onClick={() => handleApproveDeliverable(deliverable._id)}
                        >
                          <CheckCircle className="mr-2 h-3 w-3" />
                          Approve
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="assets" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Project Files</CardTitle>
                  <CardDescription>Raw footage, audio, and other assets</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {project.assets?.map((asset: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div>
                          <p className="font-medium">{asset.name}</p>
                          <p className="text-sm text-muted-foreground">{asset.size}</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="communication" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Project Communication</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Message History */}
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {project.messages?.map((message: any, index: number) => (
                      <div key={index} className="flex gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={message.sender.avatar} />
                          <AvatarFallback>{message.sender.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm">{message.sender.name}</span>
                            <span className="text-xs text-muted-foreground">
                              {new Date(message.timestamp).toLocaleString()}
                            </span>
                          </div>
                          <p className="text-sm">{message.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Send Message */}
                  <div className="space-y-3">
                    <Textarea
                      placeholder="Type your message or feedback..."
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      rows={3}
                    />
                    <div className="flex justify-end">
                      <Button 
                        onClick={handleSubmitFeedback}
                        disabled={!feedback.trim() || submittingFeedback}
                      >
                        <MessageSquare className="mr-2 h-3 w-3" />
                        {submittingFeedback ? "Sending..." : "Send Message"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Project Info */}
          <Card>
            <CardHeader>
              <CardTitle>Project Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">${project.budget}</div>
                <p className="text-sm text-muted-foreground">Total Budget</p>
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <Badge variant={project.status === 'completed' ? 'default' : 'secondary'}>
                    {project.status.replace('_', ' ')}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Timeline</span>
                  <span className="text-sm">{project.timeline}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Created</span>
                  <span className="text-sm">{new Date(project.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Team Member */}
          <Card>
            <CardHeader>
              <CardTitle>
                {project.userRole === 'creator' ? 'Editor' : 'Creator'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-3 mb-4">
                <Avatar>
                  <AvatarImage src={project.otherUser.avatar} />
                  <AvatarFallback>{project.otherUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{project.otherUser.name}</h3>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-3 w-3 ${i < project.otherUser.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                    ))}
                    <span className="text-sm text-muted-foreground ml-1">
                      ({project.otherUser.reviewCount})
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Button className="w-full" onClick={() => navigate('/messages')}>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
                <Button variant="outline" className="w-full">
                  View Profile
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full">
                <Upload className="mr-2 h-4 w-4" />
                Upload Files
              </Button>
              <Button variant="outline" className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Download All
              </Button>
              {project.status === 'completed' && (
                <Button className="w-full">
                  <Star className="mr-2 h-4 w-4" />
                  Leave Review
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}