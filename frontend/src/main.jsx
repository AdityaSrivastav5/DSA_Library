import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import Layout from './Layout.jsx';
import Card from './components/Card/Card.jsx';
import ReminderSection from './components/Reminder/Reminder.jsx';
import QuestionTable from './components/ QuestionTable/QuestionTable.jsx'; // Import the new component

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',   // Default route
        element: <Card />
      },
      {
        path: 'reminder',  // Reminder page
        element: <ReminderSection/>
      },
      {
        path: ':topicName',  // Dynamic route for all topics
        element: <QuestionTable />
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <RouterProvider router={router} />
    </ClerkProvider>
  </React.StrictMode>
);