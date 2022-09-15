import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";

import Header from "../components/partials/Header";
import Footer from "../components/footer/Footer";
import ModalFormSubmit from "../components/partials/form/ModalFormSubmit";

const MainLayout = () => {
  useEffect(() => {
    console.log(
      `${process.env.REACT_APP_NAME} ${process.env.REACT_APP_VERSION}`
    );
  }, []);

  return (
    <main id="main-app">
      <Header />
      <Outlet />
      <Footer />
      <ModalFormSubmit />
    </main>
  );
};

export default MainLayout;
