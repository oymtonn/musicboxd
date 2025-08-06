import { useState, useEffect } from 'react'
import { supabase } from '../client.js'
import CreatePostForm from './CreatePostForm'

function CreatePost( {editingPost} ) {
    const [post, setPost] = useState({title: "", content: "", stars: 0, upvotes: 0, image_url: ""})
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

    useEffect(() => {
        if ( editingPost ){
            setPost({
                title: editingPost.title || "",
                content: editingPost.content || "",
                stars: editingPost.stars || "",
                upvotes: editingPost.upvotes || "",
                image_url: editingPost.image_url || ""
            })
        }
    }, [editingPost])

    const createPost = async (event) => {
        event.preventDefault();

        let filePath = null
        
        if (file) {
            filePath = await uploadFile()

            if (!filePath) {
                alert('File uplaod failed!!!')
                return
            }
        }

        if (post.title === "") {
            alert('Title is required!')
            return
        }
        else if (post.stars === "") {
            alert('Give your rating!')
            return
        }

        console.log(filePath)

        if (editingPost) {
            const { data, error } = await supabase
            .from('Posts')
            .update({
              title: post.title,
              content: post.content,
              stars: post.stars,
              upvotes: post.upvotes,
              image_url: filePath
            })
            .eq('id', id)
  
            if (error) {
              console.error("Upload error:", error.message, file);
            }
        }
        else {
            const { data, error } = await supabase
            .from('Posts')
            .insert({
              title: post.title,
              content: post.content,
              stars: post.stars,
              upvotes: post.upvotes,
              image_url: filePath
            })
            .select()
  
            if (error) {
              console.error("Upload error:", error.message, file);
            }
        }
       
        window.location = "/"

    };
    
    const uploadFile = async () => {
        const fileName = cleanFileName(file.name)
        const { data, error } = await supabase.storage.from('uploads').upload(fileName, file)
        if (error) {
            console.error("Upload error:", error.message, file);
        }

      return fileName
    }

    return (
        <CreatePostForm 
            onChange={handleChange}
            onSubmit={createPost}
            onFileChange={handleFileChange}
            post={post}
        />
    )


}

export default CreatePost