import api from './api';

// Description: Get creator dashboard data
// Endpoint: GET /api/creator/dashboard
// Request: {}
// Response: { stats: any, activeProjects: any[], completedProjects: any[], recentActivity: any[] }
export const getCreatorDashboard = () => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        stats: {
          activeProjects: 3,
          totalSpent: 2450,
          editorsWorkedWith: 8,
          avgRating: 4.8
        },
        activeProjects: [
          {
            _id: '507f1f77bcf86cd799439021',
            title: 'iPhone 15 Pro Max Review',
            description: 'Comprehensive review covering all new features',
            status: 'in_progress',
            progress: 65,
            budget: 800,
            deadline: '2024-02-15T00:00:00.000Z',
            editor: {
              name: 'Sarah Editor',
              avatar: '/placeholder-editor.jpg'
            }
          },
          {
            _id: '507f1f77bcf86cd799439022',
            title: 'MacBook Air M3 Unboxing',
            description: 'First impressions and unboxing experience',
            status: 'review',
            progress: 90,
            budget: 500,
            deadline: '2024-02-10T00:00:00.000Z',
            editor: {
              name: 'Mike VideoEdit',
              avatar: '/placeholder-editor2.jpg'
            }
          }
        ],
        completedProjects: [
          {
            _id: '507f1f77bcf86cd799439023',
            title: 'Best Budget Phones 2024',
            description: 'Comparison of top budget smartphones',
            budget: 650,
            rating: 5,
            editor: {
              name: 'Alex ProEdit',
              avatar: '/placeholder-editor3.jpg'
            }
          }
        ],
        recentActivity: [
          {
            title: 'Project Update',
            description: 'Sarah Editor submitted first draft for iPhone review',
            timestamp: '2024-01-20T10:30:00.000Z'
          },
          {
            title: 'New Message',
            description: 'Mike VideoEdit sent you a message about MacBook project',
            timestamp: '2024-01-19T15:45:00.000Z'
          }
        ]
      });
    }, 800);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.get('/api/creator/dashboard');
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
}

// Description: Get connected YouTube channels
// Endpoint: GET /api/creator/youtube/channels
// Request: {}
// Response: { channels: any[] }
export const getYouTubeChannels = () => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        channels: [
          {
            _id: '507f1f77bcf86cd799439031',
            name: 'TechReviews Pro',
            subscriberCount: 125000,
            totalViews: 5200000,
            verified: true,
            thumbnail: '/placeholder-channel.jpg'
          },
          {
            _id: '507f1f77bcf86cd799439032',
            name: 'Gaming Corner',
            subscriberCount: 85000,
            totalViews: 3100000,
            verified: false,
            thumbnail: '/placeholder-channel2.jpg'
          }
        ]
      });
    }, 600);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.get('/api/creator/youtube/channels');
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
}