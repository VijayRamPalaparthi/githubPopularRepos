import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here
const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  loading: 'LOADING',
  failure: 'FAILURE',
}

class GithubPopularRepos extends Component {
  state = {
    activeTabId: languageFiltersData[0].id,
    repoList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount = () => {
    this.getRepoList()
  }

  getRepoList = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const {activeTabId} = this.state
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeTabId}`
    const options = {method: 'GET'}
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.popular_repos.map(each => ({
        name: each.name,
        id: each.id,
        issuesCount: each.issues_count,
        forksCount: each.forks_count,
        starsCount: each.stars_count,
        avatarUrl: each.avatar_url,
      }))
      this.setState({
        repoList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  setActiveTabId = id => {
    this.setState({activeTabId: id}, this.getRepoList)
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure-view"
      />
    </div>
  )

  renderRepoList = () => {
    const {repoList} = this.state
    return (
      <ul className="repo-list-container">
        {repoList.map(each => (
          <RepositoryItem object={each} key={each.id} />
        ))}
      </ul>
    )
  }

  renderRepositories = () => {
    const {apiStatus} = this.state
    console.log(apiStatus)
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRepoList()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.loading:
        return this.renderLoader()
      default:
        return null
    }
  }

  renderFilterLanguage = () => {
    const {activeTabId} = this.state
    return (
      <ul className="filter-container">
        {languageFiltersData.map(each => (
          <LanguageFilterItem
            object={each}
            key={each.id}
            setActiveTabId={this.setActiveTabId}
            isActive={each.id === activeTabId}
          />
        ))}
      </ul>
    )
  }

  render() {
    return (
      <div className="home-container">
        <h1 className="main-heading"> Popular </h1>
        {this.renderFilterLanguage()}
        {this.renderRepositories()}
      </div>
    )
  }
}
export default GithubPopularRepos
