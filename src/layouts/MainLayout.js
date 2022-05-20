import React, { useContext, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import NavbarTop from 'components/navbar/top/NavbarTop';
import NavbarVertical from 'components/navbar/vertical/NavbarVertical';
import AppContext from 'context/Context';
import Footer from 'components/footer/Footer';
import ProductProvider from 'components/app/e-commerce/ProductProvider';
import classNames from 'classnames';
import { useNavigate } from "react-router-dom";


const MainLayout = () => {
  const { hash, pathname } = useLocation();
  const isKanban = pathname.includes('kanban');
  // const isChat = pathname.includes('chat');

  const {
    config: { isFluid, navbarPosition }
  } = useContext(AppContext);
  const navigate = useNavigate();


  useEffect(() => {
    setTimeout(() => {
      if (hash) {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
      }
    }, 0);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

//   const AuthRoute = () => {
//     const isLogin = localStorage.getItem("access_token") || false;
//     const render = isLogin ? (
//         navigate('/')
//     ) : (
//         navigate('/login')
//     );
//     return render;
// };


// useEffect(() => {
//     AuthRoute();
// }, []);

  return (
    <div className={isFluid ? 'container-fluid' : 'container'}>
      {(navbarPosition === 'vertical' || navbarPosition === 'combo') && (
        <NavbarVertical />
      )}
      <ProductProvider>
        <div className={classNames('content', { 'pb-0': isKanban })}>
          <NavbarTop />
          {/*------ Main Routes ------*/}
          <Outlet />
          {!isKanban && <Footer />}
        </div>
      </ProductProvider>
    </div>
  );
};

export default MainLayout;