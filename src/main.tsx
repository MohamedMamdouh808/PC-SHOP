import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import { WishlistProvider } from './context/WishlistContext';
import { CompareProvider } from './context/CompareContext';
import { PromoProvider } from './context/PromoContext';
import App from './App';
import './index.css';

// Start MSW worker for mock API (runs in all environments for demo)
async function enableMocking() {
  const { worker } = await import('./mocks/browser');
  await worker.start({ 
    onUnhandledRequest: 'bypass',
  });
  console.log('[MSW] Mock API enabled');
}

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');

const root = createRoot(container);

enableMocking().then(() => {
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <ThemeProvider>
          <AuthProvider>
            <CartProvider>
              <WishlistProvider>
                <CompareProvider>
                  <PromoProvider>
                    <App />
                  </PromoProvider>
                </CompareProvider>
              </WishlistProvider>
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
});
