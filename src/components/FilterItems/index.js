import './index.css'

const FilterItems = props => {
  const {filterTypeofEmployment, filterTypeofSalary} = props
  const ischecked = true

  const onChangeFilterTypeofEmployment = event => {
    filterTypeofEmployment(event.target.value)
  }
  const onChangeFilterTypeofSalary = event => {
    filterTypeofSalary(event.target.value)
  }

  const {employmentTypesList, salaryRangesList} = props

  return (
    <div>
      <h1 className="employment-heading">Type of Employment</h1>
      <ul className="unOrder-list-container">
        {employmentTypesList.map(eachItem => (
          <li className="list-elements" key={eachItem.employmentTypeId}>
            <input
              type="checkbox"
              onChecked={ischecked}
              id={eachItem.employmentTypeId}
              onChange={onChangeFilterTypeofEmployment}
              value={eachItem.employmentTypeId}
            />
            <label htmlFor={eachItem.employmentTypeId}>{eachItem.label}</label>
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
              onChecked={ischecked}
              onChange={onChangeFilterTypeofSalary}
            />
            <label htmlFor={eachItem.salaryRangeId}>{eachItem.label}</label>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default FilterItems
