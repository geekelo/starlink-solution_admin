import React, { useEffect }  from "react";
import { useDispatch } from 'react-redux';
import "react-toastify/dist/ReactToastify.css";
import AppRouter from "./components/Routes/Router";
import './styles/form.css';
import './styles/shadcn.css';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchKits } from "./redux/slice/kitSlice";

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchKits());
  }, [dispatch]);

  return (
    <>
   <AppRouter/>
   <ToastContainer position="top-right" autoClose={3000} />
   </>
  );
}

export default App;
