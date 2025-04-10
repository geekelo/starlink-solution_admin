import React  from "react";

import "react-toastify/dist/ReactToastify.css";
import AppRouter from "./components/Routes/Router";
import './styles/form.css';
import './styles/shadcn.css';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {


  return (
    <>
   <AppRouter/>
   <ToastContainer position="top-right" autoClose={3000} />
   </>
  );
}

export default App;
