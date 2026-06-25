import { useEffect, useState } from 'react'
import './App.css'

const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3001'

function App() {
  const [books, setBooks] = useState([])

  useEffect(() => {
    async function getBooks() {
      const response = await fetch(`${SERVER_URL}/books`)
      const booksData = await response.json()
      setBooks(booksData)
    }

    getBooks()
  }, [])

  return (
    <main>
      <h1>Can of Books</h1>

      {books.map((book) => (
        <section key={book._id}>
          <h2>{book.title}</h2>
          <p>{book.description}</p>
          <p>Status: {book.status}</p>
        </section>
      ))}
    </main>
  )
}

export default App