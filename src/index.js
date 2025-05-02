import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// 1. Import Provider and store
import { Provider } from 'react-redux';
import { store } from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* 2. Wrap App in Provider */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// Optional: report performance
reportWebVitals();
