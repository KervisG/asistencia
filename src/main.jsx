import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Usuarios from './components/usuarios/Usuarios'


createRoot(document.getElementById('root')).render(
  <StrictMode>
<Usuarios></Usuarios>
  </StrictMode>,
)
