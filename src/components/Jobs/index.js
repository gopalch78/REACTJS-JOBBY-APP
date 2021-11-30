import {Component} from 'react'

import {Link} from 'react-router-dom'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import {BsSearch} from 'react-icons/bs'

import FilterItems from '../FilterItems'

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
    employmentType: '',
    salaryValue: '',
  }

  componentDidMount() {
    this.getProfileData()
    this.getJobDetails()
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

  onRetryProfileData = () => {
    this.getProfileData()
  }

  renderProfileFailureView = () => (
    <div className="retry-container">
      <button
        type="button"
        className="retry-button"
        onClick={this.onRetryProfileData}
      >
        Retry
      </button>
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
        return this.renderProfileFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  filterTypeofEmployment = employmentTypeId => {
    this.setState({employmentType: employmentTypeId}, this.getJobDetails)
  }

  filterTypeofSalary = salaryRangeId => {
    this.setState({salaryValue: salaryRangeId}, this.getJobDetails)
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onRetryJobDetails = () => {
    this.getJobDetails()
  }

  clickSearchButton = () => {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {employmentType, salaryValue, searchInput} = this.state
    const jobApiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${salaryValue}&search=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const responseJobDetails = await fetch(jobApiUrl, options)
    console.log(jobApiUrl)
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
    const searchData = jobsData.filter(eachData =>
      eachData.title.toLowerCase().includes(searchInput.toLowerCase()),
    )
    return (
      <div>
        <ul className="render-job-item-container">
          {searchData.map(eachItem => (
            <JobItem key={eachItem.id} jobDetails={eachItem} />
          ))}
        </ul>
      </div>
    )
  }

  renderNoJobView = () => (
    <div className="no-jobs-container">
      <img
        className="no-jobs-img"
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
      />
      <h1 className="no-job-heading">No Jobs Found</h1>
      <p className="no-job-paragraph">
        We could not find any jobs. Try other filters.
      </p>
    </div>
  )

  renderJobFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong </h1>
      <p className="failure-paragraph">
        we cannot seem to find the page you are looking for
      </p>
      <Link to="/jobs">
        <button type="button" onClick={this.onRetryJobDetails}>
          Retry
        </button>
      </Link>
    </div>
  )

  renderJobsDetails = () => {
    const {apiStatus, jobsData} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        if (jobsData.length === 0) {
          return this.renderNoJobView()
        }
        return this.renderJobItemDetails()
      case apiStatusConstants.failure:
        return this.renderJobFailureView()
      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state
    return (
      <div className="main-container">
        <Header />
        <div className="two-container-divider">
          <div className="side-bar-container">
            <div>{this.renderProfile()}</div>
            <hr className="hr-line" />
            <FilterItems
              employmentTypesList={employmentTypesList}
              salaryRangesList={salaryRangesList}
              filterTypeofEmployment={this.filterTypeofEmployment}
              filterTypeofSalary={this.filterTypeofSalary}
            />
          </div>
          <div className="jobs-container">
            <input
              type="search"
              className="input-search"
              placeholder="Search"
              value={searchInput}
              onChange={this.onChangeSearchInput}
            />
            <button
              type="button"
              testid="searchButton"
              className="btn-search"
              onClick={this.clickSearchButton}
            >
              <BsSearch className="search-icon" />
            </button>
            <div className="each-job-item">{this.renderJobsDetails()}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
