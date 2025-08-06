import { useState, useEffect } from 'react'
import './App.css'
import { supabase } from './client'
import { Link } from 'react-router-dom'

function App() {
    const [posts, setPosts] = useState([])
    
    useEffect(() => {
        const fetchPosts = async () => {
          const { data, error } = await supabase
            .from('Posts')
            .select('id, title, created_at, upvotes')
            .order('created_at', { ascending: false })
    
          if (error) console.log(error)
          else setPosts(data)
        }
        fetchPosts()
      }, [])
    
      return (
        <div className="posts-container">
          {posts.map((post) => (
            <Link
              to={`/post/${post.id}`}
              key={post.id}
              className="post-list-item"
              style={{
                display: 'block',
                padding: '5rem 20rem',
                marginBottom: '0.5rem',
                border: '1px solid #ccc',
                borderRadius: '2px',
                textDecoration: 'none',
                backgroundColor:'black',
                color: 'white',
              }}
            >
              <h2>{post.title}</h2>
              <div>Created: {new Date(post.created_at).toLocaleDateString()}</div>
              <div>⬆️ {post.upvotes}</div>
            </Link>
          ))}
        </div>
      )
}

export default App
