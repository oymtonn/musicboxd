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
        <div>
          {posts.map((post) => {
            console.log(`Image URL: https://frpudzyrjhtbfnqltfzy.supabase.co/storage/v1/object/public/uploads/${post.image_url}`)
      
            return (
              <div key={post.id} className="post-card">
                <h2>{post.title}</h2>
                <p>{post.content}</p>
                <p>⭐ {post.stars}</p>
                <p>⬆️ {post.upvotes}</p>
                {post.image_url && (
                <img
                    src={`https://frpudzyrjhtbfnqltfzy.supabase.co/storage/v1/object/public/uploads/${post.image_url}`}
                    alt="Post image"
                />
                )}
              </div>
            )
          })}
        </div>
      )
      
}

export default App
