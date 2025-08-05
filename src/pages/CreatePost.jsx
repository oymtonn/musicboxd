import { useState, useEffect } from 'react'
import { supabase } from '../client.js'
import CreatePostForm from './CreatePostForm'

function CreatePost() {
    const [post, setPost] = useState({title: "", content: "", stars: "", upvotes: ""})
    const [file, setFile] = useState()

    const handleFileChange = (event) => {
        setFile(event.target.files[0])
    }

    const cleanFileName = (filename) => {
        return filename
          .replace(/\s+/g, '_') 
          .replace(/[^a-zA-Z0-9_.-]/g, '')
      }

    const handleChange = (event) => {
        const { name, value } = event.target
        setPost(prev => ({ ...prev, [name]: value }))
      }

      const createPost = async (event) => {
        event.preventDefault();

        await uploadFile()
      
        const { data, error } = await supabase
          .from('Posts')
          .insert({
            title: post.title,
            content: post.content,
            stars: post.stars,
            upvotes: post.upvotes
          })
          .select()

          if (error){
            console.log(error)
          }

      };
    
      const uploadFile = async () => {
        const fileName = cleanFileName(file.name)
        const filePath = `${Date.now()}_${fileName}`
        const { data, error } = await supabase.storage.from('uploads').upload(filePath, file)
        if (error) {
          console.log(error)
      }
    }


      

    return (
        <CreatePostForm 
            onChange={handleChange}
            onSubmit={createPost}
            onFileChange={handleFileChange}
        />
    )


}

export default CreatePost