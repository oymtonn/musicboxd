import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../client'
import CreatePost from './CreatePost'



function EditPost() {

    const [editingPost, setEditingPost] = useState()
    const { id } = useParams()

    useEffect(() => {
        const fetchPost =  async () => {
            const { data, error } = await supabase
                .from('Posts')
                .select()
                .eq('id', id)
                .single()

            if (error) {
                console.log('Getting og post error: ', data)
            }
            else {
                setEditingPost(data)
            }
        }

        fetchPost()
    }, [])

    // if editingPost is not yet fetched
    if (!editingPost) {
        return (<p>Loading...</p>)
    }

    return (
        <CreatePost
            editingPost = {editingPost}
        />
    )
}

export default EditPost