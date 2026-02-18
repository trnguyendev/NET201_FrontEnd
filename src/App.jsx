import { BrowserRouter } from 'react-router-dom';
import AppRouter from '@/router';
import './scss/style.scss';

function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
