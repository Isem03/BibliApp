import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css'
import App from './App.jsx'

document.addEventListener('DOMContentLoaded', () => {
  const triggers = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  [...triggers].forEach(el => new window.bootstrap.Tooltip(el));
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
