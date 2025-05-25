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
import Home from './components/Home/home.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx'
import Grind75 from './components/Grind75/Grind75.jsx';
import Compiler from './components/Compiler/Compiler.jsx';
import MonacoIDE from './components/MonacoIDE/MonacoIDE.jsx';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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
        element: <Home />
      },
      {
        path: 'topics',
        element: <Card />
      },
      {
        path: 'reminder',
        element: <ReminderSection/>
      },
      {
        path: 'dashboard',
        element: <Dashboard />
      },
      {
        path: 'grind75',
        element: <Grind75 />  // Add this new route
      },
      {
        path: ':topicName',
        element: <QuestionTable />
      },
      {
        path: 'compiler',
        element: <Compiler />
      },
      {
        path: 'ide',
        element: <MonacoIDE />
      }
    ]
  }
]);
 const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
        <RouterProvider router={router} />
      </ClerkProvider>
    </React.StrictMode>
  </QueryClientProvider>
);