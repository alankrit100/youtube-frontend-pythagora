import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Upload, Youtube, Plus, X, ArrowLeft } from "lucide-react"
import { format } from "date-fns"
import { useNavigate } from "react-router-dom"
import { createProject, importFromYouTube } from "@/api/projects"
import { useToast } from "@/hooks/useToast"
import { cn } from "@/lib/utils"

export function CreateProject() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [importLoading, setImportLoading] = useState(false)
  const [deadline, setDeadline] = useState<Date>()
  const [requirements, setRequirements] = useState<string[]>([])
  const [newRequirement, setNewRequirement] = useState("")
  const [files, setFiles] = useState<File[]>([])

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    defaultValues: {
      title: "",
      description: "",
      videoType: "",
      budget: "",
      timeline: "",
      style: "",
      referenceVideos: ""
    }
  })

  const handleImportFromYouTube = async () => {
    setImportLoading(true)
    try {
      console.log("Importing project from YouTube...")
      const response = await importFromYouTube()
      
      // Pre-fill form with imported data
      setValue("title", response.title)
      setValue("description", response.description)
      setValue("videoType", response.videoType)
      
      toast({
        title: "Success",
        description: "Project details imported from YouTube successfully",
      })
    } catch (error: any) {
      console.error("Error importing from YouTube:", error)
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setImportLoading(false)
    }
  }

  const addRequirement = () => {
    if (newRequirement.trim() && !requirements.includes(newRequirement.trim())) {
      setRequirements([...requirements, newRequirement.trim()])
      setNewRequirement("")
    }
  }

  const removeRequirement = (req: string) => {
    setRequirements(requirements.filter(r => r !== req))
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || [])
    setFiles([...files, ...selectedFiles])
  }

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index))
  }

  const onSubmit = async (data: any) => {
    if (!deadline) {
      toast({
        title: "Error",
        description: "Please select a deadline",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      console.log("Creating new project...")
      const projectData = {
        ...data,
        deadline: deadline.toISOString(),
        requirements,
        files: files.map(f => f.name) // In real app, upload files first
      }

      await createProject(projectData)
      
      toast({
        title: "Success",
        description: "Project created successfully",
      })
      
      navigate('/creator-dashboard')
    } catch (error: any) {
      console.error("Error creating project:", error)
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => navigate('/creator-dashboard')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Create New Project</h1>
          <p className="text-muted-foreground">Set up your video editing project</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Project Source */}
        <Card>
          <CardHeader>
            <CardTitle>Project Source</CardTitle>
            <CardDescription>
              Start from scratch or import details from an existing YouTube video
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1 h-20 border-2 border-dashed hover:border-red-300 hover:bg-red-50"
                onClick={handleImportFromYouTube}
                disabled={importLoading}
              >
                <div className="text-center">
                  <Youtube className="h-6 w-6 mx-auto mb-2 text-red-600" />
                  <span>{importLoading ? "Importing..." : "Import from YouTube"}</span>
                </div>
              </Button>
              <div className="flex items-center justify-center text-muted-foreground">or</div>
              <div className="flex-1 h-20 flex items-center justify-center border-2 border-dashed rounded-lg">
                <span className="text-muted-foreground">Start from scratch</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
            <CardDescription>
              Provide basic information about your video project
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Project Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Tech Review: iPhone 15 Pro"
                  {...register("title", { required: "Title is required" })}
                />
                {errors.title && (
                  <p className="text-sm text-red-600">{errors.title.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="videoType">Video Type *</Label>
                <Select onValueChange={(value) => setValue("videoType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select video type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tutorial">Tutorial</SelectItem>
                    <SelectItem value="vlog">Vlog</SelectItem>
                    <SelectItem value="gaming">Gaming</SelectItem>
                    <SelectItem value="review">Product Review</SelectItem>
                    <SelectItem value="educational">Educational</SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                    <SelectItem value="music">Music Video</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Project Description *</Label>
              <Textarea
                id="description"
                placeholder="Describe your video project, target audience, and key messages..."
                rows={4}
                {...register("description", { required: "Description is required" })}
              />
              {errors.description && (
                <p className="text-sm text-red-600">{errors.description.message}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Requirements & Style */}
        <Card>
          <CardHeader>
            <CardTitle>Requirements & Style</CardTitle>
            <CardDescription>
              Specify your editing requirements and style preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="style">Editing Style</Label>
              <Select onValueChange={(value) => setValue("style", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select editing style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fast-paced">Fast-paced & Dynamic</SelectItem>
                  <SelectItem value="cinematic">Cinematic & Smooth</SelectItem>
                  <SelectItem value="minimal">Clean & Minimal</SelectItem>
                  <SelectItem value="energetic">High Energy</SelectItem>
                  <SelectItem value="professional">Professional & Corporate</SelectItem>
                  <SelectItem value="creative">Creative & Artistic</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Specific Requirements</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Add a requirement (e.g., Color grading, Motion graphics)"
                  value={newRequirement}
                  onChange={(e) => setNewRequirement(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addRequirement())}
                />
                <Button type="button" onClick={addRequirement}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {requirements.map((req, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {req}
                    <X 
                      className="h-3 w-3 cursor-pointer hover:text-red-600" 
                      onClick={() => removeRequirement(req)}
                    />
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="referenceVideos">Reference Videos (URLs)</Label>
              <Textarea
                id="referenceVideos"
                placeholder="Paste YouTube URLs of videos with similar style you'd like..."
                rows={3}
                {...register("referenceVideos")}
              />
            </div>
          </CardContent>
        </Card>

        {/* Budget & Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>Budget & Timeline</CardTitle>
            <CardDescription>
              Set your budget and project deadline
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="budget">Budget (USD) *</Label>
                <Input
                  id="budget"
                  type="number"
                  placeholder="e.g., 500"
                  {...register("budget", { required: "Budget is required" })}
                />
                {errors.budget && (
                  <p className="text-sm text-red-600">{errors.budget.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label>Deadline *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !deadline && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {deadline ? format(deadline, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={deadline}
                      onSelect={setDeadline}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timeline">Expected Timeline</Label>
              <Select onValueChange={(value) => setValue("timeline", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="How long should this take?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-3-days">1-3 days</SelectItem>
                  <SelectItem value="1-week">1 week</SelectItem>
                  <SelectItem value="2-weeks">2 weeks</SelectItem>
                  <SelectItem value="1-month">1 month</SelectItem>
                  <SelectItem value="flexible">Flexible</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* File Upload */}
        <Card>
          <CardHeader>
            <CardTitle>Project Assets</CardTitle>
            <CardDescription>
              Upload raw footage, audio files, graphics, or other assets
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-2">
                Drag and drop files here, or click to browse
              </p>
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
                accept="video/*,audio/*,image/*"
              />
              <Button type="button" variant="outline" onClick={() => document.getElementById('file-upload')?.click()}>
                Choose Files
              </Button>
            </div>
            
            {files.length > 0 && (
              <div className="space-y-2">
                <Label>Uploaded Files</Label>
                <div className="space-y-2">
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                      <span className="text-sm">{file.name}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Submit */}
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => navigate('/creator-dashboard')}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Project"}
          </Button>
        </div>
      </form>
    </div>
  )
}