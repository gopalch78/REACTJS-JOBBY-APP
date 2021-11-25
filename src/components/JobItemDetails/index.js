import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import {AiFillStar} from 'react-icons/ai'

import {BsFillBriefcaseFill} from 'react-icons/bs'

import {FaMapMarkerAlt} from 'react-icons/fa'

import {BiLinkExternal} from 'react-icons/bi'

import SimilarJobs from '../SimilarJobs'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobItemData: [],
    apiStatus: apiStatusConstants.initial,
    similarJobsData: [],
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
      const similarUpdatedData = fetchedJobItemDetailsData.similar_jobs.map(
        eachItem => ({
          sCompanyLogoUrl: eachItem.company_logo_url,
          sEmploymentType: eachItem.employment_type,
          id: eachItem.id,
          sJobDescription: eachItem.job_description,
          sLocation: eachItem.location,
          sRating: eachItem.rating,
          sTitle: eachItem.title,
        }),
      )
      this.setState({
        apiStatus: apiStatusConstants.success,
        jobItemData: updatedJobItemDetailsData,
        similarJobsData: similarUpdatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onRetry = () => {
    this.getJobItemDetails()
  }

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png "
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong </h1>
      <p>we cannot seem to find the page you are looking for</p>
      <button type="button" onClick={this.onRetry}>
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobItemDetails = () => {
    const {jobItemData, similarJobsData} = this.state
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
      <div className="background-container">
        <div className="list-container1">
          <div className="image-title-rating-container1">
            <div className="image-container1">
              <img
                src={companyLogoUrl}
                alt=" job details company logo"
                className="company-logo"
              />
            </div>
            <div className="title-rating-container1">
              <h1 className="title1">{title}</h1>
              <p className="rating1">
                <AiFillStar className="star1" />
                {rating}
              </p>
            </div>
          </div>
          <div className="location-employ-package-container1">
            <p className="location1">
              <FaMapMarkerAlt className="map1" />
              {location}
            </p>
            <p className="employment1">
              <BsFillBriefcaseFill className="briefCase1" />
              {employmentType}
            </p>

            <p className="package1">{packagePerAnnum}</p>
          </div>
          <hr className="hr-line-2" />
          <h1 className="description-heading1">
            Description
            <a href={companyWebsiteUrl} className="company-website-url">
              Visit <BiLinkExternal />
            </a>
          </h1>
          <p className="description1">{jobDescription}</p>
          <h1 className="skills-heading">Skills</h1>
          <ul className="skills-ul">
            {skills.map(each => (
              <li className="skills-li">
                <div className="skills-image-paragraph-container">
                  <img
                    src={each.imageUrl}
                    alt={each.name}
                    className="skills-image"
                  />
                  <p className="skills-paragraph">{each.name}</p>
                </div>
              </li>
            ))}
          </ul>
          <h1 className="life-heading">Life at Company</h1>
          <div className="life-container">
            <p className="life-paragraph">{lifeAtCompany.description}</p>
            <img src={lifeAtCompany.companyImageUrl} alt=" life at company" />
          </div>
        </div>
        <h1>Similar Jobs</h1>
        <div className="similar-container">
          <ul>
            {similarJobsData.map(eachJob => (
              <SimilarJobs key={eachJob.id} similarJobDetails={eachJob} />
            ))}
          </ul>
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
