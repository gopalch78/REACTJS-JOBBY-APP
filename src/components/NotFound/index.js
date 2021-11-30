import './index.css'

import Header from '../Header'

const NotFound = () => (
  <div className="not-found-container">
    <Header />
    <img
      src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
      alt=" not found"
      className="not-found-image"
    />
    <h1 className="not-found-heading">Page Not Found</h1>
    <p className="not-found-paragraph">
      we’re sorry, the page you requested could not be found
    </p>
  </div>
)

export default NotFound
