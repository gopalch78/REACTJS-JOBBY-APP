import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import {AiFillStar} from 'react-icons/ai'

import {BsFillBriefcaseFill} from 'react-icons/bs'

import {FaMapMarkerAlt} from 'react-icons/fa'

import {BiLinkExternal} from 'react-icons/bi'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobItemData: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const jobDetailsApiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }
    const response = await fetch(jobDetailsApiUrl, options)
    if (response.ok === true) {
      const fetchedJobItemDetailsData = await response.json()
      const updatedJobItemDetailsData = [
        fetchedJobItemDetailsData.job_details,
      ].map(each => ({
        companyLogoUrl: each.company_logo_url,
        companyWebsiteUrl: each.company_website_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,

        skills: each.skills.map(eachSkill => ({
          imageUrl: eachSkill.image_url,
          name: eachSkill.name,
        })),
        lifeAtCompany: {
          description: each.life_at_company.description,
          companyImageUrl: each.life_at_company.image_url,
        },
        rating: each.rating,
        packagePerAnnum: each.package_per_annum,
        location: each.location,
        title: each.title,
      }))
      console.log(updatedJobItemDetailsData)
      this.setState({
        apiStatus: apiStatusConstants.success,
        jobItemData: updatedJobItemDetailsData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderFailureView = () => (
    <div>
      <button type="button">Retry</button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobItemDetails = () => {
    const {jobItemData} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      lifeAtCompany,
      rating,
      packagePerAnnum,
      location,
      title,
      skills,
    } = jobItemData[0]
    return (
      <div className="list-container">
        <div className="image-title-rating-container">
          <div className="image-container">
            <img
              src={companyLogoUrl}
              alt=" job details company logo"
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
        <h1 className="description-heading">
          Description
          <a href={companyWebsiteUrl}>
            Visit <BiLinkExternal />
          </a>
        </h1>
        <p className="description">{jobDescription}</p>
        <h1>Skills</h1>
        <ul>
          {skills.map(each => (
            <li>
              <img src={each.imageUrl} alt={each.name} />
              <p>{each.name}</p>
            </li>
          ))}
        </ul>
        <h1>Life at Company</h1>
        <div>
          <p>{lifeAtCompany.description}</p>
          <img src={lifeAtCompany.companyImageUrl} alt=" life at company" />
        </div>
      </div>
    )
  }

  renderJobDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobItemDetails()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return <div>{this.renderJobDetails()}</div>
  }
}
export default JobItemDetails
