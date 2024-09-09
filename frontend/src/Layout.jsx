import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
      <h1>hiii</h1>
    </>
  );
};

export default Layout;
