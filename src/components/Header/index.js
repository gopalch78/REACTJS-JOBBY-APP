import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'

import './index.css'

const Header = props => {
  const {history} = props

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const gotoHome = () => {
    history.push('/')
  }

  const gotoJobs = () => {
    history.push('/jobs')
  }
  return (
    <>
      <nav className="nav-header">
        <div className="nav-content">
          <div className="nav-bar-mobile-container">
            <Link to="/">
              <img
                src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
                alt="website logo"
                className="website-logo-image-mobile"
              />
            </Link>
            <Link to="/">
              <AiFillHome className="home-icon" onClick={gotoHome} />
            </Link>
            <Link to="/jobs">
              <BsFillBriefcaseFill
                className="briefcase-icon"
                onClick={gotoJobs}
              />
            </Link>
            <Link to="/login">
              <FiLogOut onClick={onClickLogout} className="logout-icon" />
            </Link>
          </div>
          <div className="nav-bar-desktop-container">
            <Link to="/">
              <img
                src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
                alt=" website logo"
                className="website-logo-image-desktop"
              />
            </Link>
            <ul className="nav-menu">
              <li className="nav-menu-item-1">
                <Link to="/" className="home">
                  Home
                </Link>
              </li>
              <li className="nav-menu-item-3">
                <Link to="/jobs" className="jobs">
                  Jobs
                </Link>
              </li>
              <li className="nav-menu-item-2">
                <button
                  type="button"
                  className="logout-desktop-btn"
                  onClick={onClickLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
export default withRouter(Header)
