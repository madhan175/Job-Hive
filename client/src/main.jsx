// src/index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from './components/ui/sonner.jsx'; // Ensure the path to `sonner.jsx` is correct
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store from './redux/store.js';
import { persistStore } from 'redux-persist';

import App from './App.jsx';
import './index.css';

// Create a persistor instance
const persistor = persistStore(store);

// Render the application
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
          <App />
          <Toaster />
        </PersistGate>
      </Provider>
    </React.StrictMode>
  );
} else {
  console.error('Root element not found. Make sure there is an element with id "root" in your HTML.');
}
