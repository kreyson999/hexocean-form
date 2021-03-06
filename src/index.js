import React from 'react';
import ReactDOM from 'react-dom/client';
import Form from "./components/Form"
import reportWebVitals from './reportWebVitals';
import './styles/index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Form />
  </React.StrictMode>
);

reportWebVitals();
