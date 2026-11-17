import {Link, useNavigate} from 'react-router-dom'
import {useState} from 'react'
import './index.css'

const Header = () => {
  const [searchInput, setSearchInput] = useState('')
  const navigate = useNavigate()

  const onChangeSearch = event => {
    setSearchInput(event.target.value)
  }

  const onClickSearch = () => {
    if (searchInput.trim() !== '') {
      navigate(`/search?query=${encodeURIComponent(searchInput.trim())}`)
    }
  }

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <h1>movieDB</h1>
      </Link>

      <div className="nav-links">
        <Link to="/">
          <h2>Popular</h2>
        </Link>

        <Link to="/top-rated">
          <h2>Top Rated</h2>
        </Link>

        <Link to="/upcoming">
          <h2>Upcoming</h2>
        </Link>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search Movies"
          value={searchInput}
          onChange={onChangeSearch}
        />

        <button type="button" onClick={onClickSearch}>
          Search
        </button>
      </div>
    </nav>
  )
}

export default Header
