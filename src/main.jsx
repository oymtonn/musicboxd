import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Layout from './routes/Layout'
import CreatePost from './pages/CreatePost'
import PostPage from './pages/PostPage'
import EditPost from './pages/EditPost'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<App />}/>
                <Route path="create" element={<CreatePost/>}/>
                <Route path="/post/:id" element={<PostPage/>}/>
                <Route path="/edit/:id" element={<EditPost/>}/>
            </Route>
        </Routes>
    </BrowserRouter>
  </StrictMode>,
)
