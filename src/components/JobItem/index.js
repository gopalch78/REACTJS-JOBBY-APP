import {Link} from 'react-router-dom'

import {AiFillStar} from 'react-icons/ai'

const JobItem = props => {
  const {jobItemDetails} = props
  const {
    title,
    rating,
    id,
    packagePerAnnum,
    location,
    jobDescription,
    employmentType,
    companyLogoUrl,
  } = jobItemDetails
  return (
    <Link to={`/jobs/${id}`}>
      <li>
        <div>
          <div>
            <img src={companyLogoUrl} alt={title} />
          </div>
          <div>
            <h1>{title}</h1>
            <p>
              <AiFillStar />
              {rating}
            </p>
          </div>
        </div>

        <div>
          <p>{location}</p>
          <p>{employmentType}</p>
          <p>{packagePerAnnum}</p>
        </div>
        <hr />
        <p>{jobDescription}</p>
      </li>
    </Link>
  )
}
export default JobItem
