import api from './api';

// Description: Get all conversations for the user
// Endpoint: GET /api/messages/conversations
// Request: {}
// Response: { conversations: any[] }
export const getConversations = () => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        conversations: [
          {
            _id: '507f1f77bcf86cd799439081',
            otherUser: {
              name: 'Sarah VideoEdit',
              avatar: '/placeholder-editor.jpg',
              online: true
            },
            project: {
              title: 'iPhone 15 Pro Max Review'
            },
            lastMessage: {
              content: 'I\'ve uploaded the latest version with your requested changes.',
              timestamp: '2024-01-28T16:45:00.000Z'
            },
            unreadCount: 2
          },
          {
            _id: '507f1f77bcf86cd799439082',
            otherUser: {
              name: 'Mike ProEdit',
              avatar: '/placeholder-editor2.jpg',
              online: false
            },
            project: {
              title: 'MacBook Air M3 Unboxing'
            },
            lastMessage: {
              content: 'Thanks for the feedback! Working on the revisions now.',
              timestamp: '2024-01-27T11:20:00.000Z'
            },
            unreadCount: 0
          },
          {
            _id: '507f1f77bcf86cd799439083',
            otherUser: {
              name: 'Alex Creative',
              avatar: '/placeholder-editor3.jpg',
              online: true
            },
            project: {
              title: 'Best Budget Phones 2024'
            },
            lastMessage: {
              content: 'Project completed! Hope you love the final result.',
              timestamp: '2024-01-26T14:30:00.000Z'
            },
            unreadCount: 1
          }
        ]
      });
    }, 500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.get('/api/messages/conversations');
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
}

// Description: Get messages for a specific conversation
// Endpoint: GET /api/messages/conversations/:id
// Request: {}
// Response: { messages: any[] }
export const getMessages = (conversationId: string) => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        messages: [
          {
            _id: '507f1f77bcf86cd799439091',
            content: 'Hi! I\'m excited to work on your iPhone review project.',
            sender: {
              name: 'Sarah VideoEdit',
              avatar: '/placeholder-editor.jpg'
            },
            timestamp: '2024-01-25T09:00:00.000Z',
            isOwn: false
          },
          {
            _id: '507f1f77bcf86cd799439092',
            content: 'Great! I\'ve uploaded all the raw footage. Let me know if you need anything else.',
            sender: {
              name: 'You',
              avatar: '/placeholder-creator.jpg'
            },
            timestamp: '2024-01-25T09:15:00.000Z',
            isOwn: true
          },
          {
            _id: '507f1f77bcf86cd799439093',
            content: 'Perfect! I\'ll start working on the first draft today.',
            sender: {
              name: 'Sarah VideoEdit',
              avatar: '/placeholder-editor.jpg'
            },
            timestamp: '2024-01-25T09:20:00.000Z',
            isOwn: false
          },
          {
            _id: '507f1f77bcf86cd799439094',
            content: 'I\'ve uploaded the first draft. Please review and let me know your thoughts!',
            sender: {
              name: 'Sarah VideoEdit',
              avatar: '/placeholder-editor.jpg'
            },
            timestamp: '2024-01-27T14:30:00.000Z',
            isOwn: false
          },
          {
            _id: '507f1f77bcf86cd799439095',
            content: 'Looks amazing! Could you adjust the color grading in the outdoor scenes to be a bit warmer?',
            sender: {
              name: 'You',
              avatar: '/placeholder-creator.jpg'
            },
            timestamp: '2024-01-27T16:45:00.000Z',
            isOwn: true
          },
          {
            _id: '507f1f77bcf86cd799439096',
            content: 'Absolutely! I\'ve uploaded the latest version with your requested changes.',
            sender: {
              name: 'Sarah VideoEdit',
              avatar: '/placeholder-editor.jpg'
            },
            timestamp: '2024-01-28T16:45:00.000Z',
            isOwn: false
          }
        ]
      });
    }, 400);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.get(`/api/messages/conversations/${conversationId}`);
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
}

// Description: Send a message in a conversation
// Endpoint: POST /api/messages/conversations/:id
// Request: { content: string }
// Response: { success: boolean, message: string }
export const sendMessage = (conversationId: string, data: { content: string }) => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Message sent successfully'
      });
    }, 600);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.post(`/api/messages/conversations/${conversationId}`, data);
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
}