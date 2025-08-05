import { useState, useEffect } from 'react'
import './App.css'
import { supabase } from './client'

function App() {
    const [posts, setPosts] = useState([])
    
    useEffect(() => {
        const fetchPosts = async () => {
      
          const { data, error } = await supabase
            .from('Posts')
            .select()
            .order('created_at', { ascending: false })
      
          if (error) {
            console.log(error)
          } else {
            setPosts(data)
          }
        }
      
        fetchPosts()
      }, [])
      

      return (
        <div className="posts-container">
          {posts.map((post) => {
            console.log(`Image URL: https://frpudzyrjhtbfnqltfzy.supabase.co/storage/v1/object/public/uploads/${post.image_url}`)
      
            return (
                <div key={post.id} className="post-card">
                <div className="top-row">
                    <h2>{post.title}</h2>
                    <div className="stars">⭐ {post.stars}</div>
                </div>
                
                <div className="content">
                {post.image_url && (
                    <div className="post-image-wrapper">
                    <img
                        className="post-image"
                        src={`https://frpudzyrjhtbfnqltfzy.supabase.co/storage/v1/object/public/uploads/${post.image_url}`}
                        alt="Post"
                    />
                    </div>
                )}
                <div className="post-text">{post.content}</div>
                </div>
                
                <button className="upvote-button">
                    ⬆️ {post.upvotes}
                </button>

                </div>
            )
          })}
        </div>
      )
      
}

export default App
