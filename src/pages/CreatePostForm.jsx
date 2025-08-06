import './CreatePostForm.css';
import { useParams } from 'react-router-dom'

function CreatePostForm({ onChange, onFileChange, onSubmit, post }) {
    const { id } = useParams()

  return (
    <div className="form-wrapper">
      <form className="create-post-form" onSubmit={onSubmit}>
        <h2>{id ? "Edit Post" : "Create Post"}</h2>

        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          onChange={onChange}
          value={post?.title || ""}
          placeholder="Enter a title..."
        />

        <label htmlFor="content">Content</label>
        <input
          type="text"
          name="content"
          id="content"
          onChange={onChange}
          value={post?.content || ""}
          placeholder="Enter some content..."
        />

        <label htmlFor="stars">Stars</label>
        <input
          type="text"
          name="stars"
          id="stars"
          onChange={onChange}
          value={post?.stars || ""}
          placeholder="Enter a rating..."
        />

        {post?.image_url && (
          <div className="image-preview">
            <label>Current Image</label>
            <img
              src={`https://frpudzyrjhtbfnqltfzy.supabase.co/storage/v1/object/public/uploads/${post.image_url}`}
              alt="Current Upload"
            />
          </div>
        )}

        <label htmlFor="image_url">Upload (optional)</label>
        <input
          type="file"
          name="image_url"
          id="image_url"
          onChange={onFileChange}
        />

        <button type="submit" className="subButton">Submit</button>
      </form>
    </div>
  );
}

export default CreatePostForm;
