import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterApp } from './router/RouterApp'

import "./index.css"
import { UserProvider } from './context/UserContext'
import { ThemeProvider } from "./context/ThemeContext"

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <ThemeProvider>
     <UserProvider>
       <RouterApp />
     </UserProvider>
   </ThemeProvider>
  </StrictMode>,
)

