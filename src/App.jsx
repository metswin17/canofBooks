import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import BestBooks from './BestBooks'
import About from './About'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<BestBooks />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App