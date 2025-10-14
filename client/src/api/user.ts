import api from './api';

// Description: Get user profile information
// Endpoint: GET /api/user/profile
// Request: {}
// Response: { user: { _id: string, name: string, email: string, avatar: string, role: string, bio: string, skills: string[], portfolio: any[], youtubeChannels: any[], verified: boolean } }
export const getUserProfile = () => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        user: {
          _id: '507f1f77bcf86cd799439011',
          name: 'John Creator',
          email: 'john@example.com',
          avatar: '/placeholder-avatar.jpg',
          role: 'creator',
          bio: 'Passionate YouTube creator focused on tech reviews and tutorials.',
          location: 'San Francisco, CA',
          timezone: 'UTC-8',
          experience: 'intermediate',
          skills: ['Video Editing', 'Color Grading', 'Motion Graphics', 'Audio Mixing'],
          portfolio: [
            {
              title: 'iPhone 15 Pro Review',
              description: 'Comprehensive review of the latest iPhone',
              url: 'https://youtube.com/watch?v=example1',
              thumbnail: '/placeholder-video.jpg'
            }
          ],
          youtubeChannels: [
            {
              _id: '507f1f77bcf86cd799439012',
              name: 'TechReviews Pro',
              subscriberCount: 125000,
              totalViews: 5200000,
              verified: true,
              thumbnail: '/placeholder-channel.jpg'
            }
          ],
          verified: true
        }
      });
    }, 500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.get('/api/user/profile');
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
}

// Description: Update user profile
// Endpoint: PUT /api/user/profile
// Request: { name: string, bio: string, location: string, timezone: string, role: string, experience: string, skills: string[], portfolio: any[] }
// Response: { success: boolean, message: string, user: any }
export const updateProfile = (data: any) => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Profile updated successfully',
        user: { ...data, _id: '507f1f77bcf86cd799439011' }
      });
    }, 1000);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.put('/api/user/profile', data);
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
}

// Description: Connect YouTube channel
// Endpoint: POST /api/user/youtube/connect
// Request: {}
// Response: { success: boolean, message: string, channel: any }
export const connectYouTubeChannel = () => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'YouTube channel connected successfully',
        channel: {
          _id: '507f1f77bcf86cd799439013',
          name: 'New Channel',
          subscriberCount: 50000,
          verified: false
        }
      });
    }, 1500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.post('/api/user/youtube/connect');
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
}