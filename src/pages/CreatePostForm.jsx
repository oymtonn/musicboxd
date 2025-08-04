import './CreatePostForm.css'

function CreatePostForm({ onChange, onSubmit }) {
    return (
      <form>
        <label>Title</label>
        <input type="text" name="title" onChange={onChange} />
        <br />
        <label>Content</label>
        <input type="text" name="content" onChange={onChange} />
        <br />
        <label>Upload (optional)</label>
        <input type="file" name="image_url" onChange={onChange} />
        <br />
        <button onClick={onSubmit}>Submit</button>
      </form>
    );
  }
  

export default CreatePostForm