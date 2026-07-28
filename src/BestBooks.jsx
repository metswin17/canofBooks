import React from 'react'
import Carousel from 'react-bootstrap/Carousel'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useAuth0 } from "@auth0/auth0-react";

const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3001'


class BestBooks extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      books: [],
      showForm: false,
      title: '',
      description: '',
      status: '',

      showEditForm: false,
      selectedBook: null
      
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEditChange = this.handleEditChange.bind(this);
    this.handleUpdateSubmit = this.handleUpdateSubmit.bind(this);
  }

  async componentDidMount() {
    const response = await fetch(`${SERVER_URL}/books`)
    const booksData = await response.json()
    this.setState({ books: booksData })
  }

  handleChange(event) {
    this.setState({ 
      [event.target.name]: event.target.value
    });
  }

  

  handleEditChange(event) {
this.setState({
  selectedBook: {
    ...this.state.selectedBook, // keep the other book information
    [event.target.name]: event.target.value  // change the field being typed
    
    
  }
});

  }

  async handleSubmit(event) {
    event.preventDefault();
    
    console.log("handleSubmit fired");
  
    const newBook = {
      title: this.state.title,
      description: this.state.description,
      status: this.state.status
    };
    
    const response = await axios.post(`${SERVER_URL}/books`, newBook);

    console.log(response.data);
    
    this.setState({
      books: [...this.state.books, response.data],
      showForm: false
    });
  }

  async handleDelete(bookId) {
    await axios.delete(`${SERVER_URL}/books/${bookId}`);

    this.setState({
      books: this.state.books.filter(book => book._id !== bookId)
    });
  }

  async handleUpdateSubmit(event) {
    event.preventDefault();
  
    const response = await axios.put(
      `${SERVER_URL}/books/${this.state.selectedBook._id}`,
      this.state.selectedBook
    );

    this.setState({
      books: this.state.books.map(book =>
        book._id === response.data._id ? response.data : book
      ),
      showEditForm: false,
      selectedBook: null
    });
  
  }
  render() {
  
    return (
      <main>
        <h1>Can of Books</h1>

<button
onClick={() =>
  this.setState({
    showForm: true
  })
}
>
  
Add Book
</button>

{this.state.showForm && (
  <form onSubmit={this.handleSubmit}>

    <div>
      <label>Title</label>
      <input
  type="text"
  name="title"
  value={this.state.title}
  onChange={this.handleChange}
/>
    </div>

    <div>
      <label>Description</label>
      <input
  type="text"
  name="description"
  value={this.state.description}
  onChange={this.handleChange}
    
/>
</div>
    <div>
      <label>Status</label>
      <input
  type="text"
  name="status"
  value={this.state.status}
  onChange={this.handleChange}

  />  
  </div>

    <button type="submit">
      Save Book
    </button>

  </form>
)}

        {this.state.books.length > 0 ? (
          <Carousel>
            {this.state.books.map((book) => (
              <Carousel.Item key={book._id}>
                <div className="book-slide">
                  <h2>{book.title}</h2>
                  <p>{book.description}</p>
                  <p>Status: {book.status}</p>

                  
<Button
  variant="secondary"
  onClick={() => {
 
    this.setState({
      selectedBook: book,
      showEditForm: true,

    })
  }}
>
  Edit Book
</Button>               

<button onClick={() => this.handleDelete(book._id)}>
Delete Book
</button>

                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        ) : (
          <p>The book collection is empty.</p>
        )}

{this.state.showEditForm && (
  <Modal show={this.state.showEditForm}>
    <Modal.Header>
      <Modal.Title>Edit Book</Modal.Title>
    </Modal.Header>

    <Modal.Body>


      <form onSubmit={this.handleUpdateSubmit}>

  <div>
    <label>Title</label>

    <input
  id="title"
  type="text"
  name="title"
  value={this.state.selectedBook?.title || ''}
  onChange={this.handleEditChange}
/>
  </div>

  <div>
    <label>Description</label>
    <input
      type="text"
      name="description"
      value={this.state.selectedBook?.description || ''}
      onChange={this.handleEditChange}
    />
  </div>

  <div>
    <label>Status</label>
    <input
  type="text"
  name="status"
  value={this.state.selectedBook?.status || ''}
  onChange={this.handleEditChange}
/>
    
  </div>

  <button type="submit">
  Save Changes
</button>

</form>

    </Modal.Body>


    
  </Modal>
  

  
)}




      </main>
    )
  }
}

function BestBooksWithAuth() {
  const { getAccessTokenSilently } = useAuth0();

  return (
    <BestBooks 
      getAccessTokenSilently={getAccessTokenSilently}
    />
  );
}

export default BestBooksWithAuth;