import React, {useState} from 'react'
import {Link, useNavigate, NavLink} from 'react-router-dom'

export default function Navbar() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = e => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query)}`)
      setQuery('')
    }
  }

  return (
    <nav className="navbar">
      {/* 1. Heading element with text content as "movieDB" */}

      <h1 className="nav-brand">
        <Link to="/">movieDB</Link>
      </h1>

      <ul className="nav-links">
        <li>
          {/* Fixed: h2 is outside, NavLink is inside */}

          <NavLink to="/" end>
            Popular
          </NavLink>
        </li>
        <li>
          <NavLink to="/top-rated">Top Rated</NavLink>
        </li>
        <li>
          <NavLink to="/upcoming">Upcoming</NavLink>
        </li>
      </ul>

      <form className="search-container" onSubmit={handleSearch}>
        {/* Search Input element */}
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        {/* Search Button element */}
        <button type="submit">Search</button>
      </form>
    </nav>
  )
}
