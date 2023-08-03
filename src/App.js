import { ToastContainer } from 'react-toastify';
import './assets/style/main.scss';
import 'react-toastify/dist/ReactToastify.css';
import BasicRoutes from "./components/Router/index";
function App() {
  return (
    <>
      <ToastContainer/>
    <BasicRoutes />
    </>
  );
}

export default App;
