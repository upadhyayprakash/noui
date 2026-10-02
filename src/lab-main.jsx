import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Lab from './Lab.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Lab />
  </StrictMode>,
)
