import React from 'react';
import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
import './index.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './Layout.jsx';
import Card from './components/Card/Card.jsx';
import Reminder from './components/Reminder/Reminder.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '',
                element: <Card />
            },
            {
                path:'reminder',
                element: <Reminder />
            }
        ]
    }
])

createRoot(document.getElementById('root')).render(
 <React.StrictMode>
  <RouterProvider router={router} />
    
 </React.StrictMode>
    

)
