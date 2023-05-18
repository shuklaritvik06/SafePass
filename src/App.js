import "./global.css";
import "react-toastify/dist/ReactToastify.css";
import { Router } from "./router/Router";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <ToastContainer />
      <Router />
    </>
  );
}

export default App;
