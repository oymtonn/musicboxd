import { useState, useEffect } from 'react'
import { supabase } from '../client.js'

function CreatePost() {
    const [post, setPost] = useState({title: "", content: "", image_url: ""})

    const handleChange = (event) => {
        const { name, value } = event.target
        setPost(prev => ({ ...prev, [name]: value }))
      }

    const createPost = async (event) =>{
        event.preventDefault()

        await supabase
            .from('Posts')
            .insert({title: post.title, content: post.content, image_url: post.image_url})
            .select()

        window.location = "/"
    }

    
}