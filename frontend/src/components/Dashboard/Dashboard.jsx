import React, { useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';

const Dashboard = () => {
  const { userId } = useAuth();

  useEffect(() => {
    const sendUserToBackend = async () => {
      try {
        const response = await fetch('/api/clerk/add-user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ clerkUserId: userId }),
        });

        if (response.ok) {
          console.log('User data sent to backend and stored in MongoDB');
        } else {
          console.error('Failed to send user data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    // Send user data to backend after component mounts and userId is available
    if (userId) {
      sendUserToBackend();
    }
  }, [userId]);

  return (
    <div>
      <h1>Welcome to your Dashboard</h1>
      {/* Other dashboard content */}
    </div>
  );
};

export default Dashboard;
