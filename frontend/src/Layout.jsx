
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';

const Layout = () => {
  return (
    <>
      <Navbar />
      
      <Outlet />
      <Footer />
<<<<<<< HEAD
      <h1>hi</h1>
=======
>>>>>>> origin
    </>
  );
};

export default Layout;
