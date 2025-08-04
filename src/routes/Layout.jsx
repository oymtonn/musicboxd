import { Outlet, Link } from 'react-router-dom'

function Layout() {
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to="/">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="create">
                            Post
                        </Link>
                    </li>
                    {/* <li>
                        <Link to="/">
                            Home
                        </Link>
                    </li> */}
                </ul>
            </nav>
            <Outlet />
        </>
    )
}

export default Layout