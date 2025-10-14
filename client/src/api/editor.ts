import api from './api';

// Description: Get editor dashboard data
// Endpoint: GET /api/editor/dashboard
// Request: {}
// Response: { stats: any, activeProjects: any[], completedProjects: any[] }
export const getEditorDashboard = () => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        stats: {
          totalEarnings: 12450,
          activeProjects: 4,
          avgRating: 4.9,
          completedProjects: 23,
          totalReviews: 18
        },
        activeProjects: [
          {
            _id: '507f1f77bcf86cd799439041',
            title: 'Gaming Setup Tour 2024',
            description: 'Complete setup showcase with RGB lighting',
            status: 'in_progress',
            progress: 45,
            budget: 750,
            deadline: '2024-02-20T00:00:00.000Z',
            creator: {
              name: 'GameMaster Pro',
              avatar: '/placeholder-creator.jpg'
            }
          },
          {
            _id: '507f1f77bcf86cd799439042',
            title: 'Cooking Tutorial: Italian Pasta',
            description: 'Step-by-step pasta making tutorial',
            status: 'review',
            progress: 85,
            budget: 400,
            deadline: '2024-02-12T00:00:00.000Z',
            creator: {
              name: 'Chef Maria',
              avatar: '/placeholder-creator2.jpg'
            }
          }
        ],
        completedProjects: [
          {
            _id: '507f1f77bcf86cd799439043',
            title: 'Travel Vlog: Tokyo Adventure',
            description: 'Week-long journey through Tokyo',
            budget: 900,
            rating: 5,
            creator: {
              name: 'Travel Buddy',
              avatar: '/placeholder-creator3.jpg'
            }
          }
        ]
      });
    }, 800);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.get('/api/editor/dashboard');
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
}

// Description: Get available projects for editors
// Endpoint: GET /api/editor/projects/available
// Request: {}
// Response: { projects: any[] }
export const getAvailableProjects = () => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        projects: [
          {
            _id: '507f1f77bcf86cd799439051',
            title: 'Smartphone Camera Comparison',
            description: 'Detailed comparison of flagship phone cameras with sample footage',
            videoType: 'review',
            budget: 850,
            deadline: '2024-03-01T00:00:00.000Z',
            createdAt: '2024-01-18T00:00:00.000Z',
            requirements: ['Color Grading', 'Motion Graphics', 'Audio Sync'],
            proposalCount: 12,
            creator: {
              name: 'TechGuru Reviews',
              avatar: '/placeholder-creator4.jpg',
              subscriberCount: 250000,
              rating: 4.7,
              verified: true
            }
          },
          {
            _id: '507f1f77bcf86cd799439052',
            title: 'Morning Routine Vlog',
            description: 'Aesthetic morning routine with calming music and smooth transitions',
            videoType: 'vlog',
            budget: 300,
            deadline: '2024-02-25T00:00:00.000Z',
            createdAt: '2024-01-19T00:00:00.000Z',
            requirements: ['Color Correction', 'Music Sync', 'Smooth Transitions'],
            proposalCount: 8,
            creator: {
              name: 'Lifestyle Luna',
              avatar: '/placeholder-creator5.jpg',
              subscriberCount: 95000,
              rating: 4.9,
              verified: true
            }
          },
          {
            _id: '507f1f77bcf86cd799439053',
            title: 'Minecraft Build Tutorial',
            description: 'Epic castle build with time-lapse and commentary',
            videoType: 'gaming',
            budget: 600,
            deadline: '2024-02-28T00:00:00.000Z',
            createdAt: '2024-01-17T00:00:00.000Z',
            requirements: ['Time-lapse Editing', 'Commentary Sync', 'Thumbnail Creation'],
            proposalCount: 15,
            creator: {
              name: 'BlockCraft Master',
              avatar: '/placeholder-creator6.jpg',
              subscriberCount: 180000,
              rating: 4.6,
              verified: false
            }
          }
        ]
      });
    }, 700);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.get('/api/editor/projects/available');
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
}