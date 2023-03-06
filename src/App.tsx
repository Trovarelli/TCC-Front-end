import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { DefaultRoutes } from "./routes";
import "react-toastify/dist/ReactToastify.css";
import { DesktopNav } from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <DesktopNav />
        <DefaultRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
