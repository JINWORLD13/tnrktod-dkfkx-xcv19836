import React from 'react';
import App from './App.jsx';
import ReactDOM from 'react-dom/client';
import { hydrateRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import store from './data/reduxStore/store.jsx';
import { router } from './config/Route/ROUTE.jsx';
import '/src/locales/i18n';
import LoadingForm from './Components/Loading/Loading.jsx';
if (import.meta.env.DEV && 'serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(function (registrations) {
    for (let registration of registrations) {
      registration.unregister();
    }
  });
}
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js', { type: 'module' }) 
      .then(registration => {
        console.log('Service Worker registered:', registration);
      })
      .catch(error => {
        console.error('Service Worker registration failed:', error);
      });
  });
}
const rootElement = document.getElementById('root');
const app = (
  <HelmetProvider>
    <Provider store={store}>
      <RouterProvider router={router} fallbackElement={<LoadingForm />}>
        <App />
      </RouterProvider>
    </Provider>
  </HelmetProvider>
);
if (rootElement.hasChildNodes()) {
  try {
    hydrateRoot(rootElement, app);
  } catch (error) {
    console.error('Hydration failed:', error);
    ReactDOM.createRoot(rootElement).render(app);
  }
} else {
  ReactDOM.createRoot(rootElement).render(app);
}
