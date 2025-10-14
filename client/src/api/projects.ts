import api from './api';

// Description: Create a new project
// Endpoint: POST /api/projects
// Request: { title: string, description: string, videoType: string, budget: number, deadline: string, requirements: string[], style: string, referenceVideos: string, timeline: string }
// Response: { success: boolean, message: string, project: any }
export const createProject = (data: any) => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Project created successfully',
        project: {
          _id: '507f1f77bcf86cd799439061',
          ...data,
          status: 'open',
          createdAt: new Date().toISOString()
        }
      });
    }, 1200);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.post('/api/projects', data);
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
}

// Description: Import project details from YouTube
// Endpoint: POST /api/projects/import-youtube
// Request: {}
// Response: { title: string, description: string, videoType: string }
export const importFromYouTube = () => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        title: 'iPhone 15 Pro Max - Complete Review',
        description: 'In-depth review covering camera, performance, battery life, and new features of the iPhone 15 Pro Max',
        videoType: 'review'
      });
    }, 2000);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.post('/api/projects/import-youtube');
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
}

// Description: Get project details
// Endpoint: GET /api/projects/:id
// Request: {}
// Response: { project: any }
export const getProjectDetails = (id: string) => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        project: {
          _id: id,
          title: 'iPhone 15 Pro Max Review',
          description: 'Comprehensive review covering all new features and improvements',
          videoType: 'review',
          style: 'professional',
          budget: 800,
          deadline: '2024-02-15T00:00:00.000Z',
          createdAt: '2024-01-10T00:00:00.000Z',
          status: 'in_progress',
          progress: 65,
          requirements: ['Color Grading', 'Motion Graphics', 'Audio Mixing', 'Thumbnail Design'],
          referenceVideos: 'https://youtube.com/watch?v=example1, https://youtube.com/watch?v=example2',
          timeline: '2-weeks',
          userRole: 'creator',
          otherUser: {
            name: 'Sarah VideoEdit',
            avatar: '/placeholder-editor.jpg',
            rating: 4.9,
            reviewCount: 24
          },
          deliverables: [
            {
              _id: '507f1f77bcf86cd799439071',
              title: 'First Draft',
              description: 'Initial edit with basic cuts and transitions',
              approved: true,
              submittedAt: '2024-01-25T00:00:00.000Z'
            },
            {
              _id: '507f1f77bcf86cd799439072',
              title: 'Color Graded Version',
              description: 'Version with professional color grading applied',
              approved: false,
              submittedAt: '2024-01-28T00:00:00.000Z'
            }
          ],
          assets: [
            {
              name: 'iPhone_Raw_Footage.mp4',
              size: '2.4 GB',
              type: 'video'
            },
            {
              name: 'Background_Music.mp3',
              size: '8.2 MB',
              type: 'audio'
            }
          ],
          messages: [
            {
              sender: {
                name: 'Sarah VideoEdit',
                avatar: '/placeholder-editor.jpg'
              },
              content: 'Hi! I\'ve uploaded the first draft. Please review and let me know your thoughts.',
              timestamp: '2024-01-25T14:30:00.000Z'
            },
            {
              sender: {
                name: 'You',
                avatar: '/placeholder-creator.jpg'
              },
              content: 'Looks great! Could you adjust the color grading in the outdoor scenes?',
              timestamp: '2024-01-26T09:15:00.000Z'
            }
          ]
        }
      });
    }, 600);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.get(`/api/projects/${id}`);
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
}

// Description: Submit feedback for a project
// Endpoint: POST /api/projects/:id/feedback
// Request: { feedback: string }
// Response: { success: boolean, message: string }
export const submitFeedback = (id: string, data: { feedback: string }) => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Feedback submitted successfully'
      });
    }, 800);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.post(`/api/projects/${id}/feedback`, data);
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
}

// Description: Approve a deliverable
// Endpoint: POST /api/projects/:id/deliverables/:deliverableId/approve
// Request: {}
// Response: { success: boolean, message: string }
export const approveDeliverable = (id: string, deliverableId: string) => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Deliverable approved successfully'
      });
    }, 600);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.post(`/api/projects/${id}/deliverables/${deliverableId}/approve`);
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
}