import {Link} from 'react-router-dom'

import Header from '../Header'

import './index.css'

const Home = () => (
  <>
    <Header />
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-heading">
          Find The Job That <br /> Fits Your Life
        </h1>
        <img
          src="https://assets.ccbp.in/frontend/react-js/home-sm-bg.png "
          alt="home"
          className="home-mobile-image"
        />
        <p className="home-description">
          Millions of people are searching for jobs, salary
          <br />
          information,company reviews.Find the job that fits your <br />{' '}
          abilities and potential.
        </p>
        <Link to="/jobs">
          <button type="button" className="jobs-button">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  </>
)
export default Home
