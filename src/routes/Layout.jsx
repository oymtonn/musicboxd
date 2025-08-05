import { Outlet, Link } from 'react-router-dom'

function Layout() {
  return (
    <>
      <nav className="navbar">
        <div className="navbar-title">musicboxd</div>
        <ul className="navbar-links">
          <li><Link to="/" className="nav-link">Home</Link></li>
          <li><Link to="/create" className="nav-link">Post</Link></li>
        </ul>
      </nav>

      <div style={{ paddingTop: '100px' }}>
        <Outlet />
      </div>
    </>
  )
}

export default Layout
