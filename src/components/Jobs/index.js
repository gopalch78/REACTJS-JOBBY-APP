import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import {BsSearch} from 'react-icons/bs'

import JobItem from '../JobItem'

import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    profileData: {},
    apiStatus: apiStatusConstants.initial,
    jobsData: [],
    searchInput: ' ',
  }

  componentDidMount() {
    this.getProfileData()
    this.getJobDetails()
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  getProfileData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const profileApiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }
    const response = await fetch(profileApiUrl, options)

    if (response.ok === true) {
      const fetchedProfileData = [await response.json()]

      const updatedProfileData = fetchedProfileData.map(each => ({
        name: each.profile_details.name,
        profileImageUrl: each.profile_details.profile_image_url,
        shortBio: each.profile_details.short_bio,
      }))
      this.setState({
        profileData: updatedProfileData,
        apiStatus: apiStatusConstants.success,
        responseSuccess: true,
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

  renderProfileView = () => {
    const {profileData, responseSuccess} = this.state
    if (responseSuccess) {
      const {name, profileImageUrl, shortBio} = profileData[0]
      return (
        <div className="job-profile-container">
          <img src={profileImageUrl} alt="profile" />
          <h1>{name}</h1>
          <p>{shortBio}</p>
        </div>
      )
    }
    return null
  }

  renderProfile = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProfileView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  getJobDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const jobApiUrl = 'https://apis.ccbp.in/jobs/'
    const optionsJobDetails = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }
    const responseJobDetails = await fetch(jobApiUrl, optionsJobDetails)
    if (responseJobDetails.ok === true) {
      const fetchedJobData = await responseJobDetails.json()
      const updatedJobData = fetchedJobData.jobs.map(each => ({
        title: each.title,
        rating: each.rating,
        packagePerAnnum: each.package_per_annum,
        location: each.location,
        jobDescription: each.job_description,
        id: each.id,
        employmentType: each.employment_type,
        companyLogoUrl: each.company_logo_url,
      }))
      this.setState({
        jobsData: updatedJobData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderJobItemDetails = () => {
    const {jobsData, searchInput} = this.state
    const searchResults = jobsData.filter(eachItem =>
      eachItem.title.toLowerCase().includes(searchInput.toLowerCase()),
    )

    return (
      <>
        <ul className="render-job-item-container">
          {searchResults.map(each => (
            <JobItem key={each.id} jobDetails={each} />
          ))}
        </ul>
      </>
    )
  }

  renderJobFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png "
        alt="f
        failure view"
      />
      <h1>Oops! Something Went Wrong </h1>
      <p>we cannot seem to find the page you are looking for</p>
      <button type="button">Retry</button>
    </div>
  )

  renderJobsDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobItemDetails()
      case apiStatusConstants.failure:
        return this.renderJobFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  onCheckBox = () => {
    const {jobsData, employmentType} = this.state
    jobsData.filter(eachItem => eachItem.employmentTypeId === employmentType)
  }

  render() {
    const {searchInput} = this.state

    return (
      <div className="main-container">
        <div className="render-profile">
          <Header />
        </div>
        <div className="two-container-divider">
          <div className="side-bar-container">
            {this.renderProfile()}
            <hr className="hr-line" />
            <div>
              <h1 className="employment-heading">Type of Employment</h1>
              <ul className="unOrder-list-container">
                {employmentTypesList.map(eachItem => (
                  <li className="list-elements" key={eachItem.employmentTypeId}>
                    <input type="checkbox" id={eachItem.employmentTypeId} />
                    <label htmlFor={eachItem.employmentTypeId}>
                      {eachItem.label}
                    </label>
                  </li>
                ))}
              </ul>
              <hr className="hr-line" />
              <h1 className="salary-heading">Salary Range</h1>
              <ul className="unOrder-list-container">
                {salaryRangesList.map(eachItem => (
                  <li className="list-elements" key={eachItem.salaryRangeId}>
                    <input
                      type="radio"
                      id={eachItem.salaryRangeId}
                      name="option"
                    />
                    <label htmlFor={eachItem.salaryRangeId}>
                      {eachItem.label}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="jobs-container">
            <input
              type="search"
              className="input-search"
              placeholder="Search"
              value={searchInput}
              onChange={this.onChangeSearchInput}
            />
            <button type="button" testid="searchButton" className="btn-search">
              <BsSearch className="search-icon" />
            </button>
            <div className="each-job-item">{this.renderJobItemDetails()}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
