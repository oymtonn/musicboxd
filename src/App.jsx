import { useState, useEffect } from 'react'
import './App.css'
import { supabase } from './client'
import { Link } from 'react-router-dom'

function App() {
    const [posts, setPosts] = useState([])
    const [orderChoice, setOrderChoice] = useState('created_at')
    const [query, setQuery] = useState('')
    
    const getFilteredPosts = (query, posts) => {
        if (!query){
            return posts
        }
        const lowerQuery = query.toLowerCase()
        return posts.filter((post) => post.title.toLowerCase().includes(lowerQuery))
    }

    const filteredPosts = getFilteredPosts(query, posts)

    const handleOrder = (event) => {

        if (event.target.name === "Newest") {
            setOrderChoice('created_at')
        }
        else {
            setOrderChoice('upvotes')
        }
    }

    useEffect(() => {
        const fetchPosts = async () => {
          const { data, error } = await supabase
            .from('Posts')
            .select('id, title, created_at, upvotes')
            .order(orderChoice, { ascending: false })
    
          if (error) console.log(error)
          else setPosts(data)
        }
        fetchPosts()
      }, [orderChoice])
    
      return (
        <>
            <div className="controls">
                <div className="button-group">
                <button name="Newest" className="created-at"onClick={handleOrder}>
                    Newest
                </button>
                <button name="Popular" className="upvotes" onClick={handleOrder}>
                    Popular
                </button>
                </div>
                <input
                    type="text"
                    name="search"
                    placeholder="Search"
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>

            <div className="posts-container">
            {filteredPosts.map((post) => (
                <Link
                to={`/post/${post.id}`}
                key={post.id}
                className="post-list-item"
                style={{
                    display: 'block',
                    padding: '3rem 30rem',
                    marginBottom: '0.5rem',
                    border: '1px solid #ccc',
                    borderRadius: '2px',
                    textDecoration: 'none',
                    backgroundColor:'black',
                    color: 'white',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)'
                }}
                >
                <h2>{post.title}</h2>
                <div>Created: {new Date(post.created_at).toLocaleDateString()}</div>
                <div>⬆️ {post.upvotes}</div>
                </Link>
            ))}
            </div>
        </>
      )
}

export default App
