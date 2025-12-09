"use client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NextNProgress from "nextjs-progressbar";

const ClientsComponentsProvider = () => {
  return (
    <>
      <NextNProgress color="#5344FF" />
      <ToastContainer />
    </>
  );
};

export default ClientsComponentsProvider;


