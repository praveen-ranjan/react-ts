import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './providers/cartContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <CartProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
    </CartProvider>
  </StrictMode>,
)
