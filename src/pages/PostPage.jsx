import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from '../client'
import './PostPage.css'

function PostPage() {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState({ name: '', content: '' })

  const handleUpvotes = async () => {

    let updatedUpvotes = post.upvotes
    updatedUpvotes += 1
  
    setPost(prev => ({ ...prev, upvotes: updatedUpvotes }));
  
    await supabase
      .from('Posts')
      .update({ upvotes: updatedUpvotes })
      .eq('id', post.id);
  
  };

  const handleDelete = async (event) => {
      event.preventDefault()

      await supabase
        .from('Posts')
        .delete()
        .eq('id', id)

      window.location = "/"
  }

  useEffect(() => {
    const fetchPost = async () => { 
      const { data, error } = await supabase
        .from('Posts')
        .select()
        .eq('id', id)
        .single()

      if (!error) setPost(data)
    }

    const fetchComments = async () => {
      const { data, error } = await supabase
        .from('Comments')
        .select()
        .eq('post_id', id)
        .order('created_at', { ascending: true })

      if (!error) setComments(data)
      else{
        console.log(error)
    }
    }

    fetchPost()
    fetchComments()
  }, [id])

  const handleCommentSubmit = async (e) => {
    e.preventDefault()
    const { name, content } = newComment
  
    if (!content.trim()) return
  
    const { data, error } = await supabase
      .from('Comments')
      .insert([
        {
          post_id: id,
          name: name || 'Anonymous',
          content: content,
        },
      ])
  
    if (!error && data && data.length > 0) {
      setComments((prev) => [...prev, data[0]])
      setNewComment({ name: '', content: '' })
    } else {
      console.error('Insert error:', error)
    }
    
    window.location = `/post/${id}`
  }
  
  if (!post) {
    return <div>Loading...</div>
  }

  return (
        <div className="post-card">
        <div className="top-row">
        <div className="title-stars">
            <h2>{post.title}</h2>
            <div className="stars">⭐ {post.stars} / 5 </div>
        </div>
        <Link to={`/edit/${post.id}`} className="edit-link">
            Edit
        </Link>
        </div>

        <div className="content">
            {post.image_url && (
                <div className="post-image-wrapper-and-upvote">
                <div className="post-image-wrapper">
                    <img
                    className="post-image"
                    src={`https://frpudzyrjhtbfnqltfzy.supabase.co/storage/v1/object/public/uploads/${post.image_url}`}
                    alt="Post"
                    />
                </div>
                </div>
            )}

            <div className="post-text">{post.content}</div>
            </div>

        <div className="buttons-row">
        <button onClick={handleUpvotes} className="upvote-button">
            Upvotes: {post.upvotes} ^
        </button>
        <button className="deleteButton" onClick={handleDelete}>
            Delete
        </button>
        </div>

      {/* Comments Section */}
      <div className="comment-wrapper">
        <div className="comments-section" style={{ marginTop: '2rem' }}>
            <h3>Comments</h3>

            {comments.length === 0 && <p>No comments yet.</p>}
            {comments.map((comment) => (
            <div key={comment.id} className="comment" style={{ padding: '0.5rem 0', borderBottom: '1px solid #444' }}>
                <strong>{comment.name}</strong>:
                <p style={{ margin: '0.3rem 0' }}>{comment.content}</p>
                <small style={{ fontSize: '0.75rem', opacity: 0.7 }}>
                {new Date(comment.created_at).toLocaleString()}
                </small>
            </div>
            ))}

            {/* Comment Form */}
            <form onSubmit={handleCommentSubmit} style={{ marginTop: '1rem' }}>
            <input
                type="text"
                placeholder="Your name (optional)"
                value={newComment.name}
                onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
                style={{ display: 'block', marginBottom: '0.5rem', padding: '0.5rem', width: '100%' }}
            />
            <textarea
                placeholder="Write a comment..."
                value={newComment.content}
                onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
                style={{ display: 'block', marginBottom: '0.5rem', padding: '0.5rem', width: '100%' }}
                rows={3}
                required
            />
            <button type="submit" style={{ padding: '0.5rem 1rem' }}>
                Post Comment
            </button>
            </form>
            </div>
        </div>
    </div>
  )
}

export default PostPage
