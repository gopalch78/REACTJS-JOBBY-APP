import {Link} from 'react-router-dom'

import {AiFillStar} from 'react-icons/ai'

import {BsFillBriefcaseFill} from 'react-icons/bs'

import {FaMapMarkerAlt} from 'react-icons/fa'

import './index.css'

const JobItem = props => {
  const {jobDetails} = props
  const {
    title,
    rating,
    packagePerAnnum,
    location,
    jobDescription,
    id,
    employmentType,
    companyLogoUrl,
  } = jobDetails

  return (
    <li className="list-container">
      <Link to={`/jobs/${id}`}>
        <div className="image-title-rating-container">
          <div className="image-container">
            <img
              src={companyLogoUrl}
              alt="company logo"
              className="company-logo"
            />
          </div>
          <div className="title-rating-container">
            <h1 className="title">{title}</h1>
            <p className="rating">
              <AiFillStar className="star" />
              {rating}
            </p>
          </div>
        </div>
        <div className="location-employ-package-container">
          <p className="location">
            <FaMapMarkerAlt className="map" />
            {location}
          </p>
          <p className="employment">
            <BsFillBriefcaseFill className="briefCase" />
            {employmentType}
          </p>

          <p className="package">{packagePerAnnum}</p>
        </div>
        <hr className="hr-line-1" />
        <h1 className="description-heading">Description</h1>
        <p className="description">{jobDescription}</p>
      </Link>
    </li>
  )
}
export default JobItem
