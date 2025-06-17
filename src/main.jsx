import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router'
import App from './App'
import { Toaster } from 'react-hot-toast'
import BlogProvider from './lib/BlogContext'


createRoot(document.getElementById('root')).render(
  <StrictMode>
   
    <BlogProvider>
       <BrowserRouter>
     <Toaster/>
      <App/>
     </BrowserRouter>
    </BlogProvider>
   
  </StrictMode>,
)
