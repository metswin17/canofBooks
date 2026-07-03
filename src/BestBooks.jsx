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
  }

  async componentDidMount() {
    const response = await fetch(`${SERVER_URL}/books`)
    const booksData = await response.json()
    this.setState({ books: booksData })
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

        {this.state.books.length > 0 ? (
          <Carousel>
            {this.state.books.map((book) => (
              <Carousel.Item key={book._id}>
                <div className="book-slide">
                  <h2>{book.title}</h2>
                  <p>{book.description}</p>
                  <p>Status: {book.status}</p>
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