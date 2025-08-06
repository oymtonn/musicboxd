import './CreatePostForm.css'

function CreatePostForm({ onChange, onFileChange, onSubmit, post}) {
    return (
      <form>
        <label>Title</label>
        <input type="text" name="title" onChange={onChange}
            value={post.title || ""}
        />
        <br />
        <label>Content</label>
        <input type="text" name="content" onChange={onChange}
            value={post.content || ""}
        />
        <br />
        <label>Stars</label>
        <input type="text" name="stars" onChange={onChange}
            value={post.stars || ""}
        />
        <br></br>
        <label>Upload (optional)</label>
        <input type="file" name="image_url" onChange={onFileChange} 
        />
        <br />
        <button onClick={onSubmit}>Submit</button>
      </form>
    );
  }

export default CreatePostForm