import { BrowserRouter } from 'react-router-dom';
import AppRouter from '@/router';
import { CartProvider } from './contexts/CartContext.jsx';
import './scss/style.scss';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <AppRouter />
      <ToastContainer position="top-right" autoClose={3000} />
    </BrowserRouter>
  );
}

export default App;
