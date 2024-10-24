import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import Layout from './Layout.jsx';
import Card from './components/Card/Card.jsx';
import ReminderSection from './components/Reminder/Reminder.jsx';
// import HeroPage from './components/HeroPage/HeroPage.jsx';
import ArrayPage from './components/topic/ArrayPage.jsx';
import MatrixPage from './components/topic/MatrixPage.jsx';
import StringPage from './components/topic/StringPage.jsx';
import SearchSortPage from './components/topic/SearchSortPage.jsx';
import LinkedListPage from './components/topic/LinkedListPage.jsx';
import BinaryTreePage from './components/topic/BinaryTreePage.jsx';
import BSTPage from './components/topic/BSTPage.jsx';
import GreedyPage from './components/topic/GreedyPage.jsx';
import BacktrackingPage from './components/topic/BacktrackingPage.jsx';
import StackQueuesPage from './components/topic/StackQueuesPage.jsx';
import HeapPage from './components/topic/HeapPage.jsx';
import GraphPage from './components/topic/GraphPage.jsx';
import TriePage from './components/topic/TriePage.jsx';
import DPPage from './components/topic/DPPage.jsx';
import BitManipulationPage from './components/topic/BitManipulationPage.jsx';

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Layout />,
//     children: [
//       {
//         path: '',   // This renders Card by default at the root
//         element: <Card />
//       },
//       {
//         path: 'reminder',  // Route for the reminder page
//         element: <ReminderSection/>
//       },
//       {
//         path: 'array', // Add a new route for the App component
//         element: <HeroPage />
//       }
//     ]
//   }
// ]);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',   // Default route pe Card component render hota hai
        element: <Card />
      },
      {
        path: 'reminder',  // Reminder page ka route
        element: <ReminderSection/>
      },
      {
        path: 'array',  // Array page ka route
        element: <ArrayPage /> // Replace HeroPage with relevant component for Array
      },
      {
        path: 'matrix',  // Matrix page ka route
        element: <MatrixPage /> // Create MatrixPage component
      },
      {
        path: 'string',  // String page ka route
        element: <StringPage /> // Create StringPage component
      },
      {
        path: 'search-and-sort',  // Search & Sort page ka route
        element: <SearchSortPage /> // Create SearchSortPage component
      },
      {
        path: 'linked-list',  // Linked List page ka route
        element: <LinkedListPage /> // Create LinkedListPage component
      },
      {
        path: 'binary-trees',  // Binary Tree page ka route
        element: <BinaryTreePage /> // Create BinaryTreePage component
      },
      {
        path: 'bst',  // Binary Search Tree (BST) page ka route
        element: <BSTPage /> // Create BSTPage component
      },
      {
        path: 'greedy',  // Greedy page ka route
        element: <GreedyPage /> // Create GreedyPage component
      },
      {
        path: 'backtracking',  // Backtracking page ka route
        element: <BacktrackingPage /> // Create BacktrackingPage component
      },
      {
        path: 'stacks-and-queues',  // Stack & Queues page ka route
        element: <StackQueuesPage /> // Create StackQueuesPage component
      },
      {
        path: 'heap',  // Heap page ka route
        element: <HeapPage /> // Create HeapPage component
      },
      {
        path: 'graph',  // Graph page ka route
        element: <GraphPage /> // Create GraphPage component
      },
      {
        path: 'trie',  // Trie page ka route
        element: <TriePage /> // Create TriePage component
      },
      {
        path: 'dynamic-programming',  // Dynamic Programming (DP) page ka route
        element: <DPPage /> // Create DPPage component
      },
      {
        path: 'bit-manipulation',  // Bit Manipulation page ka route
        element: <BitManipulationPage /> // Create BitManipulationPage component
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
