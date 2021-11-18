import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className="nav-header">
      <div className="nav-content">
        <div className="nav-bar-mobile-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
            alt=" website logo"
            className="website-logo-image"
          />
          <Link to="/">
            <AiFillHome />
          </Link>
          <Link to="/jobs">
            <BsFillBriefcaseFill />
          </Link>
          <Link to="/login">
            <FiLogOut onClick={onClickLogout} />
          </Link>
        </div>
        <div className="nav-bar-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
            alt=" website logo"
            className="website-logo-image"
          />
          <ul className="nav-menu">
            <li className="nav-menu-item">
              <Link to="/" className="home">
                Home
              </Link>
            </li>
            <li className="nav-menu-item">
              <Link to="/jobs" className="jobs">
                Jobs
              </Link>
            </li>
          </ul>
          <button
            type="button"
            className="logout-desktop-btn"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}
export default withRouter(Header)
