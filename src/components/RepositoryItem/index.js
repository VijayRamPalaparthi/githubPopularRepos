// Write your code here
import './index.css'

const RepositoryItem = prop => {
  const {object} = prop
  const {name, issuesCount, forksCount, starsCount, avatarUrl} = object
  return (
    <li className="card-container">
      <img src={avatarUrl} className="repo-image" alt={name} />
      <h1 className="card-heading"> {name}</h1>
      <div className="star-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          className="icons"
          alt="stars"
        />
        <p className="detail"> {starsCount} stars</p>
      </div>
      <div className="star-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          className="icons"
          alt="forks"
        />
        <p className="detail"> {forksCount} forks</p>
      </div>
      <div className="star-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          className="icons"
          alt="open issues"
        />
        <p className="detail"> {issuesCount} open issues</p>
      </div>
    </li>
  )
}
export default RepositoryItem
