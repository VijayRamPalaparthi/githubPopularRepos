// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {object, setActiveTabId, isActive} = props
  const {id, language} = object
  const activeClassName = isActive ? 'tab-activated' : 'tab-deactivated'
  const onClickTab = () => {
    setActiveTabId(id)
  }

  return (
    <li className="list-tab-container">
      <button className={activeClassName} type="button" onClick={onClickTab}>
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
