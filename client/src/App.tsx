import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "./components/ui/theme-provider"
import { Toaster } from "./components/ui/toaster"
import { AuthProvider } from "./contexts/AuthContext"
import { Login } from "./pages/Login"
import { Register } from "./pages/Register"
import { ProtectedRoute } from "./components/ProtectedRoute"
import { Layout } from "./components/Layout"
import { BlankPage } from "./pages/BlankPage"
import { Home } from "./pages/Home"
import { CreatorDashboard } from "./pages/CreatorDashboard"
import { EditorDashboard } from "./pages/EditorDashboard"
import { ProjectDetails } from "./pages/ProjectDetails"
import { CreateProject } from "./pages/CreateProject"
import { Profile } from "./pages/Profile"
import { Messages } from "./pages/Messages"

function App() {
  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="light" storageKey="ui-theme">
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
              <Route index element={<Home />} />
              <Route path="creator-dashboard" element={<CreatorDashboard />} />
              <Route path="editor-dashboard" element={<EditorDashboard />} />
              <Route path="project/:id" element={<ProjectDetails />} />
              <Route path="create-project" element={<CreateProject />} />
              <Route path="profile" element={<Profile />} />
              <Route path="messages" element={<Messages />} />
            </Route>
            <Route path="*" element={<BlankPage />} />
          </Routes>
        </Router>
        <Toaster />
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App