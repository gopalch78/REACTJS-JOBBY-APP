import './index.css'

let listArray = []

const FilterItems = props => {
  const {filterTypeofEmployment, filterTypeofSalary} = props

  const onChangeFilterTypeofEmployment = event => {
    const checkValueIs = event.target.value
    const checkStatusIs = event.target.checked
    if (checkStatusIs) {
      listArray.push(checkValueIs)
    } else {
      const updatedValues = listArray.filter(each => each !== checkValueIs)
      listArray = updatedValues
    }
    const stringIs = listArray.join()

    filterTypeofEmployment(stringIs)
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
              onChange={onChangeFilterTypeofSalary}
              value={eachItem.salaryRangeId}
            />
            <label htmlFor={eachItem.salaryRangeId}>{eachItem.label}</label>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default FilterItems
