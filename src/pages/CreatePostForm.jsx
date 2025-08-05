import './CreatePostForm.css'

function CreatePostForm({ onChange, onFileChange, onSubmit }) {
    return (
      <form>
        <label>Title</label>
        <input type="text" name="title" onChange={onChange} />
        <br />
        <label>Content</label>
        <input type="text" name="content" onChange={onChange} />
        <br />
        <label>Stars</label>
        <input type="text" name="stars" onChange={onChange}/>
        <br></br>
        <label>Upvotes</label>
        <input type="text" name="upvotes" onChange={onChange}/>
        <label>Upload (optional)</label>
        <input type="file" name="image_url" onChange={onFileChange} />
        <br />
        <button onClick={onSubmit}>Submit</button>
      </form>
    );
  }

export default CreatePostForm