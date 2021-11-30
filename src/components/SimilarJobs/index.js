import {BsFillBriefcaseFill} from 'react-icons/bs'

import {FaMapMarkerAlt} from 'react-icons/fa'

import {AiFillStar} from 'react-icons/ai'

import './index.css'

const SimilarJobs = props => {
  const {similarJobDetails} = props
  const {
    sCompanyLogoUrl,
    sEmploymentType,
    sJobDescription,
    sLocation,
    sRating,
    sTitle,
  } = similarJobDetails
  return (
    <div className="similar-job-container">
      <li className="list-similar-container">
        <div>
          <div>
            <img
              src={sCompanyLogoUrl}
              alt="similar job company logo "
              className="similar-company-logo"
            />
          </div>
          <div>
            <h1 className="similar-title">{sTitle}</h1>
            <p className="similar-rating">
              <AiFillStar className="star1" />
              {sRating}
            </p>
          </div>
        </div>
        <h1>Description</h1>
        <p>{sJobDescription}</p>
        <div>
          <p className="similar-location">
            <FaMapMarkerAlt className="map1" />
            {sLocation}
          </p>
          <p className="similar-employment">
            <BsFillBriefcaseFill className="briefCase1" />
            {sEmploymentType}
          </p>
        </div>
      </li>
    </div>
  )
}
export default SimilarJobs
