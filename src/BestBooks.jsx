import React from 'react'
import Carousel from 'react-bootstrap/Carousel'
import axios from 'axios';

const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3001'


class BestBooks extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      books: [],
      showForm: false,
      title: '',
      description: '',
      status: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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


      </main>
    )
  }
}

export default BestBooks